import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CartTile from "../../components/cartTile";

export default function CartListPage() {
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto max-md:max-w-xl py-4">
      <h1 className="text-2xl font-bold text-center">My Cart Page</h1>
      <dv className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2 space-y-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((singleCartItem) => (
              <CartTile
                key={singleCartItem.id}
                singleCartItem={singleCartItem}
              />
            ))
          ) : (
            <h1>No items in cart</h1>
          )}
        </div>
        <div className="bg-gray-100 rounded-sm p-4 h-max">
          <h3 className="text-xl font-extrabold border-b text-gray-950 border-gray-300 pb-2">
            Order Summary
          </h3>
          <ul className="space-y-2 text-gray-700 mt-4">
            <p className="flex flex-wrap gap-4 text-sm font-bold">
              Total <span>
                ${cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0).toFixed(2)}
              </span>
            </p>
          </ul>
          <div className="mt-5 flex gap-2">
            <button
            disabled = {cartItems.length === 0}
              onClick={() => navigate("/checkout")}
              className="disabled:opacity-60 text-sm px-4 py-3 bg-black text-white font-extrabold"
            >
              Checkout
            </button>
            <button
              onClick={() => navigate("/products")}
              className="text-sm px-4 py-3 bg-black text-white font-extrabold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </dv>
    </div>
  );
}
