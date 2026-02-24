import {
  useDeleteCartItemMutation,
  useChangeQuantityMutation,
  useChangeCheckBoxMutation,
} from "../features/cart/cartApiSlice";
import { useNavigate } from "react-router-dom";

const CartLineItem = ({ item }) => {
  const navigate = useNavigate();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartQty] = useChangeQuantityMutation();
  const [changeCheckBox] = useChangeCheckBoxMutation();
  const img = item.product?.imageUrl;
  const lineTotal = item.quantity * item.product?.price;
  const highestQty = Math.max(20, item.quantity);
  const optionValue = [...Array(highestQty).keys()].map((i) => i + 1);
  const option = optionValue.map((val) => {
    return (
      <option key={`opt${val}`} value={val} className="option">
        {val}
      </option>
    );
  });

  const onChangeQty = async (value) => {
    try {
      await updateCartQty({
        itemId: value.itemId,
        quantity: value.quantity,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update quantity");
    }
  };

  const onRemoveFromCart = async (productId) => {
    try {
      await deleteCartItem(productId).unwrap();
      console.log("item deleted Successfully");
    } catch (err) {
      console.error("failed to delete item", err);
    }
  };

  const onChangeCheckbox = async (value) => {
    try {
      await changeCheckBox({
        itemId: value.itemId,
        checkBox: value.checkBox,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update quantity");
    }
  };

  return (
    <li className="cart-item">
      <label key={item._id} className="round-checkbox">
        <input
          type="checkbox"
          checked={item?.checkBox}
          onChange={(e) =>
            onChangeCheckbox({
              itemId: item._id,
              checkBox: e.target.checked,
            })
          }
        />
        <span className="checkmark"></span>
      </label>
      <img src={img} alt={item.name} className="cart-img" />
      <div
        aria-label="Item name"
        onClick={() => navigate(`/product-details/${item.product?._id}`)}
      >
        {item.product?.name}
      </div>
      <div aria-label="Price per Item">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.product?.price)}
      </div>
      <label htmlFor={`itemQty ${item._id}`} className="offscreen">
        Item Quantity
      </label>
      <select
        name="itemQty"
        id={`itemQty ${item._id}`}
        className="cart-select"
        value={item.quantity}
        aria-label="Item Quantity"
        onChange={(e) =>
          onChangeQty({
            itemId: item._id,
            quantity: Number(e.target.value),
          })
        }
      >
        {option}
      </select>
      <div className="cart-item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>
      <button
        className="cart-button"
        aria-label="Remove Item From Cart"
        title=" Remove Item From Cart"
        onClick={() => onRemoveFromCart(item._id)}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </li>
  );
};

export default CartLineItem;
