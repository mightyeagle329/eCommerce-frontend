import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartProducts,
  getProducts,
  getProductsAsSeller,
  getUser,
} from "./redux/apiCalls";
import { useEffect } from "react";
import ToBeSeller from "./components/ToBeSeller";
import SellerDashboard from "./pages/seller/Dashboard";
import Dashboard from "./pages/public/Dashboard";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser) || 0;

  //When theres user get cart and user info and any time check for latest products
  useEffect(() => {
    (!user || user.accountType === 0) && getProducts(dispatch);
    user &&
      user.accountType === 1 &&
      getProductsAsSeller(user.username, dispatch);
    user && getUser(user._id, dispatch);
    user && user.accountType === 0 && getCartProducts(user._id, dispatch);
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user.accountType === 1 ? (
                <SellerDashboard />
              ) : user.accountType === 2 ? (
                <ToBeSeller />
              ) : (
                <Dashboard />
              )
            }
          />
          <Route
            exact
            path="/seller/:screen"
            element={user.accountType === 1 && <SellerDashboard />}
          />
          <Route
            path="/shop/:shopName"
            element={user.accountType !== 2 && <Dashboard />}
            z
          />
          <Route path="/products/:categoryName" element={<Dashboard />} />
          <Route path="/product/:productId" element={<Dashboard />} />
          <Route path="/orders/:orderId" element={<Dashboard />} />
          <Route path="/:screen" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
