import type { AppProps } from "next/app";
import {CookiesProvider} from "react-cookie";
import {ApolloProvider} from "@apollo/client";
import {useAppApolloClient} from "../hooks/apollo/useApolloClient";
import {ContextProvider} from '../hooks/utils/contextIngredients'
import  Head  from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";


const App = ({ Component, pageProps }: AppProps) => {
    const apolloClient: any = useAppApolloClient();
    const router = useRouter();
    const excludedRoutes = ['/login'];
    const showNavbar = !excludedRoutes.includes(router.pathname);

    return (

            <CookiesProvider>
                <ApolloProvider client={apolloClient}>
                    <Head>
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" />
                        <link
                            href="'https://fonts.googleapis.com/css2?family=Dancing_Script&display=swap'"
                            rel="stylesheet"
                        />
                        <link
                            href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap"
                            rel="stylesheet">
                        </link>
                    </Head>
                    <ContextProvider>
                    {showNavbar && <NavBar isHome />}
                        <Component  {...pageProps} />
                        
                        
                    {showNavbar && <Footer />}
                    </ContextProvider>
                </ApolloProvider>
            </CookiesProvider>

    );
}

export default App;