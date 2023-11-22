import React, { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { MenuItem, Menu } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import logo from '../../assets/logo.png'

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
  clients: boolean;
  products: boolean;
  reports: boolean;
}

function ManagerHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<IOpenMenu>({
    clients: false,
    products: false,
    reports: false,
  })

  function handleMenuClickItem(event: React.MouseEvent<HTMLButtonElement>) {
    setOpen({
      ...open,
      [event.currentTarget.name]: true
    })
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setOpen({
      clients: false,
      products: false,
      reports: false,
    });
    setAnchorEl(null);
  }

  function handleClickLogout() {
    sessionStorage.removeItem('auth');
    window.location.reload();
  }

  return (
    <header className='w-full bg-amber-400 flex justify-start mb-10'>
      <div className='absolute'>
        <Link to='/manager'>
          <img 
            src={logo}
            className='w-20 mt-5 ml-5 mb-2'
          />
        </Link>
      </div>
      <nav className='self-end w-full mt-8 ml-32 flex'>
        <Link
          to='/cashier/new'
          className='menuButtonInactive hover:menuButtonActive'
        >
          Caixa
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
        <button
          type='button'
          name='reports'
          onClick={handleMenuClickItem}
          className={open.reports ? 'menuButtonActive' : 'menuButtonInactive hover:menuButtonActive'}
        >
          Relatórios
        </button>
      </nav>
      <ThemeProvider theme={theme}>
        <Menu
          open={open.clients}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
        >
          <MenuItem className='w-32' onClick={handleMenuClose} component={Link} to={'/clients'}>Abrir</MenuItem>
          <MenuItem className='w-32' onClick={handleMenuClose} component={Link} to={'/client/new'}>Novo</MenuItem>
        </Menu>
        <Menu
          open={open.products}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
        >
          <MenuItem className='w-32' onClick={handleMenuClose} component={Link} to={'/products'}>Abrir</MenuItem>
          <MenuItem className='w-32' onClick={handleMenuClose} component={Link} to={'/product/new'}>Novo</MenuItem>
        </Menu>
        <Menu
          open={open.reports}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
        >
          <MenuItem className='w-32' onClick={handleMenuClose} component={Link} to={'/reports'}>Vendas</MenuItem>
          <MenuItem className='w-32' onClick={handleMenuClose} component={Link} to={'/reports/expenses'}>Compras</MenuItem>
          <MenuItem className='w-32' onClick={handleMenuClose} component={Link} to={'/reports/losses'}>Perdas</MenuItem>
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

export default ManagerHeader;
