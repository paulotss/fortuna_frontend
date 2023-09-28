import Header from "./components/Header"
import SectionLink from "./components/SectionLink"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

function App() {
  return (
    <>
      <Header/>
      <section className='flex flex-wrap justify-center mt-4'>
        <SectionLink
          icon={<CurrencyExchangeIcon fontSize='large'/>}
          title="Caixa"
          link="/cashier"
        />
        <SectionLink
          icon={<AccountCircleIcon fontSize='large'/>}
          title="Clientes"
          link="/"
        />
        <SectionLink
          icon={<InventoryIcon fontSize='large'/>}
          title="Produtos"
          link="/"
        />
        <SectionLink
          icon={<AutoGraphIcon fontSize='large'/>}
          title="Relatórios"
          link="/"
        />
      </section>
    </>
  )
}

export default App
