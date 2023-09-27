import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';

function Header() {
  return (
    <header className='w-full p-2 bg-yellow-700 flex justify-between'>
      <div className='font-bold w-fit p-2'>FORTUNA</div>
      <nav className='p-2'>
        <a href='#' className='pb-1 mr-2 hover:border-b-2 border-black'>Caixa</a>
        <a href='#' className='pb-1 mr-2 hover:border-b-2 border-black'>Clientes</a>
        <a href='#' className='pb-1 mr-2 hover:border-b-2 border-black'>Produtos</a>
        <a href='#' className='pb-1 hover:border-b-2 border-black'>Relatórios</a>
      </nav>
      <IconButton aria-label='Logout'>
        <LogoutIcon />
      </IconButton>
    </header>
  )
}

export default Header;