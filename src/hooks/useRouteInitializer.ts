'use client';


import { useEffect } from 'react';
import { setGlobalRouter } from '@/utils/helper/redirect';
import { useRouter } from 'next/navigation';

const RouterInitializer = () => {
  const router = useRouter();

  useEffect(() => {
    setGlobalRouter(router);
  }, [router]);

  return null;
};

export default RouterInitializer;
