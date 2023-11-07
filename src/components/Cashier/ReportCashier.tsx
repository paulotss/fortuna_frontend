import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import axios from "../../http"
import IInvoice from "../../interfaces/IInvoice"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom"

function ReportCashier () {
  const [invoices, setInvoices] = useState<IInvoice[]>([])
  const { id } = useParams()

  useEffect(() => {
    async function getInvoices() {
      try {
        const startDate = dayjs().format('YYYY-MM-DD')
        const endDate = dayjs().date(dayjs().date() + 1).format('YYYY-MM-DD')
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
  }, [id])

  return (
    <section className='p-5 border-t'>
      {
        invoices.length > 0 ?
        <>
          <h1 className="font-bold text-center">Vendas Recentes</h1>
          <TableContainer>
            <Table component='div'>
              <TableHead component='div'>
                <TableRow component='div'>
                  <TableCell component='div'><span className='text-sm font-bold'>Caixa</span></TableCell>
                  <TableCell component='div'><span className='text-sm font-bold'>Valor</span></TableCell>
                  <TableCell component='div'><span className='text-sm font-bold'>Data</span></TableCell>
                </TableRow>
              </TableHead>
              <TableBody component='div'>
                  {
                    invoices?.map((invoice) => (
                      <TableRow component={Link} to={`/invoice/${invoice.id}`} key={invoice.id} hover={true}>
                        <TableCell component='div'>{invoice.cashier.title}</TableCell>
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
        </>
        : <p className="mt-5 text-center italic">Nada para este período</p>
      }
    </section>
  )
}

export default ReportCashier
