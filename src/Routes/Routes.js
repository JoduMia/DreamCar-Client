import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Category from "../components/Category/Category";
import ProductsCategory from "../components/Category/ProductsCategory";
import Dashboard from "../layouts/Dashboard/Dashboard";
import Main from "../layouts/Main/Main/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

export const routes = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path="/" element={ <Main /> }>
            <Route index element={ <Category /> }/>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/register" element={ <Register /> }/>
            <Route
                path="/category/:id"
                element= { <PrivateRoute><ProductsCategory /></PrivateRoute>}
            />
        </Route>

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>

        </Route>
    </Route>
))