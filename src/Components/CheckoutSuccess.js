import { useNavigate } from 'react-router-dom';
import '../css/checkout-success.css';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="success-screen">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2>Order Placed!</h2>
        <p>Your order has been placed successfully.</p>

        <button onClick={() => navigate('/')}>
          Continue Shopping
        </button>

        <button
          className="secondary"
          onClick={() => navigate('/orders')}
        >
          View Orders
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
