import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ListProperty from '@/component/InputField/ListProperty';
import Header from '@/component/InputField/Header';
import { sessionStatus } from '../src/utils/session';
const ListPropertyPage = () => {
  const router = useRouter();
  const [sessionLoaded, setSessionLoaded] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await sessionStatus();
        if (!session) {
          router.push("/");

        } else {
          setSessionLoaded(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    checkSession();
  }, [router]);
  return (
    <div>
<Header />
    <ListProperty></ListProperty>
    </div>
    
  );
};

export default ListPropertyPage;
