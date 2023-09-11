import React from 'react'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import Pagination from "./Pagination.tsx";
import {createRoot} from "react-dom/client";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<App/>}>
      <Route index path="/" element={<Navigate to="/pagination" />} />
      <Route index path="/pagination" element={<Pagination />} />
    </Route>)
)

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
