import { useState, useEffect, ChangeEvent } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs"
import Header from "../components/Header";
import axios from "../http";
import ICashier from "../interfaces/ICashier";
import IInvoice from "../interfaces/IInvoice";
import { Link } from "react-router-dom";

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
      <section className="p-5">
        <div className="flex items-center">
          <div className='flex items-center mr-5'>
            <label className="mr-2">Caixa:</label>
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
          <div className='flex items-center mr-5'>
            <span className='mr-2'>Início:</span>
            <DatePicker
              value={period.startDate}
              onChange={(value) => handleChangePeriod(value, 'startDate')}
            />
          </div>
          <div className='flex items-center'>
            <span className='mr-2'>Fim: </span>
            <DatePicker
              value={period.endDate}
              onChange={(value) => handleChangePeriod(value, 'endDate')}
            />
          </div>
        </div>
        <article>
          <div className='mt-5'>
            Total:
            <span className='font-bold text-xl'>
              {' '}
              {
                invoices.reduce((acc, invoice) => acc + Number(invoice.value), 0)
              }
            </span>
          </div>
          <div className="mt-5">
            {
              invoices.map((invoice) => (
                <Link
                  to={`/invoice/${invoice.id}`}
                  key={invoice.id}
                  className="flex justify-between mt-1 p-2 bg-yellow-200 rounded items-center"
                >
                  <div>{invoice.cashier.title}</div>
                  <div>{invoice.value}</div>
                  <div>{invoice.saleDate}</div>
                </Link>
              ))
            }
          </div>
        </article>
      </section>
    </>
  )
}

export default ReportPage;