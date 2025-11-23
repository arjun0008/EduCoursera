import React, { createContext, useState, useEffect } from "react";
import api from "../api";

interface CartItem {
  id: number;
  course: any;
}

interface PurchasedItem {
  id: number;
  course: any;
}

interface UserDataContextType {
  cart: CartItem[];
  purchased: PurchasedItem[];
  refreshUserData: () => void;
}

export const UserDataContext = createContext<UserDataContextType>({
  cart: [],
  purchased: [],
  refreshUserData: () => {},
});

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [purchased, setPurchased] = useState<PurchasedItem[]>([]);

  const refreshUserData = () => {
    const token = localStorage.getItem("access");
    if (!token) return; // user not logged in

    api.get("cart/").then(res => setCart(res.data)).catch(console.error);
    api.get("purchased/").then(res => setPurchased(res.data)).catch(console.error);
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return (
    <UserDataContext.Provider value={{ cart, purchased, refreshUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
