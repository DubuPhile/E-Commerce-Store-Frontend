import { memo } from "react";

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }) => {
  const img = new URL(`../images/${item?.image}`, import.meta.url).href;

  const lineTotal = item.qty * item.price;
  const highestQty = 20 > item.qty ? 20 : item.qty;
  const optionValue = [...Array(highestQty).keys()].map((i) => i + 1);
  const option = optionValue.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  return (
    <li className="cart-item">
      <img src={img} alt={item.name} className="cart-img" />
      <div aria-label="Item name">{item.name}</div>
      <div aria-label="Price per Item">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div>
      <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart-select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
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
        onClick={onRemoveFromCart}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </li>
  );
};

function areItemsEqual({ item: prevItem }, { item: nextItem }) {
  return Object.keys(prevItem).every((key) => {
    return prevItem[key] === nextItem[key];
  });
}

const MemoizedCartLineItem = memo(CartLineItem, areItemsEqual);

export default MemoizedCartLineItem;
