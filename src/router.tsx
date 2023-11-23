import { createBrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import RouteGuard from './components/RouteGuard.tsx';
import LoginPage from './pages/LoginPage';
import CashierPage from './pages/SellerArea/CashierPage.tsx';
import CashierListPage from './pages/SellerArea/CashierListPage.tsx';
import ReportPage from './pages/ManagerArea/ReportPage.tsx';
import InvoicePage from './pages/SellerArea/InvoicePage.tsx';
import ClientListPage from './pages/ManagerArea/ClientListPage.tsx';
import ClientPage from './pages/ManagerArea/ClientPage.tsx';
import ClientNew from './pages/ManagerArea/ClientNew.tsx';
import ProductListPage from './pages/ManagerArea/ProductListPage.tsx';
import ProductPage from './pages/ManagerArea/ProductPage.tsx';
import ProductNew from './pages/ManagerArea/ProductNew.tsx';
import ReportExpensesPage from './pages/ManagerArea/ReportExpensesPage.tsx';
import ReportLossesPage from './pages/ManagerArea/ReportLossesPage.tsx';
import CashierNew from './pages/ManagerArea/CashierNew.tsx';
import SellerDashboard from './pages/SellerDashboard.tsx';
import ClientDashboard from './pages/ClientDashboard.tsx';
import ClientBalance from './pages/ClientArea/ClientBalance.tsx';
import ClientExtract from './pages/ClientArea/ClientExtract.tsx';
import ClientProfile from './pages/ClientArea/ClientProfile.tsx';
import ClientInvoice from './pages/ClientArea/ClientInvoice.tsx';
import ManagerInvoicePage from './pages/ManagerArea/ManagerInvoicePage.tsx';
import ManagerDashboard from './pages/ManagerDashboard.tsx';

const router = createBrowserRouter([
  {
    path: '/seller',
    element: <RouteGuard level={1}><SellerDashboard /></RouteGuard>
    
  },
  {
    path: '/login/seller',
    element: <LoginPage endpoint='/seller/login' title='Vendedor' color='#171717' url='/seller' />
  },
  {
    path: '/cashier',
    element: <RouteGuard level={1}><CashierListPage/></RouteGuard>
  },
  {
    path: '/cashier/:id',
    element: <RouteGuard level={1}><LocalizationProvider dateAdapter={AdapterDayjs}><CashierPage/></LocalizationProvider></RouteGuard>
  },
  {
    path: '/',
    element: <RouteGuard level={2}><ClientDashboard /></RouteGuard>
    
  },
  {
    path: '/login/client',
    element: <LoginPage endpoint='/client/login' title='Cliente' color='#171717' url='/' />
  },
  {
    path: '/client/balance',
    element: <RouteGuard level={2}><ClientBalance /></RouteGuard>
  },
  {
    path: '/client/extract',
    element: <RouteGuard level={2}><LocalizationProvider dateAdapter={AdapterDayjs}><ClientExtract /></LocalizationProvider></RouteGuard>
  },
  {
    path: '/client/profile',
    element: <RouteGuard level={2}><ClientProfile /></RouteGuard>
  },
  {
    path: '/client/invoice/:id',
    element: <RouteGuard level={2}><ClientInvoice /></RouteGuard>
  },
  {
    path: '/invoice/:id',
    element: <RouteGuard level={2}><InvoicePage/></RouteGuard>
  },
  {
    path: '/manager',
    element: <RouteGuard level={0}><ManagerDashboard /></RouteGuard>
    
  },
  {
    path: '/login/manager',
    element: <LoginPage endpoint='/manager/login' title='Gerente' color='#171717' url='/manager' />
    
  },
  {
    path: '/cashier/new',
    element: <RouteGuard level={0}><CashierNew/></RouteGuard>
  },
  {
    path: '/reports',
    element: <RouteGuard level={0}><LocalizationProvider dateAdapter={AdapterDayjs}><ReportPage/></LocalizationProvider></RouteGuard>
  },
  {
    path: '/reports/expenses',
    element: <RouteGuard level={0}><LocalizationProvider dateAdapter={AdapterDayjs}><ReportExpensesPage/></LocalizationProvider></RouteGuard>
  },
  {
    path: '/reports/losses',
    element: <RouteGuard level={0}><LocalizationProvider dateAdapter={AdapterDayjs}><ReportLossesPage/></LocalizationProvider></RouteGuard>
  },
  {
    path: '/manager/invoice/:id',
    element: <RouteGuard level={0}><ManagerInvoicePage/></RouteGuard>
  },
  {
    path: '/clients',
    element: <RouteGuard level={0}><ClientListPage/></RouteGuard>
  },
  {
    path: '/client/:id',
    element: <RouteGuard level={0}><ClientPage/></RouteGuard>
  },
  {
    path: '/client/new',
    element: <RouteGuard level={0}><ClientNew/></RouteGuard>
  },
  {
    path: '/products',
    element: <RouteGuard level={0}><ProductListPage/></RouteGuard>
  },
  {
    path: '/product/:id',
    element: <RouteGuard level={0}><ProductPage/></RouteGuard>
  },
  {
    path: '/product/new',
    element: <RouteGuard level={0}><ProductNew /></RouteGuard>
  }
]);

export default router;
