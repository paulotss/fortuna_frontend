import { useEffect, useState } from 'react';
import axios from '../http';
import ICashier from '../interfaces/ICashier';
import Header from '../components/Header';
import SectionLink from '../components/SectionLink';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

function CashierListPage() {
  const [cashiers, setCashiers] = useState<ICashier[]>()

  useEffect(() => {
    async function getCashiers() {
      try {
        const { data } = await axios.get('/cashier')
        setCashiers(data)
      } catch (error) {
        console.log(error);
      }
    }
    getCashiers()
  }, [])

  return (
    <>
      <Header/>
      <section className='ml-20 mt-4'>
        <h1 className='mb-2 text-lg font-bold'>Caixas</h1>
        <div className='flex flex-wrap'>
          {
            cashiers?.map((cashier) => (
              <SectionLink
                key={cashier.id}
                icon={<PointOfSaleIcon fontSize='large'/>}
                title={ cashier.title }
                link={`/cashier/${cashier.id}`}
              />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default CashierListPage