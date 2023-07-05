import type { AppProps } from "next/app";
import {CookiesProvider} from "react-cookie";
import {ApolloProvider} from "@apollo/client";
import {useAppApolloClient} from "@/hooks/apollo/useApolloClient";



const App = ({ Component, pageProps }: AppProps) => {
    const apolloClient: any = useAppApolloClient();

    return (
            <CookiesProvider>
                <ApolloProvider client={apolloClient}>

                        <Component {...pageProps} />

                </ApolloProvider>
            </CookiesProvider>

    );
}

export default App;