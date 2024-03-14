import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SignIn from '@/component/InputField/SignIn';
import { sessionStatus } from '../src/utils/session';

const SigninPage = () => {
  
  const router = useRouter()
  useEffect(() => {
    const session = sessionStatus()
    if(session) {
      router.push("/listerDashboard")
    }
  }, [])
  return (
    <SignIn></SignIn>
  );
};

export default SigninPage;
