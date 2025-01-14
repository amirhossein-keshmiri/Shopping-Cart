import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../context";

export default function CartTile({ singleCartItem }) {
  const { handleRemoveFromCart, handleAddToCart } =
    useContext(ShoppingCartContext);
  return (
    <Fragment>
      <div className="grid grid-cols-3 items-start gap-5">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
            <img
              className="w-full h-full object-contain"
              src={singleCartItem?.thumbnail}
              alt={singleCartItem?.title}
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {singleCartItem?.title}
            </h3>
            {/* <h3 className="text-sm text-gray-500 mt-2">
              {singleCartItem?.quantity} x ${singleCartItem?.price}
            </h3> */}
            <button
              onClick={() => handleRemoveFromCart(singleCartItem.id, true)}
              className="text-sm px-4 py-3 bg-black text-white font-extrabold mt-4"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="ml-auto">
          <h3 className="text-lg font-bold text-gray-900">
            ${singleCartItem?.totalPrice.toFixed(2)}
          </h3>
          <p className="mt-2 mb-2 font-bold text-[16px]">
            Quantity: {singleCartItem?.quantity}
          </p>
          <div className="mt-3">
            <button
              onClick={() => handleRemoveFromCart(singleCartItem.id, false)}
              className="border border-[#000] disabled:opacity-65 disabled:cursor-not-allowed"
              disabled={singleCartItem?.quantity === 1}
            >
              -
            </button>
            <button
              onClick={() => handleAddToCart(singleCartItem)}
              className="border border-[#000]"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-500" />
    </Fragment>
  );
}
