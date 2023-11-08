import { useState, useEffect } from "react";
import Header from "../components/Header";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ILoss from "../interfaces/ILoss";
import axios from "../http";

interface IPeriod {
  startDate: Dayjs
  endDate: Dayjs
}

function ReportLossesPage() {
  const [losses, setLosses] = useState<ILoss[]>([])
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
    async function getLosses() {
      try {
        const startDate = period.startDate.format('YYYY-MM-DD')
        const endDate = period.endDate.date(period.endDate.date() + 1).format('YYYY-MM-DD')
        const requestQuery = `startDate=${startDate}&endDate=${endDate}`
        const { data } = await axios
          .get(`/loss/report?${requestQuery}`)
        setLosses(data)
      } catch (error) {
        console.log(error)
      }
    }
    getLosses()
  }, [period])

  return (
    <>
      <Header/>
      <section className='p-5'>
        <h1 className='font-bold text-lg pb-2 mb-5 border-b'>Perdas</h1>
        <div className='flex'>
          <div className="flex flex-col w-60 flex-wrap border p-3">
            <h1 className='mb-3 font-bold text-base'>Filtros</h1>
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
            losses.length > 0
            ? <article className='w-full p-3'>
                <TableContainer>
                  <Table component='div'>
                    <TableHead component='div'>
                      <TableRow component='div'>
                        <TableCell component='div'><span className='text-sm'>Produto</span></TableCell>
                        <TableCell component='div'><span className='text-sm'>Quantidade</span></TableCell>
                        <TableCell component='div'><span className='text-sm'>Descrição</span></TableCell>
                        <TableCell component='div'><span className='text-sm'>Data</span></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody component='div'>
                        {
                          losses?.map((loss) => (
                            <TableRow component='div' key={loss.id} hover={true}>
                              <TableCell component='div'>{loss.product.title}</TableCell>
                              <TableCell component='div'>
                                <span className='text-red-600 font-bold'>{loss.amount}</span>
                              </TableCell>
                              <TableCell component='div'>{loss.description}</TableCell>
                              <TableCell component='div'>
                                {
                                  dayjs(loss.createAt).format('DD/MM/YYYY H:mm')
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

export default ReportLossesPage;
