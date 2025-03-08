import React, { useEffect,useState } from "react";
import { Footer, Header } from "../Components/Layout";
import { AuthenticationTestAdmin,AccessDenied,AuthenticationTest, Home, Login, MenuItemDetails, NotFound, Register, ShoppingCart, Payment, OrderConfirmed, MyOrders, OrderDetails, MenuItemList } from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { userModel } from "../Interfaces";
import jwt_decode from "jwt-decode";
import { setLoggedInUser} from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";
import AllOrders from "../Pages/Order/AllOrders";
import MenuItemUpsert from "../Pages/MenuItem/MenuItemUpsert";


function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const { data, isLoading } = useGetShoppingCartQuery(userData.id, {
    skip: skip,
  });

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data);
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  useEffect(() => {
    if (userData.id) setSkip(false);
  }, [userData]);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails/>}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart/>}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/authentication" element= {<AuthenticationTest/>}/>
          <Route path="/authorization" element= {<AuthenticationTestAdmin/>}/>
          <Route path="/accessDenied" element= {<AccessDenied/>}/>
          <Route path="/payment" element= {<Payment/>}/>
          <Route path="/order/orderconfirmed/:id" element={<OrderConfirmed/>}></Route>
          <Route path="/order/myOrders" element={<MyOrders/>}></Route>
          <Route path="/order/orderDetails/:id" element={<OrderDetails/>}></Route>
          <Route path="/order/allOrders" element={<AllOrders/>}></Route>
          <Route path="/menuItem/menuitemlist" element={<MenuItemList/>}></Route>
          <Route path="/menuItem/menuItemupsert/:id" element={<MenuItemUpsert/>}></Route>
          <Route path="/menuItem/menuItemupsert" element={<MenuItemUpsert/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
