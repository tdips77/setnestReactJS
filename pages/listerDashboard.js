import { useState } from 'react';
import { useRouter } from 'next/router';
import ListerDashboard from '@/component/InputField/ListerDashboard';
import Header from '@/component/InputField/Header';
const ForhetPasswordPage = () => {
  

  return (
    <div>
        <Header />
    <ListerDashboard></ListerDashboard>
    </div>
  );
};

export default ForhetPasswordPage;
