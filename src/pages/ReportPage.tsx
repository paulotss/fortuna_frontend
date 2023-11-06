import { useState, useEffect, ChangeEvent } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs"
import Header from "../components/Header";
import axios from "../http";
import ICashier from "../interfaces/ICashier";
import IInvoice from "../interfaces/IInvoice";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

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
        const { data } = await axios.get('/cashier')
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
        const { data } = await axios
          .get(`/invoice/cashier/${cashierInput}?${requestQuery}`)
        setInvoices(data)
      } catch (error) {
        console.log(error)
      }
    }
    getInvoices()
  }, [cashierInput, period])

  return (
    <>
      <Header/>
      <section className="p-5 flex">
        <div className="flex flex-col min-w-48 flex-wrap border p-3">
          <h1 className='mb-3 font-bold text-lg'>Filtros</h1>
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
            <span className='mr-2'>Início</span>
            <br/>
            <DatePicker
              value={period.startDate}
              onChange={(value) => handleChangePeriod(value, 'startDate')}
            />
          </div>
          <div>
            <span className='mr-2'>Fim</span>
            <br/>
            <DatePicker
              value={period.endDate}
              onChange={(value) => handleChangePeriod(value, 'endDate')}
            />
          </div>
        </div>
        <article className='w-full p-3'>
          <div>
            Total:
            <span className='font-bold text-xl'>
              {' '}
              {
                invoices.reduce((acc, invoice) => acc + Number(invoice.value), 0)
              }
            </span>
          </div>
          <TableContainer>
            <Table component='div'>
              <TableHead component='div'>
                <TableRow component='div'>
                  <TableCell component='div'>Caixa</TableCell>
                  <TableCell component='div'>Valor</TableCell>
                  <TableCell component='div'>Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody component='div'>
                  {
                    invoices?.map((invoice) => (
                      <TableRow component={Link} to={`/invoice/${invoice.id}`} key={invoice.id} hover={true}>
                        <TableCell component='div'>{invoice.cashier.title}</TableCell>
                        <TableCell component='div'>{invoice.value}</TableCell>
                        <TableCell component='div'>{invoice.saleDate}</TableCell>
                      </TableRow>
                    ))
                  }
              </TableBody>
            </Table>
          </TableContainer>
        </article>
      </section>
    </>
  )
}

export default ReportPage;