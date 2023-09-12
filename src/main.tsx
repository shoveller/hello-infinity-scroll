import React from 'react'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import Pagination from "./Pagination.tsx";
import {createRoot} from "react-dom/client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import ReactInfiniteScrollerTest from "./ReactInfiniteScrollerTest.tsx";
import TanstackVirtualizerTest from "./TanstackVirtualizerTest.tsx";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<App/>}>
        <Route index path="/" element={<Navigate to="/pagination"/>}/>
        <Route index path="/pagination" element={<Pagination/>}/>
        <Route path="/ris" element={<ReactInfiniteScrollerTest/>}/>
        <Route path="/tv" element={<TanstackVirtualizerTest/>}/>
    </Route>)
)

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <RouterProvider router={router}/>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </React.StrictMode>,
)
