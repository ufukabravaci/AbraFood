import React, { useEffect } from "react";
import { Footer, Header } from "../Components/Layout";
import { Home, MenuItemDetails, NotFound, ShoppingCart } from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";

function App() {
const dispatch = useDispatch();
const {data,isLoading} = useGetShoppingCartQuery("e7f98fbd-ec9c-41e2-8a0a-501d1f23e1de");

useEffect(() => {
  if(!isLoading){
    dispatch(setShoppingCart(data.result?.cartItems))
  }
},[data]);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails/>}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
