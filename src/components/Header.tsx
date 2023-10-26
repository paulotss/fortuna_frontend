import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header() {
  const navigate = useNavigate()

  function handleClickLogout() {
    sessionStorage.removeItem('auth')
    navigate('/login')
  }

  return (
    <header className='w-full bg-amber-400 flex justify-start'>
      <div className='font-bold w-20 ml-4 self-center'>
        <Link to='/'>
          <div className='w-8 h-8 bg-neutral-900'></div>
        </Link>
      </div>
      <nav className='self-end w-full mt-5 flex'>
        <Link to='/cashier'>
          <div
            className='p-2 mr-1 w-32 bg-neutral-400 text-neutral-900 rounded-tr-lg hover:bg-neutral-900 hover:text-amber-400'
          >
            Caixa
          </div>
        </Link>
        <Link to='/clients'>
          <div
            className='p-2 mr-1 w-32 bg-neutral-400 text-neutral-900 rounded-tr-lg hover:bg-neutral-900 hover:text-amber-400'
          >
            Clientes
          </div>
        </Link>
        <Link to='/products'>
          <div
            className='p-2 mr-1 w-32 bg-neutral-400 text-neutral-900 rounded-tr-lg hover:bg-neutral-900 hover:text-amber-400'
          >
            Produtos
          </div>
        </Link>
        <Link to='/reports'>
          <div
            className='p-2 mr-1 w-32 bg-neutral-400 text-neutral-900 rounded-tr-lg hover:bg-neutral-900 hover:text-amber-400'
          >
            Relatórios
          </div>
        </Link>
      </nav>
        <button
          onClick={handleClickLogout}
          className='p-2 self-center'
        >
          <LogoutIcon />
        </button>
    </header>
  )
}

export default Header;