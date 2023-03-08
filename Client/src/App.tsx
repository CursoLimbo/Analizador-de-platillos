import React from 'react';

import './styles/App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./ApolloClient";


export const App :React.FunctionComponent = () => {
  const router = createBrowserRouter([
    {
      path: "/logIn/"
    },
    {
      path: "/Manager/:managerId"
    }
  ]);


  return<>
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router}/>
    </ApolloProvider>
  </>

}


