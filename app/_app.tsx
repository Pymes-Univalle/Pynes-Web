// _app.js o _app.tsx
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Mostrar from './Organizacion/Mostrar/page';

function MyApp({ Component, pageProps }: AppProps)  {
  // Aquí puedes usar useRouter si es necesario
  const router = useRouter();
  if (router.pathname === '/Organizacion/Mostrar') {
    return <Mostrar />;
  }
  return <Component {...pageProps} />;
}

export default MyApp;
