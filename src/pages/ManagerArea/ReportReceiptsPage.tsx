import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import ManagerHeader from "../../components/ManagerArea/ManagerHeader";

interface IPeriod {
  startDate: Dayjs
  endDate: Dayjs
}

function ReportReceiptsPage() {
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

  return (
    <>
      <ManagerHeader />
      <article className='p-5'>
        <div className='flex mb-2'>
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
        <p>ReceitReport</p>
      </article>
    </>
    
  )
}

export default ReportReceiptsPage;
