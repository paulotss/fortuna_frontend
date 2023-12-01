import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import axios from "../../http"
import { DatePicker } from "@mui/x-date-pickers";
import ManagerHeader from "../../components/ManagerArea/ManagerHeader";
import IReceipt from "../../interfaces/IReceipt";
import ReportReceiptCard from "../../components/ReportReceiptCard";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PixIcon from '@mui/icons-material/Pix';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

interface IPeriod {
  startDate: Dayjs
  endDate: Dayjs
}

interface IReceiptPayload {
  rMoney: IReceipt[],
  rDebit: IReceipt[],
  rCredit: IReceipt[],
  rPix: IReceipt[]
}

function ReportReceiptsPage() {
  const [receipts, setReceipts] = useState<IReceiptPayload | null>(null)
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
    async function getReceipts() {
      try {
        const startDate = period.startDate.format('YYYY-MM-DD');
        const endDate = period.endDate.date(period.endDate.date() + 1).format('YYYY-MM-DD');
        const requestQuery = `startDate=${startDate}&endDate=${endDate}`;
        const rMoney = await axios.get(`/receipt/1?${requestQuery}`);
        const rDebit = await axios.get(`/receipt/2?${requestQuery}`);
        const rCredit = await axios.get(`/receipt/3?${requestQuery}`);
        const rPix = await axios.get(`/receipt/4?${requestQuery}`);
        const result = {rMoney: rMoney.data, rDebit: rDebit.data, rCredit: rCredit.data, rPix: rPix.data};
        setReceipts(result);
      } catch (error) {
        console.log(error)
      }
    }
    getReceipts();
  }, [period])

  return (
    <>
      <ManagerHeader />
      <section className='p-5'>
        <h1 className='font-bold text-lg pb-2 mb-5 border-b'>Fluxo de caixa</h1>
        <article className='flex flex-wrap md:flex-nowrap'>
          <div className='flex flex-col mb-2 min-w-64'>
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
          <article className="flex flex-wrap p-5">
            <ReportReceiptCard
              title="Dinheiro"
              icon={<LocalAtmIcon />}
              input={receipts?.rMoney.filter((receipt) => Number(receipt.amount) > 0)
                .reduce((c, r) => (c + Number(r.amount)), 0)}
              output={receipts?.rMoney.filter((receipt) => Number(receipt.amount) < 0)
                .reduce((c, r) => (c + Number(r.amount)), 0)}
            />
            <ReportReceiptCard
              title="Débito"
              icon={<AccountBalanceWalletIcon />}
              input={receipts?.rDebit.filter((receipt) => Number(receipt.amount) > 0)
                .reduce((c, r) => (c + Number(r.amount)), 0)}
              output={receipts?.rDebit.filter((receipt) => Number(receipt.amount) < 0)
                .reduce((c, r) => (c + Number(r.amount)), 0)}
            />
            <ReportReceiptCard
              title="Crédito"
              icon={<CreditCardIcon />}
              input={receipts?.rCredit.filter((receipt) => Number(receipt.amount) > 0)
                .reduce((c, r) => (c + Number(r.amount)), 0)}
              output={receipts?.rCredit.filter((receipt) => Number(receipt.amount) < 0)
                .reduce((c, r) => (c + Number(r.amount)), 0)}
            />
            <ReportReceiptCard
              title="PIX"
              icon={<PixIcon />}
              input={receipts?.rPix.filter((receipt) => Number(receipt.amount) > 0)
                .reduce((c, r) => (c + Number(r.amount)), 0)}
              output={receipts?.rPix.filter((receipt) => Number(receipt.amount) < 0)
                .reduce((c, r) => (c + Number(r.amount)), 0)}
            />
          </article>
        </article>
      </section>
    </>
    
  )
}

export default ReportReceiptsPage;
