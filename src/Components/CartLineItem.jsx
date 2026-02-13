import {
  useDeleteCartItemMutation,
  useChangeQuantityMutation,
} from "../features/cart/cartApiSlice";

const CartLineItem = ({ item }) => {
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartQty] = useChangeQuantityMutation();
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

  return (
    <li className="cart-item">
      <img src={img} alt={item.name} className="cart-img" />
      <div aria-label="Item name">{item.product?.name}</div>
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
