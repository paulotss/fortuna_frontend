import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../http";
import IProductResponse from "../../interfaces/IProductResponse";
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ManagerHeader from "../../components/ManagerArea/ManagerHeader";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

function ProductListPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<IProductResponse[]>([]);

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
      const { data } = await axios.get(`/products/search?title=${search}`, { headers: { 'authorization': auth } });
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getProducts() {
      try {
        const auth = sessionStorage.getItem('auth');
        const { data } = await axios.get('/products', { headers: { 'authorization': auth } });
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  return (
    <>
      <ManagerHeader/>
      <section className="p-5">
        <article className="flex justify-between mb-3 items-center">
          <h1 className="font-bold text-xl w-fit">Produtos</h1>
          <Link
            to="/product/new"
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
            placeholder="Buscar produto"
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
                <TableCell component='div'>Produto</TableCell>
                <TableCell component='div'>Preço</TableCell>
                <TableCell component='div'>Quantidade</TableCell>
                <TableCell component='div'>Código</TableCell>
              </TableRow>
            </TableHead>
            <TableBody component='div'>
                { (rowsPerPage > 0
                    ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : products
                  ).map((product) => (
                    <TableRow component={Link} to={`/product/${product.id}`} key={product.id} hover={true}>
                      <TableCell component='div'>{product.title}</TableCell>
                      <TableCell component='div'>
                        {
                          Number(product.price)
                            .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                        }
                      </TableCell>
                      <TableCell component='div'>{product.amount}</TableCell>
                      <TableCell component='div'>{product.barCode}</TableCell>
                    </TableRow>
                  ))
                }
            </TableBody>
            <TableFooter component='div'>
              <TableRow component='div'>
                <TablePagination
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[25, 50, 75, 100]}
                  count={products.length}
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

export default ProductListPage;
