import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products,loading,error }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => (
        <Link key={index} to={`/products/${product._id}`} className="block">
          <div className="bg-white p-4 rounded-lg">
            <div className="width-full h-96 mb-4">
              <img src={product.image[0].url} alt={product.image[0].altText}
              className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          <h3 className="text-sm mb-2">{product.name}</h3>
          <p className="text-gray-500 font-medium text-sm tracking-tighter">
            ${product.price}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
