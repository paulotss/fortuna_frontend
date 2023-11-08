import { useEffect, useState } from "react";
import axios from "../http";
import Header from "../components/Header";
import IClient from "../interfaces/IClient";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';

function ClientListPage () {
  const [clients, setClients] = useState<IClient[]>()

  useEffect(() => {
    async function getClients() {
      try {
        const { data } = await axios.get('/clients')
        setClients(data)
      } catch (error) {
        console.log(error)
      }
    }
    getClients()
  }, [])

  return (
    <>
      <Header/>
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
                {
                  clients?.map((client) => (
                    <TableRow component={Link} to={`/client/${client.id}`} key={client.id} hover={true}>
                      <TableCell component='div'>{client.name}</TableCell>
                      <TableCell component='div'>{client.email}</TableCell>
                      <TableCell component='div'>{client.cellPhone}</TableCell>
                      <TableCell component='div'>
                        <span className='font-bold'>
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
          </Table>
        </TableContainer>
      </section>
    </>
  )
}

export default ClientListPage;