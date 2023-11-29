import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../http";
import InputEdit from "../../components/InputEdit";
import IProductResponse from "../../interfaces/IProductResponse";
import EditProductAmount from "../../components/EditProductAmount";
import * as Yup from 'yup';
import ManagerHeader from "../../components/ManagerArea/ManagerHeader";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import IInvoiceToProductResponse from "../../interfaces/IInvoiceToProductResponse";

interface IPeriod {
  startDate: Dayjs
  endDate: Dayjs
}

function ProductPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<IProductResponse>({
    id: 0,
    title: "",
    price: 0,
    amount: 0,
    barCode: "",
  });
  const [invoices, setInvoices] = useState<IInvoiceToProductResponse[]>([])
  const [period, setPeriod] = useState<IPeriod>({
    startDate: dayjs(),
    endDate: dayjs()
  })
  const { id } = useParams();

  function handleUpdateAmount(newAmount: number): void {
    setProduct({ ...product, amount: newAmount })
  }

  function handleChangePeriod (value: Dayjs | null, name: string) {
    setPeriod({
      ...period,
      [name]: value
    })
  }

  useEffect(() => {
    async function getProduct() {
      setIsLoading(true);
      try {
        const startDate = period.startDate.format('YYYY-MM-DD')
        const endDate = period.endDate.date(period.endDate.date() + 1).format('YYYY-MM-DD')
        const requestQuery = `startDate=${startDate}&endDate=${endDate}`
        const invoicesResult = await axios.get(`/invoice/product/${id}?${requestQuery}`);
        const productResult = await axios.get(`/product/${id}`)
        setInvoices(invoicesResult.data);
        setProduct(productResult.data)
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
    }
    getProduct();
  }, [id, period]);

  return (
    <>
      <ManagerHeader/>
      {
        isLoading
          ? <p>Loading...</p>
          : <section className="p-5">
              <h1 className="mb-3 font-bold text-lg">Produto</h1>
              <article className="flex flex-wrap w-1/2">
                <InputEdit
                  title="Nome"
                  entity="title"
                  valueInput={product.title}
                  endPoint="/product"
                  itemId={product.id}
                  validation={Yup.object({ generic: Yup.string().required("Obrigatório") })}
                />
                <InputEdit
                  title="Valor"
                  entity="price"
                  valueInput={product.price}
                  endPoint="/product"
                  tstyle="w-20"
                  itemId={product.id}
                  validation={Yup.object({ generic: Yup.string()
                    .matches(/^[^0|\D]\d{0,9}(\.\d{1,2})?$/, "Somente números decimais com ponto: 00.00")
                    .required("Obrigatório") })}
                />
                <EditProductAmount
                  amount={product.amount}
                  productId={product.id}
                  handleUpdateAmount={handleUpdateAmount}
                />
              </article>
              <article>
                <h1 className='font-bold mb-5 mt-5 border-b pb-2'>Vendas</h1>
                <div className='flex justify-between flex-wrap md:flex-nowrap items-center'>
                  <div className='flex'>
                    <div className='mr-3'>
                      <DatePicker
                        label="Início"
                        format="DD/MM/YYYY"
                        value={period.startDate}
                        onChange={(value) => handleChangePeriod(value, 'startDate')}
                      />
                    </div>
                    <div>
                      <DatePicker
                        label="Fim"
                        format="DD/MM/YYYY"
                        value={period.endDate}
                        onChange={(value) => handleChangePeriod(value, 'endDate')}
                      />
                    </div>
                  </div>
                  <div>
                    <p className='text-right'>
                      <span className='italic text-sm'>Total:</span>
                      <br/>
                      <span className='font-bold text-2xl text-green-600'>
                        {
                          invoices.reduce((acc, invoice) => acc + Number(invoice.value), 0)
                            .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                        }
                      </span>
                    </p>
                  </div>
                </div>
                {
                  invoices && invoices?.length > 0
                  ? <TableContainer>
                      <Table component='div'>
                        <TableHead component='div'>
                          <TableRow component='div'>
                            <TableCell component='div'><span className='text-sm'>Cliente</span></TableCell>
                            <TableCell component='div'><span className='text-sm'>Valor</span></TableCell>
                            <TableCell component='div'><span className='text-sm'>Quant.</span></TableCell>
                            <TableCell component='div'><span className='text-sm'>Data</span></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody component='div'>
                            {
                              invoices.map((invoice, index) => (
                                <TableRow component={Link} to={`/manager/invoice/${invoice.invoiceId}`} key={index} hover={true}>
                                  <TableCell component='div'>{invoice.client.name}</TableCell>
                                  <TableCell component='div'>
                                    <span className='font-bold text-green-700'>
                                      {
                                        Number(invoice.value)
                                          .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                                      }
                                    </span>
                                  </TableCell>
                                  <TableCell component='div'>{invoice.amount}</TableCell>
                                  <TableCell component='div'>
                                    {
                                      dayjs(invoice.saleDate).format('DD/MM/YYYY H:mm')
                                    }
                                  </TableCell>
                                </TableRow>
                              ))
                            }
                        </TableBody>
                      </Table>
                    </TableContainer>
                  : <p className='italic mt-3'>Nada por aqui</p>
                }
              </article>
            </section>
      }
      
    </>
  )
}

export default ProductPage;
