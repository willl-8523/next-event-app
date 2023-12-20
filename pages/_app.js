import Layout from '../components/layouts/Layout';
import { ModalContextProvider } from '../store/modal-context';
import { NotificationContextProvider } from '../store/notification-context';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <ModalContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalContextProvider>
    </NotificationContextProvider>
  );
}
