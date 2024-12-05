import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import cartItemModel from '../../../Interfaces/cartItemModel';
import { RootState } from '../../../Storage/Redux/store';
import { inputHelper } from '../../../Helper';
import { MiniLoader } from '../Common';


export default function CartPickUpDetails() {
    const [loading, setLoading] = useState(false);
    const ShoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
      );
      let totalItems = 0;
      let grandTotal = 0;
      const initialUserData = {
        name: "",
        email: "",
        phoneNumber: ""
      }
      const [userInput, setUserInput] = useState(initialUserData)
      const handleUserInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, userInput);
        setUserInput(tempData);
      }

      ShoppingCartFromStore?.map((cartItem:cartItemModel) => {
        totalItems += cartItem.quantity??0;
        grandTotal += (cartItem.menuItem?.price??0) * (cartItem.quantity??0);
        return null;
      })
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        //normally payment operations will be handled here. But I won't have a payment implementation in this project.
        // I will just wait for a second and then pretend it successfully happened.
      }
  return (
    <div className="border pb-5 pt-3">
    <h1 style={{ fontWeight: "300" }} className="text-center text-success">
      Pickup Details
    </h1>
    <hr />
    <form onSubmit={handleSubmit} className="col-10 mx-auto">
      <div className="form-group mt-3">
        Pickup Name
        <input
          type="text"
          value={userInput.name}
          className="form-control"
          placeholder="name..."
          name="name"
          onChange={handleUserInput}
          required
        />
      </div>
      <div className="form-group mt-3">
        Pickup Email
        <input
          type="email"
          value={userInput.email}
          className="form-control"
          placeholder="email..."
          name="email"
          onChange={handleUserInput}
          required
        />
      </div>

      <div className="form-group mt-3">
        Pickup Phone Number
        <input
          type="number"
          value={userInput.phoneNumber}
          className="form-control"
          placeholder="phone number..."
          name="phoneNumber"
          onChange={handleUserInput}
          required
        />
      </div>
      <div className="form-group mt-3">
        <div className="card p-3" style={{ background: "ghostwhite" }}>
          <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
          <h5>No of items : {totalItems}</h5>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-lg btn-success form-control mt-3"
        disabled={loading}
      >{loading ? <MiniLoader/> : "Looks Good? Place Order!"}
      </button>
    </form>
  </div>
  )
}

