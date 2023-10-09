import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import axios from "../../http"
import IInvoice from "../../interfaces/IInvoice"

interface IPeriod {
  startDate: Dayjs
  endDate: Dayjs
}

function ReportCashier () {
  const [invoices, setInvoices] = useState<IInvoice[]>([])
  const [period, setPeriod] = useState<IPeriod>({
    startDate: dayjs(),
    endDate: dayjs()
  })
  const { id } = useParams()

  function handleChangePeriod (value: Dayjs | null, name: string) {
    setPeriod({
      ...period,
      [name]: value
    })
  }

  useEffect(() => {
    async function getInvoices() {
      try {
        const startDate = period.startDate.format('YYYY-MM-DD')
        const endDate = period.endDate.date(period.endDate.date() + 1).format('YYYY-MM-DD')
        const requestQuery = `startDate=${startDate}&endDate=${endDate}`
        const { data } = await axios
          .get(`/invoice/cashier/${id}?${requestQuery}`)
        console.log(data)
        setInvoices(data)
      } catch (error) {
        console.log(error)
      }
    }
    getInvoices()
  }, [id, period])

  return (
    <section className='p-5 border-t'>
      <h1 className='text-center text-lg mb-5 font-bold'>Vendas</h1>
      <div className='flex justify-center'>
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
      <div className="mt-5">
        {
          invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex justify-between mt-1 p-2 bg-yellow-200 rounded items-center"
            >
              <div>{invoice.cashier.title}</div>
              <div>{invoice.value}</div>
              <div>{invoice.saleDate}</div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default ReportCashier
