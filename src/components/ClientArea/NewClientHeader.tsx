import { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../../assets/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;
const navItems = [
  {
    title: 'Saldo',
    link: '/client/balance'
  },
  {
    title: 'Extrato',
    link: '/client/extract'
  },
  {
    title: 'Meus dados',
    link: '/client/profile'
  },
];

function NewClientHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle () {
    setMobileOpen((prevState) => !prevState);
  }

  function handleClickLogout() {
    sessionStorage.removeItem('auth');
    window.location.reload();
  }

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center' }}
    >
      <Link to='/client' className='flex justify-center'>
        <img src={logo} className='w-20 mt-2 mb-2' />
      </Link>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <Link to={item.link} key={index}>
            <p className='p-2'>{item.title}</p>
          </Link>
        ))}
        <Button sx={{ color: '#171717' }} onClick={handleClickLogout}>
          <LogoutIcon />
        </Button>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#FBBF24' }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#171717' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to='/client'>
              <img src={logo} className='w-14 mt-2 mb-2' />
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, index) => (
              <Button key={index} sx={{ color: '#171717' }}>
                <Link to={item.link}>{item.title}</Link>
              </Button>
            ))}
            <Button sx={{ color: '#171717' }} onClick={handleClickLogout}>
              <LogoutIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#FBBF24' },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}

export default NewClientHeader
