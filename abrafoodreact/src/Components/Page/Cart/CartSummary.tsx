import { useDispatch, useSelector } from "react-redux";
import { cartItemModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import {
  removeFromCart,
  updateQuantity,
} from "../../../Storage/Redux/shoppingCartSlice";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";

function CartSummary() {
    // user id = e7f98fbd-ec9c-41e2-8a0a-501d1f23e1de
  const dispatch = useDispatch();
  const[updateShoppingCart] = useUpdateShoppingCartMutation();
  const ShoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  if (!ShoppingCartFromStore) {
    return <div>Shopping Cart is Empty</div>;
  }

  const handleQuantity = async (
    updateQuantityBy: number,
    cartItem: cartItemModel
  ) => {
    const newQuantity = cartItem.quantity! + updateQuantityBy;

    if (newQuantity <= 0) {
        //Remove from db
      await updateShoppingCart({
        menuItemId: cartItem.menuItem!.id,
        updateQuantityBy: 0,
        userId:"e7f98fbd-ec9c-41e2-8a0a-501d1f23e1de"
    })
    //   Remove item if quantity becomes 0
      dispatch(removeFromCart(cartItem.id));
      
    } else {
        //update to db
      await updateShoppingCart({
        menuItemId: cartItem.menuItem!.id,
        updateQuantityBy: updateQuantityBy,
        userId:"e7f98fbd-ec9c-41e2-8a0a-501d1f23e1de"
    })
      // Update quantity
      dispatch(updateQuantity({ id: cartItem.id, quantity: newQuantity }));
      
    }
  };

  const handleDelete = async (deleteItemId: number, cartItem:cartItemModel) => {
    await updateShoppingCart({
        menuItemId: cartItem.menuItem!.id,
        updateQuantityBy: 0,
        userId:"e7f98fbd-ec9c-41e2-8a0a-501d1f23e1de"
    })
    dispatch(removeFromCart(deleteItemId));
  };

  return (
    <div className="container p-4 m-2">
      <h4 className="text-center text-success">Cart Summary</h4>

      {ShoppingCartFromStore.map((cartItem: cartItemModel, index: number) => (
        <div
          className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3"
          style={{ background: "ghostwhite" }}
          key={index}
        >
          <div className="p-3">
            <img
              src={cartItem.menuItem?.image}
              alt=""
              width={"120px"}
              className="rounded-circle"
            />
          </div>

          <div className="p-2 mx-3" style={{ width: "100%" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 style={{ fontWeight: 300 }}>{cartItem.menuItem?.name}</h4>
              <h4>
                ${(cartItem.quantity! * cartItem.menuItem!.price).toFixed(2)}
              </h4>
            </div>
            <div className="flex-fill">
              <h4 className="text-danger">{cartItem.menuItem?.price}</h4>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow  "
                style={{
                  width: "100px",
                  height: "43px",
                }}
              >
                <span
                  style={{ color: "rgba(22,22,22,.7)" }}
                  role="button"
                  onClick={() => handleQuantity(-1, cartItem)}
                >
                  <i className="bi bi-dash-circle-fill"></i>
                </span>
                <span>
                  <b>{cartItem.quantity}</b>
                </span>
                <span
                  style={{ color: "rgba(22,22,22,.7)" }}
                  role="button"
                  onClick={() => handleQuantity(1, cartItem)}
                >
                  <i className="bi bi-plus-circle-fill"></i>
                </span>
              </div>

              <button
                className="btn btn-danger mx-1"
                onClick={() => handleDelete(cartItem.id!, cartItem)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartSummary;
