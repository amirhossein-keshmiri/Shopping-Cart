import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

export default function ProductTile({ singleProductTile }) {
  const navigate = useNavigate();
  const { handleAddToCart, cartItems } = useContext(ShoppingCartContext);
  function handleNavigateToProductDetailsPage(getCurrentProductId) {
    // console.log(getCurrentProductId);
    navigate(`/product-details/${getCurrentProductId}`);
  }

  return (
    <div className="relative group border border-cyan-700 p-6 cursor-pointer">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img
          src={singleProductTile?.thumbnail}
          alt={singleProductTile?.title}
          className="w-full h-full transition-all duration-300 object-center object-cover group-hover:scale-110"
        />
      </div>
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="font-bold text-gray-500 sm:text-sm text-xs md:text-base">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            {singleProductTile?.title}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-500 sm:text-sm text-xs md:text-[14px]">
            ${singleProductTile?.price}
          </p>
        </div>
      </div>
      <button
        onClick={() =>
          handleNavigateToProductDetailsPage(singleProductTile?.id)
        }
        className="px-5 mt-5 w-full py-2 bg-black text-white font-bold text-large"
      >
        View Details
      </button>
      <button
        disabled={
          cartItems.findIndex((item) => item.id === singleProductTile.id) > -1
        }
        onClick={() => handleAddToCart(singleProductTile)}
        className="disabled:opacity-65 px-5 mt-5 w-full py-2 bg-black text-white font-bold text-large"
      >
        Add to Cart
      </button>
    </div>
  );
}
