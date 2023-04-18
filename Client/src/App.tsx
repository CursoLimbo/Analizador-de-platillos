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
import {NavBar} from "./components/NavBar"
import {Footer} from "./components/Footer"

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
    },
    {
      path: "app/NavBar",
      element: <NavBar/>
    }
    ,
    {
      path: "app/Footer",
      element: <Footer/>
    }
  ]);


  return(
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router}/>
    </ApolloProvider>
  )

}

export default App;


