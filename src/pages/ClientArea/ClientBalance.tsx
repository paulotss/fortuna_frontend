import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from '../../http';
import IInvoice from '../../interfaces/IInvoice';
import ClientHeader from '../../components/ClientArea/ClientHeader';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import IClient from '../../interfaces/IClient';
import { Link } from 'react-router-dom';

function ClientBalance() {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [client, setClient] = useState<IClient>()

  useEffect(() => {
    async function getInvoices() {
      try {
        const { data: { payload: { id } } } = await axios.post('/seller/verify', {
          token: sessionStorage.getItem('auth')
        });
        const clientResult = await axios.get(`/client/${id}`);
        setClient(clientResult.data);
        const startDate = dayjs().format('YYYY-MM-DD');
        const endDate = dayjs().date(dayjs().date() + 1).format('YYYY-MM-DD');
        const requestQuery = `startDate=${startDate}&endDate=${endDate}&limit=5`;
        const invoiceResult = await axios.get(`/invoice/client/${id}?${requestQuery}`);
        setInvoices(invoiceResult.data);
      } catch (error) {
        console.log(error);
      }
    }
    getInvoices();
  }, []);

  return (
    <>
      <ClientHeader />
      <section className='p-5'>
        <article className='flex justify-between mb-5'>
          <div>
            <p className='text-xl font-bold'>{ client?.name }</p>
          </div>
          <div className='text-right'>
            <p className='text-sm italic'>Meu saldo</p>
            <p className='text-4xl text-green-600 font-bold'>
              {
                Number(client?.balance)
                  .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
              }
            </p>
          </div>
        </article>
        <article>
          <h1 className='font-bold text-lg mb-5 border-b pb-3'>Compras recentes</h1>
          {
            invoices.length > 0
              ? <TableContainer>
                  <Table component='div'>
                    <TableHead component='div'>
                      <TableRow component='div'>
                        <TableCell component='div'><span className='text-sm'>Caixa</span></TableCell>
                        <TableCell component='div'><span className='text-sm'>Vendedor</span></TableCell>
                        <TableCell component='div'><span className='text-sm'>Valor</span></TableCell>
                        <TableCell component='div'><span className='text-sm'>Data</span></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody component='div'>
                      {
                        invoices?.map((invoice) => (
                          <TableRow component={Link} to={`/client/invoice/${invoice.id}`} key={invoice.id} hover={true}>
                            <TableCell component='div'>{invoice.cashier.title}</TableCell>
                            <TableCell component='div'>{invoice.seller.name}</TableCell>
                            <TableCell component='div'>
                              <span className='font-bold text-green-700'>
                                {
                                  Number(invoice.value)
                                    .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                                }
                              </span>
                            </TableCell>
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
              : <p className='text-center italic'>Nada por aqui</p>
          }
        </article>
      </section>
    </>
  )
}

export default ClientBalance;
