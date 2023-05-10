import type { AppProps } from "next/app";
import {CookiesProvider} from "react-cookie";
import {ApolloProvider} from "@apollo/client";
import {useAppApolloClient} from "@/hooks/apollo/useApolloClient";
import { ManagerContextProvider } from '@/contexts/managerContext';


const App = ({ Component, pageProps }: AppProps) => {
    const apolloClient: any = useAppApolloClient();



    return (
            <CookiesProvider>
                <ApolloProvider client={apolloClient}>
                    <ManagerContextProvider>
                        <Component {...pageProps} />
                    </ManagerContextProvider>
                </ApolloProvider>
            </CookiesProvider>

    );
}

export default App;