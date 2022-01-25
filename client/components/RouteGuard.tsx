import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export { RouteGuard };

function RouteGuard({ children }: any) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Run auth check on initial load
    authCheck(router.asPath);

    // On route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // Unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  async function authCheck(url: any) {
    // Redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/'];
    const path = url.split('?')[0];
    let res;

    try {
      res = await axios.post('/isLoggedIn');

      if (!publicPaths.includes(path) && res.data === 'Unauthorized') {
        setAuthorized(false);
        router.push({
          pathname: '/',
          query: { returnUrl: router.asPath },
        });
      } else {
        setAuthorized(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return authorized && children;
}
