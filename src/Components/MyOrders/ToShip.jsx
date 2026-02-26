import { useEffect, useState } from "react";
import { useGetOrderQuery } from "../../features/order/orderApiSlice";

const processing = () => {
  const { data, isLoading } = useGetOrderQuery();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(
      data?.data.filter((item) => item.tracking.status === "Shipped") || [],
    );
  }, [data?.data]);

  return (
    <section className="proccessing-body">
      {Array.isArray(orders) &&
        orders?.map((order) => (
          <div className="order-style" key={order._id}>
            <h4>{order.orderNumber}</h4>
            <div className="order-status toshipped">
              {order.tracking.status}
            </div>
            {order.products.map((item) => (
              <div className="prod-style" key={item._id}>
                <div className="title-img-product">
                  <img
                    className="product-img"
                    src={item.product.imageUrl}
                  ></img>
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
        ))}
    </section>
  );
};

export default processing;
