import SectionLink from "../components/SectionLink"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ManagerHeader from "../components/ManagerArea/ManagerHeader";

function ManagerDashboard() {
  return (
    <>
      <ManagerHeader/>
      <section className='flex flex-wrap justify-start ml-20 mt-4'>
        <SectionLink
          icon={<CurrencyExchangeIcon fontSize='large'/>}
          title="Caixa"
          link="/cashier/new"
        />
        <SectionLink
          icon={<AccountCircleIcon fontSize='large'/>}
          title="Clientes"
          link="/clients"
        />
        <SectionLink
          icon={<InventoryIcon fontSize='large'/>}
          title="Produtos"
          link="/products"
        />
        <SectionLink
          icon={<AutoGraphIcon fontSize='large'/>}
          title="Relatórios"
          link="/reports"
        />
      </section>
    </>
  )
}

export default ManagerDashboard;
