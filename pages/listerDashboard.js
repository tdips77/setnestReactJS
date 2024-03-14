import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/router';

import Header from '@/component/InputField/Header';
const LazyListerDashboard = React.lazy(() => import('@/component/InputField/ListerDashboard'));

import { sessionStatus } from '../src/utils/session';

const ListerDashboardPage = () => {
  const router = useRouter();
  const [sessionLoaded, setSessionLoaded] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await sessionStatus();
        console.log("seessssss", session);
        if (!session) {
          router.push("/");
          // router.reload()

        } else {
          setSessionLoaded(true);
          // router.reload()
        }
      } catch (error) {
        console.error("Error checking session:", error);
        // Handle any errors here, such as displaying an error message to the user
      }
    };
    checkSession();
  }, [router]);

  return (
    <div>
      <Header />
      {sessionLoaded && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyListerDashboard />
        </Suspense>
      )}
    </div>
  );
};

export default ListerDashboardPage;
