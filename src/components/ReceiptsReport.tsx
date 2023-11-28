import { DatePicker } from "@mui/x-date-pickers";

interface IProps {
  cashierId: number
}

function ReceiptReport({ cashierId }: IProps) {
  return (
    <article className='p-5'>
      <h1 className='font-bold mb-2'>Café Sophia</h1>
      <div className='flex mb-2'>
        <div className='mr-3'>
          <DatePicker
            label="Início"
            format="DD/MM/YYYY"
            // value={period.startDate}
            // onChange={(value) => handleChangePeriod(value, 'startDate')}
          />
        </div>
        <div>
          <DatePicker
            label="Fim"
            format="DD/MM/YYYY"
            // value={period.endDate}
            // onChange={(value) => handleChangePeriod(value, 'endDate')}
          />
        </div>
      </div>
      <p>ReceitReport: { cashierId }</p>
    </article>
  )
}

export default ReceiptReport;
