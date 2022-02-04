import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import useAppContext from './hooks/useAppContext';

export { RouteGuard };

function RouteGuard({ children }: any) {
  const router = useRouter();
  const { userInfo, setUserInfo } = useAppContext();

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
    const publicPaths = ['/', '/login', '/signup'];
    const path = url.split('?')[0];
    let res;

    try {
      res = await axios.post('/isLoggedIn');

      if (!publicPaths.includes(path) && res.data === 'Unauthorized') {
        setUserInfo(null);
        setAuthorized(false);
        router.push({
          pathname: '/',
          query: { returnUrl: router.asPath },
        });
      } else {
        // Set userInfo into App Context
        if (!userInfo) {
          const user = res?.data?.user;

          if (user) {
            // delete user.exp;
            // delete user.iat;

            setUserInfo(res.data.user);
          }
        }

        setAuthorized(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return authorized && children;
}
