import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/Config';
import '../css/orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const snap = await getDocs(collection(db, 'orders'));
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      <h2>Your Orders</h2>

      {orders.map(order => (
        <div className="order-card" key={order.id}>
          <div>Total: Rs {order.totalPrice}</div>
          <div>Items: {order.totalQuantity}</div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
