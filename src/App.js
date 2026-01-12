import { Routes, Route } from 'react-router-dom';

import { Home } from './Components/Home';
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
import { AddProducts } from './Components/AddProducts';
import { Cashout } from './Components/Cashout';
import { Cart } from './Components/Cart';
import { NotFound } from './Components/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';
import { DeleteProduct } from './Components/deleteProducts';

import { MobileLayout } from './layout/MobileLayout';

const App = () => {
  return (
    <Routes>

      {/* BUYER ROUTES */}
      <Route
        path="/"
        element={
          <MobileLayout>
            <Home />
          </MobileLayout>
        }
      />

      <Route
        path="/cart"
        element={
          <MobileLayout>
            <Cart />
          </MobileLayout>
        }
      />

      <Route
        path="/cashout"
        element={
          <ProtectedRoute>
            <MobileLayout>
              <Cashout />
            </MobileLayout>
          </ProtectedRoute>
        }
      />

      {/* AUTH ROUTES */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* ADMIN ROUTES */}
      <Route
        path="/addproducts"
        element={
          <ProtectedRoute>
            <AddProducts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/delete"
        element={
          <ProtectedRoute>
            <DeleteProduct />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default App;
