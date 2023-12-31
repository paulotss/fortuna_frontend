import { useState, useEffect, ChangeEvent } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs"
import axios from "../../http";
import ICashier from "../../interfaces/ICashier";
import IInvoice from "../../interfaces/IInvoice";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ManagerHeader from "../../components/ManagerArea/ManagerHeader";

interface IPeriod {
  startDate: Dayjs
  endDate: Dayjs
}

function ReportPage() {
  const [invoices, setInvoices] = useState<IInvoice[]>([])
  const [cashierInput, setCashierInput] = useState<string>('0')
  const [cashiers, setCashiers] = useState<ICashier[]>()
  const [period, setPeriod] = useState<IPeriod>({
    startDate: dayjs(),
    endDate: dayjs()
  })

  function handleChangePeriod (value: Dayjs | null, name: string) {
    setPeriod({
      ...period,
      [name]: value
    })
  }

  function handleChangeCashier (event: ChangeEvent<HTMLSelectElement>) {
    const target = event.target
    setCashierInput(target.value)
  }

  useEffect(() => {
    async function getCashier() {
      try {
        const auth = sessionStorage.getItem('auth');
        const { data } = await axios.get('/cashier', { headers: { 'authorization': auth } })
        setCashiers(data)
      } catch (error) {
        console.log(error)
      }
    }
    getCashier()
  }, [])

  useEffect(() => {
    async function getInvoices() {
      try {
        const startDate = period.startDate.format('YYYY-MM-DD')
        const endDate = period.endDate.date(period.endDate.date() + 1).format('YYYY-MM-DD')
        const requestQuery = `startDate=${startDate}&endDate=${endDate}`
        const auth = sessionStorage.getItem('auth');
        const { data } = await axios
          .get(`/invoice/cashier/${cashierInput}?${requestQuery}`, { headers: { 'authorization': auth } })
        setInvoices(data)
      } catch (error) {
        console.log(error)
      }
    }
    getInvoices()
  }, [cashierInput, period])

  return (
    <>
      <ManagerHeader/>
      <section className='p-5'>
        <h1 className='font-bold text-lg pb-2 mb-5 border-b'>Vendas</h1>
        <div className='flex'>
          <div className="flex flex-col w-60 flex-wrap border p-3">
            <h1 className='mb-3 font-bold text-base'>Filtros</h1>
            <div className='mb-3'>
              <label>Caixa</label>
              <br/>
              <select className="p-2" onChange={handleChangeCashier} value={cashierInput}>
                <option value="0">Todos</option>
                {
                  cashiers?.map((cashier) => (
                    <option
                      key={cashier.id}
                      value={cashier.id}
                    >
                      {cashier.title}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className='mb-3'>
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
            ? <article className='w-full p-3'>
                <div>
                  Total:
                  <span className='font-bold text-xl text-green-700'>
                    {' '}
                    {
                      invoices.reduce((acc, invoice) => acc + Number(invoice.value), 0)
                        .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                    }
                  </span>
                </div>
                <TableContainer>
                  <Table component='div'>
                    <TableHead component='div'>
                      <TableRow component='div'>
                        <TableCell component='div'><span className='text-sm'>Caixa</span></TableCell>
                        <TableCell component='div'><span className='text-sm'>Cliente</span></TableCell>
                        <TableCell component='div'><span className='text-sm'>Valor</span></TableCell>
                        <TableCell component='div'><span className='text-sm'>Data</span></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody component='div'>
                        {
                          invoices?.map((invoice) => (
                            <TableRow component={Link} to={`/manager/invoice/${invoice.id}`} key={invoice.id} hover={true}>
                              <TableCell component='div'>{invoice.cashier.title}</TableCell>
                              <TableCell component='div'>{invoice.client.name}</TableCell>
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
              </article>
            : <p className='text-center italic w-full'>Nada para esse período</p>
          }
        </div>
      </section>
    </>
  )
}

export default ReportPage;