import { Accountprovider } from "../context/accountprovider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
