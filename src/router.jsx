import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profit from "./pages/Profit";
import Lifestyle from "./pages/Lifestyle"
import Basketball from "./pages/Basketball";
import CartProduct from "./components/Cards/Product-page/CartProduct";
import SearchPage from "./components/Additional-f/searchPage/SearchPage";
import Listing from "./components/filter/Listing";
import Cart from "./components/Cards/Cart/Cart";
import Checkout from "./components/Cards/Checkout/Checkout";
import Like from "./components/like/Like";
import OrderConfirmation from "./components/orderConfirmation/OrderConfirmation";
import Casual from "./components/additionalCategory/casual/Casual";
import Lbasketball from "./components/additionalCategory/basketball/Lbasketball";

const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {
                path: "",
                element:<Home/>
            },
            {
                path: "men",
                element: <Men/>
            },
            {
                path: "women",
                element: <Women/>
            },
            {
                path: "/register",
                element: <Register/>
            },
                        {
                path: "login",
                element: <Login/>
            },
            {
                path: "profit",
                element: <Profit/>
            },
            {
                path: "lifestyle",
                element: <Lifestyle/>
            },
            {
                path: "basketball",
                element: <Basketball/>
            },
            {
                path: "cartproduct/:id",
                element: <CartProduct/>
            },
            {
                path: "searchpage",
                element: <SearchPage/>
            },
            {
                path: "listing",
                element: <Listing/>
            },
            {
                path: "cart",
                element: <Cart/>
            },
            {
                path: "checkout",
                element: <Checkout/>
            },
            {
                path: "like",
                element: <Like/>
            },
            {
                path: "orderconfirmation",
                element: <OrderConfirmation/>
            },
            {
                path: "casual",
                element: <Casual/>
            },
            {
                path: "lbasketball",
                element: <Lbasketball/>
            }
        ]
    }
])
export default myRouter