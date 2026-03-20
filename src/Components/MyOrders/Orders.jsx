const Orders = ({ orders }) => {
  return orders?.map((order) => (
    <div className="order-style" key={order._id}>
      <h4>{order.orderNumber}</h4>
      <div className="order-status processing">{order.tracking.status}</div>
      {order.products.map((item) => (
        <div className="prod-style" key={item.product?._id}>
          <div className="title-img-product">
            <img className="product-img" src={item.product.imageUrl}></img>
          </div>
          <div className="product-price">
            <h5>{item.product.name}</h5>
            <div className="qty-price">
              <p>Quantity: {item.quantity}</p>
              <p>
                Price:{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.product.price)}
              </p>
            </div>
          </div>
        </div>
      ))}
      {order.totalPrice != null && (
        <p className="total-price">
          Total:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(order.totalPrice)}
        </p>
      )}
    </div>
  ));
};

export default Orders;
