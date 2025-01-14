import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTile from "../../components/productTile";

export default function ProductListPage() {
  //consume the context
  const { listOfProducts, loading } = useContext(ShoppingCartContext);

  console.log(listOfProducts);

  if(loading) return <h3>Loading Data!Please wait ...</h3>
  return (
    <secttion className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
            Our Featured Products
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {listOfProducts && listOfProducts.length > 0 ? (
            listOfProducts.map((singleProductTile) => {
              return (
                <ProductTile
                  key={singleProductTile.id}
                  singleProductTile={singleProductTile}
                />
              );
            })
          ) : (
            <h3>No products found</h3>
          )}
        </div>
      </div>
    </secttion>
  );
}
