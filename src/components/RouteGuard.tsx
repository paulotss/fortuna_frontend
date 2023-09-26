import { useEffect, useState, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../http';

type RouterGuardProps = {
  level: number
}

function RouteGuard(props: PropsWithChildren<RouterGuardProps>) {
  const { children, level } = props;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyAuth() {
      setIsLoading(true);
      try {
        const { data } = await axios.post('/seller/verify', {
          token: sessionStorage.getItem('auth')
        });
        if (data.payload.accessLevel > level) navigate('/login');
      } catch (error) {
        navigate('/login');
      }
      setIsLoading(false);
    }
    verifyAuth();
  }, [navigate, level]);

  return (
    <>
      {
        isLoading
          ? <p>Loading...</p>
          : children
      }
    </>
  )
}

export default RouteGuard;
