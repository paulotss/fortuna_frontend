import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../http";
import IProductResponse from "../interfaces/IProductResponse";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Header from "../components/Header";

function ProductListPage() {
  const [products, setProducts] = useState<IProductResponse[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get('/products');
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  return (
    <>
      <Header/>
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
                {
                  products?.map((product) => (
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
          </Table>
        </TableContainer>
      </section>
    </>
  )
}

export default ProductListPage;
