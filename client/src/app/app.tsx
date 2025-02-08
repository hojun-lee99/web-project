'use client';

import { Provider } from 'react-redux';
import store from '@/redux/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Header />
      {children}
      <Footer />
    </Provider>
  );
}
