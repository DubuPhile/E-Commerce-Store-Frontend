const CartLineItem = ({ item }) => {
  const img = item.product?.imageUrl;
  const lineTotal = item.quantity * item.product.price;
  const highestQty = 20 > item.quantity ? 20 : item.quantity;
  const optionValue = [...Array(highestQty).keys()].map((i) => i + 1);
  const option = optionValue.map((val) => {
    return (
      <option key={`opt${val}`} value={val} className="option">
        {val}
      </option>
    );
  });

  const onChangeQty = (e) => {};

  const onRemoveFromCart = () => {};

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
      <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart-select"
        value={item.quantity}
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

export default CartLineItem;
