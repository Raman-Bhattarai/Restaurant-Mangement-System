import React, { useEffect, useState } from "react";
import { getMenu, getCategories } from "../api/api";
import MenuCard from "../components/menu/MenuCard";
import Filters from "../components/menu/Filters";
import { useCart } from "../contexts/CartContext";

function MenuPage() {
  const { addItem } = useCart();

  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuResponse = await getMenu();
        const categoryResponse = await getCategories();

        setMenu(menuResponse.data);       // <-- use .data
        setCategories(categoryResponse.data); // <-- use .data
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const filteredMenu = menu.filter(
    (item) =>
      (selectedCategory === "" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center mt-20">Loading menu...</p>;

  return (
    <div className="p-6  pt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Menu</h1>

      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {filteredMenu.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMenu.map((item) => (
            <MenuCard
              key={item.id}
              item={{
                ...item,
                addToCart: () => addItem(item),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuPage;
