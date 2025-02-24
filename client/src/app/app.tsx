'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

export default function App({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  useEffect(() => {
    console.log(pathname);
  }, []);
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
}
