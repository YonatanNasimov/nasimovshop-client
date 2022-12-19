import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import ProductList from "./pages/productList";
import NotFound from "./components/notFound";
import ProductItem from "./pages/productItem";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import Success from "./pages/success";
import { useSelector } from "react-redux";
import Layout from "./components/layout";
import LayoutAdmin from "./admin/layoutAdmin";
import User from "./admin/adminPages/user/User";
import ProductListAdmin from "./admin/adminPages/productList/ProductListAdmin";
import ProductAdmin from "./admin/adminPages/product/ProductAdmin";
import NewProduct from "./admin/adminPages/newProduct/NewProduct";
import HomeAdmin from "./admin/adminPages/home/HomeAdmin";
import UserList from "./admin/adminPages/userList/UserList";



function App() {
  const user = useSelector(state => state.user.currentUser)
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>

      <Router>
        <Routes>
          {/* client layout */}
          <Route path="/" element={<Layout />}>
            {/* outlet */}
            <Route index element={<Home />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductItem />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Route>
          {/* admin layout */}
          <Route path="/admin" element={<LayoutAdmin />}>
            {/* outlet */}
            <Route path="/admin" element={<HomeAdmin />} />
            <Route  path="/admin/users" element={<UserList />} />
            <Route path="/admin/user/:userId" element={<User />} />
            <Route path="/admin/products" element={<ProductListAdmin />} />
            <Route path="/admin/product/:productId" element={<ProductAdmin />} />
            <Route path="/admin/newproduct" element={<NewProduct />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;

