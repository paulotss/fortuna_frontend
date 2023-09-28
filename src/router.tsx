import { createBrowserRouter } from 'react-router-dom';
import RouteGuard from './components/RouteGuard.tsx';
import App from './App.tsx';
import LoginPage from './pages/LoginPage';
import CashierPage from './pages/CashierPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteGuard level={2}><App/></RouteGuard>
    
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>
  },
  {
    path: '/cashier',
    element: <CashierPage></CashierPage>
  }
]);

export default router;
