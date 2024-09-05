import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
// import Categories from "./components/Categories/Categories";
// import Brands from "./components/Brands/Brands";
// import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
// import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
// import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import ProductsContextProvider from "./context/productsContext";
// import WishList from "./components/WishList/WishList";
// import ProductsByBrand from "./components/ProductsByBrand/ProductsByBrand";
// import ProductsByCategory from "./components/ProductsByCategory/ProductsByCategory";
// import CheckOut from "./components/CheckOut/CheckOut";
// import AllOrders from "./components/AllOrders/AllOrders";
import { lazy, Suspense } from "react";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

let Categories = lazy(() => import("./components/Categories/Categories"));
let Brands = lazy(() => import("./components/Brands/Brands"));
let Cart = lazy(() => import("./components/Cart/Cart"));
let Products = lazy(() => import("./components/Products/Products"));
let Notfound = lazy(() => import("./components/Notfound/Notfound"));
let ProductDetails = lazy(() =>
  import("./components/ProductDetails/ProductDetails")
);
let WishList = lazy(() => import("./components/WishList/WishList"));
let ProductsByBrand = lazy(() =>
  import("./components/ProductsByBrand/ProductsByBrand")
);
let ProductsByCategory = lazy(() =>
  import("./components/ProductsByCategory/ProductsByCategory")
);
let CheckOut = lazy(() => import("./components/CheckOut/CheckOut"));
let AllOrders = lazy(() => import("./components/AllOrders/AllOrders"));

let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Suspense>
              <Categories />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Suspense>
              <Brands />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Suspense>
              <Cart />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Suspense>
              <Products />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "productsByBrand/:id",
        element: (
          <ProtectedRoute>
            <Suspense>
              <ProductsByBrand />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "productsByCategory/:id",
        element: (
          <ProtectedRoute>
            <Suspense>
              <ProductsByCategory />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <Suspense>
              <ProductDetails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id/:categorieId",
        element: (
          <ProtectedRoute>
            <Suspense>
              <ProductDetails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "checkOut/:cartId",
        element: (
          <ProtectedRoute>
            <Suspense>
              <CheckOut />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Suspense>
              <AllOrders />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <Suspense>
              <WishList />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      { path: "home", element: <Home /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "register", element: <Register /> },
      {
        path: "*",
        element: (
          <Suspense>
            <Notfound />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <ProductsContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </ProductsContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
