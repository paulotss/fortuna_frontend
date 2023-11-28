import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import axios from "../http"
import IInvoice from "../interfaces/IInvoice";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from "react-router-dom";

interface IPeriod {
  startDate: Dayjs
  endDate: Dayjs
}

interface IProps {
  clientId: number | undefined;
  clientName: string | undefined;
  route: string;
}

function ClientExtract(props: IProps) {
  const { clientId, clientName, route } = props;

  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [period, setPeriod] = useState<IPeriod>({
    startDate: dayjs(),
    endDate: dayjs()
  });

  function handleChangePeriod (value: Dayjs | null, name: string) {
    setPeriod({
      ...period,
      [name]: value
    })
  }

  useEffect(() => {
    async function getInvoices() {
      try {
        const startDate = period.startDate.format('YYYY-MM-DD');
        const endDate = period.endDate.date(period.endDate.date() + 1).format('YYYY-MM-DD');
        const requestQuery = `startDate=${startDate}&endDate=${endDate}`;
        const invoiceResult = await axios.get(`/invoice/client/${clientId}?${requestQuery}`);
        setInvoices(invoiceResult.data);
      } catch (error) {
        console.log(error);
      }
    }
    getInvoices();
  }, [period, clientId]);

  return (
      <section className='p-5'>
        <div className="mb-5">
          <h1 className="text-lg font-bold">Extrato</h1>
          <p>{ clientName }</p>
        </div>
        <div className="flex mb-5">
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
        {
          invoices.length > 0
            ? <div>
                <TableContainer>
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
                          <TableRow component={Link} to={route + invoice.id} key={invoice.id} hover={true}>
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
              </div>
            : <p className="italic">Nada por aqui</p>
        }
        
      </section>
  )
}

export default ClientExtract;
