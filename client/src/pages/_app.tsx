import type { AppProps } from "next/app";
import {CookiesProvider} from "react-cookie";
import {ApolloProvider} from "@apollo/client";
import {useAppApolloClient} from "../hooks/apollo/useApolloClient";
import {ContextProvider} from '../hooks/utils/context'
import  Head  from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
    const apolloClient: any = useAppApolloClient();

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
                        <Component {...pageProps} />
                    </ContextProvider>
                </ApolloProvider>
            </CookiesProvider>

    );
}

export default App;