import React, { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MenuItem, Menu } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: '0px',
          backgroundColor: '#A3A3A3',
          color: '#171717',
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: '#737373'
          }
        }
      }
    }
  }
});

interface IOpenMenu {
  cashier: boolean;
  clients: boolean;
  products: boolean;
  reports: boolean;
}

function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<IOpenMenu>({
    cashier: false,
    clients: false,
    products: false,
    reports: false,
  })
  const navigate = useNavigate();

  function handleMenuClickItem(event: React.MouseEvent<HTMLButtonElement>) {
    setOpen({
      ...open,
      [event.currentTarget.name]: true
    })
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setOpen({
      cashier: false,
      clients: false,
      products: false,
      reports: false,
    });
    setAnchorEl(null);
  }

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
            className='menuButtonInactive hover:menuButtonActive'
          >
            Caixa
          </div>
        </Link>
        <button
          type='button'
          name='clients'
          onClick={handleMenuClickItem}
          className={open.clients ? 'menuButtonActive' : 'menuButtonInactive hover:menuButtonActive'}
        >
          Clientes
        </button>
        <button
          type='button'
          name='products'
          onClick={handleMenuClickItem}
          className={open.products ? 'menuButtonActive' : 'menuButtonInactive hover:menuButtonActive'}
        >
          Produtos
        </button>
        <Link to='/reports'>
          <div
            className='menuButtonInactive hover:menuButtonActive'
          >
            Relatórios
          </div>
        </Link>
      </nav>
      <ThemeProvider theme={theme}>
        <Menu
          open={open.clients}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
        >
          <MenuItem className='w-32' onClick={handleMenuClose} component={Link} to={'/client/new'}>Novo</MenuItem>
          <MenuItem className='w-32' onClick={handleMenuClose} component={Link} to={'/clients'}>Abrir</MenuItem>
        </Menu>
        <Menu
          open={open.products}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
        >
          <MenuItem className='w-32' onClick={handleMenuClose} component={Link} to={'/product/new'}>Novo</MenuItem>
          <MenuItem className='w-32' onClick={handleMenuClose} component={Link} to={'/products'}>Abrir</MenuItem>
        </Menu>
      </ThemeProvider>
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