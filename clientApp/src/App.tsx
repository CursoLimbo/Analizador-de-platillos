import React, {useState} from 'react';
import './styles/App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ApolloProvider} from "@apollo/react-hooks";
import {useAppApolloClient} from "./ApolloClient";
import {LogIn} from "./pages/login/LogIn";
import {AuthGate} from "./core/AuthGate";
import {Home} from "./pages/home/Home";
import {Profile} from "./pages/profile/Profile";
import {ManagerContextProvider} from "./context/managerContext";

const App = () => {
  const apolloClient: any = useAppApolloClient();

  const router = createBrowserRouter([
    {
      path: "log-in",
      element: <LogIn/>
    },
    {
      path: "/",
      element: <AuthGate><Home/></AuthGate>
    },
    {
      path: "profile",
      element: <AuthGate>
        <Profile/>
      </AuthGate>
    }
  ]);

  return (
      <ManagerContextProvider>
        <ApolloProvider client={apolloClient}>
          <RouterProvider router={router}/>
        </ApolloProvider>
      </ManagerContextProvider>
  )

}

export default App;


