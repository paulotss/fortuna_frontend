import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  const navigate = useNavigate()

  function handleClickLogout() {
    sessionStorage.removeItem('auth')
    navigate('/login')
  }

  return (
    <header className='w-full p-2 bg-yellow-700 flex justify-between'>
      <div className='font-bold w-fit p-2'>
        <Link to='/'>FORTUNA</Link>
      </div>
      <nav className='p-2'>
        <Link to='/cashier' className='pb-1 mr-2 hover:border-b-2 border-black'>Caixa</Link>
        <a href='#' className='pb-1 mr-2 hover:border-b-2 border-black'>Clientes</a>
        <a href='#' className='pb-1 mr-2 hover:border-b-2 border-black'>Produtos</a>
        <Link to='/reports' className='pb-1 mr-2 hover:border-b-2 border-black'>Relatórios</Link>
      </nav>
      <IconButton aria-label='Logout' onClick={handleClickLogout}>
        <LogoutIcon />
      </IconButton>
    </header>
  )
}

export default Header;