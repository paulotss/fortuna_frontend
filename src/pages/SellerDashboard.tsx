import SectionLink from "../components/SectionLink"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SellerHeader from "../components/SellerArea/SellerHeader";

function SellerDashboard() {
  return (
    <>
      <SellerHeader/>
      <section className='flex flex-wrap justify-start ml-20 mt-4'>
        <SectionLink
          icon={<CurrencyExchangeIcon fontSize='large'/>}
          title="Caixa"
          link="/cashier"
        />
      </section>
    </>
  )
}

export default SellerDashboard;

