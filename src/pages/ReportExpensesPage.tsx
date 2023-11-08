import { useState, useEffect } from "react";
import Header from "../components/Header";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs"
import axios from "../http"
import IExpense from "../interfaces/IExpense";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

interface IPeriod {
  startDate: Dayjs
  endDate: Dayjs
}

function ReportExpensesPage() {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
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
    async function getExpenses() {
      try {
        const startDate = period.startDate.format('YYYY-MM-DD')
        const endDate = period.endDate.date(period.endDate.date() + 1).format('YYYY-MM-DD')
        const requestQuery = `startDate=${startDate}&endDate=${endDate}`
        const { data } = await axios
          .get(`/expense/report?${requestQuery}`)
        setExpenses(data)
      } catch (error) {
        console.log(error)
      }
    }
    getExpenses()
  }, [period])

  return (
    <>
      <Header/>
      <section className='p-5'>
        <h1 className='font-bold text-lg pb-2 mb-5 border-b'>Compras</h1>
        <div className='flex'>
          <div className="flex flex-col w-60 flex-wrap border p-3">
            <h1 className='mb-3 font-bold text-base'>Filtros</h1>
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
          {
            expenses.length > 0
            ? <article className='w-full p-3'>
                <div>
                  Total:
                  <span className='font-bold text-xl text-red-600'>
                    {' '}
                    {
                      expenses.reduce((acc, expense) => acc + Number(expense.value), 0)
                        .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                    }
                  </span>
                </div>
                <TableContainer>
                  <Table component='div'>
                    <TableHead component='div'>
                      <TableRow component='div'>
                        <TableCell component='div'><span className='text-sm'>Produto</span></TableCell>
                        <TableCell component='div'><span className='text-sm'>Valor</span></TableCell>
                        <TableCell component='div'><span className='text-sm'>Quantidade</span></TableCell>
                        <TableCell component='div'><span className='text-sm'>Data</span></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody component='div'>
                        {
                          expenses?.map((expense) => (
                            <TableRow component='div' key={expense.id} hover={true}>
                              <TableCell component='div'>{expense.product.title}</TableCell>
                              <TableCell component='div'>
                                <span className='font-bold text-red-600'>
                                  {
                                    Number(expense.value)
                                      .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                                  }
                                </span>
                              </TableCell>
                              <TableCell component='div'>{expense.amount}</TableCell>
                              <TableCell component='div'>
                                {
                                  dayjs(expense.launchDate).format('DD/MM/YYYY H:mm')
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

export default ReportExpensesPage;
