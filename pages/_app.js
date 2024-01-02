import Head from 'next/head';
import Layout from '../components/layouts/Layout';
import { ModalContextProvider } from '../store/modal-context';
import { NotificationContextProvider } from '../store/notification-context';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <ModalContextProvider>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </ModalContextProvider>
    </NotificationContextProvider>
  );
}
