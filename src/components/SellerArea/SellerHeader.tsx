import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

function SellerHeader() {
  function handleClickLogout() {
    sessionStorage.removeItem('auth');
    window.location.reload();
  }

  return (
    <header className='w-full bg-amber-400 flex justify-start mb-10'>
      <div className='absolute'>
        <Link to='/seller'>
          <img 
            src={logo}
            className='w-20 mt-5 ml-5 mb-2'
          />
        </Link>
      </div>
      <nav className='self-end w-full mt-8 ml-32 flex'>
        <Link
          to='/cashier'
          className='menuButtonInactive hover:menuButtonActive'
        >
          Caixa
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

export default SellerHeader;
