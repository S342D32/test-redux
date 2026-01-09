import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // ✅ Add this dependency array

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: 1,
          name: "Stylish Jacket",
          price: 29.99,
          image: [
            {
              url: "https://picsum.photos/500/500?random=1",
              altText: "Stylish Jacket",
            },
          ],
        },
        {
          _id: 2,
          name: "Stylish Jacket",
          price: 290,
          image: [
            {
              url: "https://picsum.photos/500/500?random=2",
              altText: "Stylish Jacket",
            },
          ],
        },
        // ...other products
      ];
      setProducts(fetchProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
      </button>

      {/* Filter sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-50
    lg:static lg:translate-x-0
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <FilterSidebar />
      </div>

      <div className="grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>
        {/* sort options */}
        <SortOptions />
        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
