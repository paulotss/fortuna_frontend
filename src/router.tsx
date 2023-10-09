import { createBrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import RouteGuard from './components/RouteGuard.tsx';
import App from './App.tsx';
import LoginPage from './pages/LoginPage';
import CashierPage from './pages/CashierPage.tsx';
import CashierListPage from './pages/CashierListPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteGuard level={2}><App/></RouteGuard>
    
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/cashier',
    element: <RouteGuard level={2}><CashierListPage/></RouteGuard>
  },
  {
    path: '/cashier/:id',
    element: <RouteGuard level={2}><LocalizationProvider dateAdapter={AdapterDayjs}><CashierPage/></LocalizationProvider></RouteGuard>
  }
]);

export default router;
