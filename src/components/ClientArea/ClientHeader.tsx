import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

function ClientHeader() {
  function handleClickLogout() {
    sessionStorage.removeItem('auth');
    window.location.reload();
  }

  return (
    <header className='w-full bg-amber-400 flex justify-between mb-10'>
      <div className='m-2'>
        <Link to='/client'>
          <img 
            src={logo}
            className='w-16'
          />
        </Link>
      </div>
      <nav className='self-center flex hidden md:block'>
        <Link
          to='/client/balance'
          className='menuDefault'
        >
          Saldo
        </Link>
        <Link
          to='/client/extract'
          // className='menuButtonInactive hover:menuButtonActive'
          className='menuDefault'
        >
          Extrato
        </Link>
        <Link
          to='/client/profile'
          //className='menuButtonInactive hover:menuButtonActive'
          className='menuDefault'
        >
          Meus dados
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

export default ClientHeader;
