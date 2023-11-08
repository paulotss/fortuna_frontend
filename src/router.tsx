import { createBrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import RouteGuard from './components/RouteGuard.tsx';
import App from './App.tsx';
import LoginPage from './pages/LoginPage';
import CashierPage from './pages/CashierPage.tsx';
import CashierListPage from './pages/CashierListPage.tsx';
import ReportPage from './pages/ReportPage.tsx';
import InvoicePage from './pages/InvoicePage.tsx';
import ClientListPage from './pages/ClientListPage.tsx';
import ClientPage from './pages/ClientPage.tsx';
import ClientNew from './pages/ClientNew.tsx';
import ProductListPage from './pages/ProductListPage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import ProductNew from './pages/ProductNew.tsx';
import ReportExpensesPage from './pages/ReportExpensesPage.tsx';
import ReportLossesPage from './pages/ReportLossesPage.tsx';

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
  },
  {
    path: '/reports',
    element: <RouteGuard level={2}><LocalizationProvider dateAdapter={AdapterDayjs}><ReportPage/></LocalizationProvider></RouteGuard>
  },
  {
    path: '/reports/expenses',
    element: <RouteGuard level={2}><LocalizationProvider dateAdapter={AdapterDayjs}><ReportExpensesPage/></LocalizationProvider></RouteGuard>
  },
  {
    path: '/reports/losses',
    element: <RouteGuard level={2}><LocalizationProvider dateAdapter={AdapterDayjs}><ReportLossesPage/></LocalizationProvider></RouteGuard>
  },
  {
    path: '/invoice/:id',
    element: <RouteGuard level={2}><InvoicePage/></RouteGuard>
  },
  {
    path: '/clients',
    element: <RouteGuard level={2}><ClientListPage/></RouteGuard>
  },
  {
    path: '/client/:id',
    element: <RouteGuard level={2}><ClientPage/></RouteGuard>
  },
  {
    path: '/client/new',
    element: <RouteGuard level={2}><ClientNew/></RouteGuard>
  },
  {
    path: '/products',
    element: <RouteGuard level={2}><ProductListPage/></RouteGuard>
  },
  {
    path: '/product/:id',
    element: <RouteGuard level={2}><ProductPage/></RouteGuard>
  },
  {
    path: '/product/new',
    element: <RouteGuard level={2}><ProductNew /></RouteGuard>
  }
]);

export default router;
