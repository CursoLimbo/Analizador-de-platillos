import React from 'react';
import './styles/App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ApolloProvider} from "@apollo/react-hooks";
import {useAppApolloClient} from "./ApolloClient";
import {LogIn} from "./screens/LogIn";
import {AuthGate} from "./core/AuthGate";
import {Home} from "./screens/Home";

const App = () => {
  const apolloClient:any = useAppApolloClient();
  const router = createBrowserRouter([
    {
      path: "app/log-in",
      element: <LogIn/>
    },
    {
      path: "app/home",
      element: <AuthGate><Home/></AuthGate>
    }
  ]);


  return(
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router}/>
    </ApolloProvider>
  )

}

export default App;


