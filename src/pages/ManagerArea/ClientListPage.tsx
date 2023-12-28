import { useEffect, useState } from "react";
import axios from "../../http";
import IClient from "../../interfaces/IClient";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableFooter } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ManagerHeader from "../../components/ManagerArea/ManagerHeader";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

function ClientListPage () {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState<IClient[]>([]);

  function handleChangePage(
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleChangeInputSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  async function handleSubmitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const auth = sessionStorage.getItem('auth');
      const { data } = await axios.get(`/clients/search?name=${search}`, { headers: { 'authorization': auth } });
      setClients(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getClients() {
      try {
        const auth = sessionStorage.getItem('auth');
        const { data } = await axios.get('/clients', { headers: { 'authorization': auth } })
        setClients(data)
      } catch (error) {
        console.log(error)
      }
    }
    getClients()
  }, [])

  return (
    <>
      <ManagerHeader/>
      <section className="p-5">
        <article className="flex justify-between mb-3 items-center">
          <h1 className="font-bold text-xl w-fit">Clientes</h1>
          <Link
            to="/client/new"
            className="p-2 bg-green-600 text-white rounded"
          >
            <AddCircleIcon/> Novo
          </Link>
        </article>
        <form className="flex" onSubmit={handleSubmitSearch}>
          <input
            type="text"
            className="p-2 w-full border mr-1"
            value={search}
            onChange={handleChangeInputSearch}
            placeholder="Buscar client"
          />
          <button
            type="submit"
            className="p-2 bg-amber-400 rounded flex text-neutral-900"
          >
            Buscar <ManageSearchIcon color="inherit" />
          </button>
        </form>
        <TableContainer>
          <Table component='div'>
            <TableHead component='div'>
              <TableRow component='div'>
                <TableCell component='div'>Nome</TableCell>
                <TableCell component='div'>Email</TableCell>
                <TableCell component='div'>Telefone</TableCell>
                <TableCell component='div'>Créditos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody component='div'>
                { (rowsPerPage > 0
                    ? clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : clients
                  ).map((client) => (
                    <TableRow component={Link} to={`/client/${client.id}`} key={client.id} hover={true}>
                      <TableCell component='div'>{client.name}</TableCell>
                      <TableCell component='div'>{client.email}</TableCell>
                      <TableCell component='div'>{client.cellPhone}</TableCell>
                      <TableCell component='div'>
                        <span className='font-bold text-green-600'>
                          {
                            Number(client.balance)
                              .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                          }
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                }
            </TableBody>
            <TableFooter component='div'>
              <TableRow component='div'>
                <TablePagination
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[25, 50, 75, 100]}
                  count={clients.length}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage={"Linhas por página:"}
                  component='div'
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </section>
    </>
  )
}

export default ClientListPage;