import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productDetails, setProductDetails, loading, setLoading, handleAddToCart } =
    useContext(ShoppingCartContext);
  async function fetchProductDetails(id) {
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await apiResponse.json();

    if (result) {
      setProductDetails(result);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);


  if (loading) return <h1>Loading Product Details!Please wait ...</h1>;

  return (
    <div>
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-xl shadow-lg relative">
              <img
                className="w-4/5 rounded object-cover"
                src={productDetails?.thumbnail}
                alt="{productDetails?.title}"
              />
            </div>
            <div className="mt-6 flex justify-center flex-wrap gap-6 mx-auto">
              {productDetails?.images?.length
                ? productDetails?.images?.map((imageItem) => (
                    <div className="rounded-xl p-4 shadow-md" key={imageItem}>
                      <img
                        src={imageItem}
                        className="w-24 cursor-pointer"
                        alt="Product secondary image"
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold">{productDetails?.title}</h2>
            <div className="flex flex-wrap gap--4 mt-4">
              <p className="text-xl font-bold">${productDetails?.price}</p>
            </div>
            <div>
              <button
                onClick={() => handleAddToCart(productDetails)}
                className="min-w-[200px] mt-6 py-3 bg-cyan-700 text-white bg-transparent border border-cyan-700 hover:bg-cyan-700 hover:text-white font-semibold hover:border-transparent"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
