import React, { useEffect, useState, useContext } from "react";
import api from "../api";

import { UserDataContext } from "../context/UserDataContext";

interface Course {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  created_at: string;
}

interface CartItem {
  id: number;
  course: Course;
  added_at: string;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshUserData } = useContext(UserDataContext);

  let totalPrice = 0;
for (let i = 0; i < cart.length; i++) {
  totalPrice += Number(cart[i].course.price); // Convert price to number
}


  const handleCheckout = () => {
  api
    .post("payments/create-checkout-session/")
    .then((res) => {
      const checkoutUrl = res.data.sessionId;  // Stripe URL returned by API
      window.location.href = checkoutUrl;     // Redirect user
    })
    .catch((err) => {
      console.error("Checkout error:", err);
    });
};


const handleRemove = (id: number) => {
  api
    .delete(`cart/remove/${id}/`)
    .then(() => {
      // Remove item from UI without reloading
      refreshUserData();
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    })
    .catch((err) => {
      console.error("Error removing item:", err);
    });
};

  useEffect(() => {
    api
      .get<CartItem[]>("cart/")
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Error fetching cart:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading cart...</p>;

  return (
      <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#fff',
    }}>
     <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '700',
          color: '#148FA2',
          marginBottom: '50px',
          position: 'relative',
          paddingBottom: '20px'
        }}>
          Your Cart
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '80px',
            height: '4px',
            backgroundColor: '#148FA2',
            borderRadius: '2px'
          }}></div>
        </h1>
      
      {cart.length === 0 ? (
        <p style={{
          textAlign: 'center',
          fontSize: '18px',
          color: '#999',
        }}>
          Your cart is empty.
        </p>
      ) : (
        <ul style={{
          listStyle: 'none',
          padding: 0,
        }}>
          {cart.map((item) => (
            <li key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              borderBottom: '1px solid #eee',
              marginBottom: '10px',
            }}>
              <img
                src={item.course.image_url}  // Assuming each item has an imageUrl property
                alt={item.course.name}
                style={{
                  width: '80px',
                  height: '80px',
                  marginRight: '15px',
                  borderRadius: '4px',
                }}
              />
              <div style={{
                flexGrow: 1,
              }}>
                <p style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#333',
                }}>
                  {item.course.name}
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  color: '#148FA2',
                }}>
                  ${item.course.price}
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #f44336',
                  color: '#f44336',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: '15px',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#333',
        }}>
          {/* <span style={{
            fontSize: '18px',
            fontWeight: '400',
            color: '#999',
          }}>
            Total: 
          </span> */}
          {/* Inline function to calculate total price */}
          <span style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#148FA2',
          }}>
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleCheckout}
          style={{
            backgroundColor: '#148FA2',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
