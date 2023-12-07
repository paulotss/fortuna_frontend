import { useEffect, useState, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../http';
import LoadingSkeleton from './LoadingSkeleton';

type RouterGuardProps = {
  level: number
}

enum Level {
  Manager = 0,
  Seller = 1,
  Client = 2,
}

function RouteGuard(props: PropsWithChildren<RouterGuardProps>) {
  const { children, level } = props;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyAuth() {
      setIsLoading(true);
      switch (level) {
        case Level.Seller:
          try {
            const { data } = await axios.post('/seller/verify', {
              token: sessionStorage.getItem('auth')
            });
            if (data.payload.accessLevel !== level) navigate('/login/seller');
          } catch (error) {
            navigate('/login/seller');
          }
          break;
        case Level.Client:
          try {
            const { data } = await axios.post('/client/verify', {
              token: sessionStorage.getItem('auth')
            });
            if (data.payload.accessLevel !== level) navigate('/');
          } catch (error) {
            navigate('/');
          }
          break;
          case Level.Manager:
            try {
              const { data } = await axios.post('/manager/verify', {
                token: sessionStorage.getItem('auth')
              });
              if (data.payload.accessLevel !== level) navigate('/login/manager');
            } catch (error) {
              navigate('/login/manager');
            }
            break;
        default:
          navigate('/login/client');
      }
      setIsLoading(false);
    }
    verifyAuth();
  }, [navigate, level]);

  return (
    <>
      {
        isLoading
          ? <LoadingSkeleton />
          : children
      }
    </>
  )
}

export default RouteGuard;
