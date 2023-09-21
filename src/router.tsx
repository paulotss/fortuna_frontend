import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>
  }
]);

export default router;
