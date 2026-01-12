import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Config/Config';
import { useEffect, useState } from 'react';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, 'orders', id));
      setOrder(snap.data());
    };
    load();
  }, [id]);

  if (!order) return null;

  return (
    <div style={{ padding: 16 }}>
      <h2>Order Details</h2>

      {order.cartItems.map(item => (
        <div key={item.id}>
          {item.name} × {item.quantity}
        </div>
      ))}

      <strong>Total: Rs {order.totalPrice}</strong>
    </div>
  );
};

export default OrderDetails;
