import { useEffect, useState } from "react";
import { useGetOrderQuery } from "../../features/order/orderApiSlice";
import empty from "../../assets/empty-box.png";
import Orders from "./Orders";

const toComplete = () => {
  const { data, isLoading } = useGetOrderQuery();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(
      data?.data.filter((item) => item.tracking.status === "Delivered") || [],
    );
  }, [data?.data]);

  return (
    <section className="proccessing-body">
      {orders.length === 0 ? (
        <div className="empty-orders">
          <img src={empty} />
          <h6>No Completed Orders</h6>
        </div>
      ) : (
        <Orders orders={orders} />
      )}
    </section>
  );
};

export default toComplete;
