import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Category from "../components/Category/Category";
import ProductsCategory from "../components/Category/ProductsCategory";
import Dashboard from "../layouts/Dashboard/Dashboard";
import Main from "../layouts/Main/Main/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const routes = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path="/" element={ <Main /> }>
            <Route index element={ <Category /> }/>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/register" element={ <Register /> }/>
            <Route
                path="/category/:id"
                element= { <ProductsCategory />}
                loader = {({params}) => fetch(`http://localhost:5000/category/${params.id}`)}
            />
        </Route>

        <Route path="/dashboard" element={<Dashboard />}>

        </Route>
    </Route>
))