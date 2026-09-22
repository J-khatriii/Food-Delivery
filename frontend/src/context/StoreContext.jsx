import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      return {};
    }
  });

  const url = "https://food-delivery-backend-v8xs.onrender.com";
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "");

  const [food_list, setFoodList] = useState([]);

  const persistCart = (nextCart) => {
    setCartItems(nextCart);
    localStorage.setItem("cartItems", JSON.stringify(nextCart));
  };

  const getItemKey = (item) => String(item?._id ?? item?.id ?? item?.name ?? "");

  const addToCart = async (itemId) => {
    const safeItemId = String(itemId ?? "");
    const nextCart = {
      ...cartItems,
      [safeItemId]: (cartItems[safeItemId] || 0) + 1,
    };
    persistCart(nextCart);

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId: safeItemId },
          { headers: { token } },
        );
      } catch (error) {
        console.error("Add to cart error:", error);
      }
    }
  }

  const removeFromCart = async (itemId) => {
    const safeItemId = String(itemId ?? "");
    const nextCart = {
      ...cartItems,
      [safeItemId]: Math.max((cartItems[safeItemId] || 0) - 1, 0),
    };
    persistCart(nextCart);
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId: safeItemId },
          { headers: { token } },
        );
      } catch (error) {
        console.error("Remove from cart error:", error);
      }
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems || {}) {
      if ((cartItems[item] ?? 0) > 0) {
        let itemInfo = food_list.find(
          (product) => String(product._id ?? product.name) === String(item),
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  }

  const loadUserProfile = async (activeToken) => {
    try {
      const response = await axios.post(
        url + "/api/user/me",
        {},
        { headers: { token: activeToken } },
      );

      if (response?.data?.success && response?.data?.name) {
        const nextName = response.data.name;
        setUserName(nextName);
        localStorage.setItem("userName", nextName);
      }
    } catch (error) {
      console.error("Load user profile error:", error);
    }
  }

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } },
      );

      const serverCart = response?.data?.cartData;

      if (serverCart && Object.keys(serverCart).length > 0) {
        persistCart(serverCart);
        return;
      }

      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        persistCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Load cart error:", error);
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        persistCart(JSON.parse(savedCart));
      }
    }
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!token) {
      const savedCart = localStorage.getItem("cartItems");
      setCartItems(savedCart ? JSON.parse(savedCart) : {});
      setUserName(localStorage.getItem("userName") || "");
      return;
    }

    loadUserProfile(token);
    loadCartData(token);
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    userName,
    setUserName,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
