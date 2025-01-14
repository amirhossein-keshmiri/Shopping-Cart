//create the context
//provide the state to context
//wrap the context in root component

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//consume the context using useContext
export const ShoppingCartContext = createContext(null);

export default function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  async function fetchListOfProducts() {
    const apiResponse = await fetch("https://dummyjson.com/products");
    const result = await apiResponse.json();

    if (result && result?.products) {
      setListOfProducts(result?.products);
      setLoading(false);
    }
  }

  function handleAddToCart(getProductDetails) {
    console.log(getProductDetails);

    let cpyExistingCartItems = [...cartItems];
    const findIndexCurrentItem = cpyExistingCartItems.findIndex(
      (cartItem) => cartItem.id === getProductDetails.id
    );
    if (findIndexCurrentItem === -1) {
      cpyExistingCartItems.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails?.price,
      });
    } else {
      // cpyExistingCartItems[findIndexCurrentItem].quantity += 1;
      // cpyExistingCartItems[findIndexCurrentItem].totalPrice +=
      //   getProductDetails.price;
      cpyExistingCartItems[findIndexCurrentItem] = {
        ...cpyExistingCartItems[findIndexCurrentItem],
        quantity: cpyExistingCartItems[findIndexCurrentItem].quantity + 1,
        totalPrice:
          (cpyExistingCartItems[findIndexCurrentItem].quantity + 1) *
          cpyExistingCartItems[findIndexCurrentItem].price,
      };
    }

    setCartItems(cpyExistingCartItems);
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    navigate("/cart");
    console.log(cpyExistingCartItems);
    // console.log(cartItems);
  }

  function handleRemoveFromCart(getProductId, isFullyRemovedFromCart) {
    let cpyExistingCartItems = [...cartItems];

    const findIndexCurrentItem = cpyExistingCartItems.findIndex(
      (item) => item.id === getProductId
    );

    if (isFullyRemovedFromCart) {
      cpyExistingCartItems.splice(findIndexCurrentItem, 1);
    } else {
      // cpyExistingCartItems[findIndexCurrentItem].quantity -= 1;
      cpyExistingCartItems[findIndexCurrentItem] = {
        ...cpyExistingCartItems[findIndexCurrentItem],
        quantity: cpyExistingCartItems[findIndexCurrentItem].quantity - 1,
        totalPrice:
          (cpyExistingCartItems[findIndexCurrentItem].quantity - 1) *
          cpyExistingCartItems[findIndexCurrentItem].price,
        // totalPrice: cpyExistingCartItems[findIndexCurrentItem].totalPrice - cpyExistingCartItems[findIndexCurrentItem].price
      };
    }
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    setCartItems(cpyExistingCartItems);
  }
  useEffect(() => {
    fetchListOfProducts();
    setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
  }, []);
  return (
    <ShoppingCartContext.Provider
      value={{
        listOfProducts,
        loading,
        setLoading,
        productDetails,
        setProductDetails,
        handleAddToCart,
        cartItems,
        handleRemoveFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
