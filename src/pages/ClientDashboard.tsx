import SectionLink from "../components/SectionLink"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ClientHeader from "../components/ClientArea/ClientHeader";

function ClientDashboard() {
  return (
    <>
      <ClientHeader/>
      <section className='flex flex-wrap justify-start ml-20 mt-4'>
        <SectionLink
          icon={<AccountBalanceWalletIcon fontSize='large'/>}
          title="Saldo"
          link="/client/balance"
        />
        <SectionLink
          icon={<ReceiptIcon fontSize='large'/>}
          title="Extrato"
          link="/client/extract"
        />
        <SectionLink
          icon={<AccountBoxIcon fontSize='large'/>}
          title="Meus dados"
          link="/client/profile"
        />
      </section>
    </>
  )
}

export default ClientDashboard;
