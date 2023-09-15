import React, {FC, PropsWithChildren} from 'react'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import Pagination from "./Pagination.tsx";
import {createRoot} from "react-dom/client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import ReactInfiniteScrollerTest from "./ReactInfiniteScrollerTest.tsx";
import InfiniteQueryTest from "./InfiniteQueryTest.tsx";
import QueryClientOnlyTest from "./QueryClientOnlyTest.tsx";
import {DevTools} from "jotai-devtools";
import AtomWithQueryTest from "./AtomWithQueryTest.tsx";
import {Provider, createStore} from "jotai";
import AdvencedAtomWithQueryTest from "./AdvencedAtomWithQueryTest.tsx";
import {useHydrateAtoms} from "jotai/react/utils";
import {queryClientAtom} from "jotai-tanstack-query";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<App/>}>
        <Route index path="/" element={<Navigate to="/pagination"/>}/>
        <Route index path="/pagination" element={<Pagination/>}/>
        <Route path="/ric" element={<ReactInfiniteScrollerTest/>}/>
        <Route path="/infTest" element={<InfiniteQueryTest/>}/>
        <Route path="/qrOnlyTest" element={<QueryClientOnlyTest/>}/>
        <Route path="/atomWithQrTest" element={<AtomWithQueryTest/>}/>
        <Route path="/advAtomWithQrTest" element={<AdvencedAtomWithQueryTest/>}/>
    </Route>)
)

export const client = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000,
        }
    }
})
const store = createStore();

const HydrateAtoms: FC<PropsWithChildren> = ({ children }) => {
    // atomWithQuery가 내부적으로 사용하는 atom을 react-query 와 동기화해야 한다
    useHydrateAtoms([[queryClientAtom, client]])
    return children
}

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={client}>
                <HydrateAtoms>
                    <RouterProvider router={router}/>
                </HydrateAtoms>
                <ReactQueryDevtools/>
            </QueryClientProvider>
            <DevTools store={store}/>
        </Provider>
    </React.StrictMode>,
)
