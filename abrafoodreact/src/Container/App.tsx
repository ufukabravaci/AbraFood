import React, { useEffect } from "react";
import { Footer, Header } from "../Components/Layout";
import { AuthenticationTestAdmin,AccessDenied,AuthenticationTest, Home, Login, MenuItemDetails, NotFound, Register, ShoppingCart } from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { userModel } from "../Interfaces";
import jwt_decode from "jwt-decode";
import { setLoggedInUser} from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";


function App() {
const dispatch = useDispatch();
const userData : userModel = useSelector((state: RootState) => state.userAuthStore);
const {data,isLoading} = useGetShoppingCartQuery(userData.id);

useEffect(() => {
  if(!isLoading){
    dispatch(setShoppingCart(data.result?.cartItems))
  }
},[data]);

useEffect(() => {
  const localToken = localStorage.getItem("token");
  if(localToken){
    const {fullName,id,email,role} : userModel = jwt_decode(localToken);
    dispatch(setLoggedInUser({fullName,id,email,role}));
  }
},[])

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
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
