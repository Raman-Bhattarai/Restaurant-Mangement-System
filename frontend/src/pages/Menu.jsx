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

        setMenu(menuResponse.data);
        setCategories(categoryResponse.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtered items per category
  const getFilteredItems = (categoryId) => {
    return menu.filter(
      (item) =>
        item.category === categoryId &&
        (selectedCategory === "" || item.category === Number(selectedCategory)) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) return <p className="text-center mt-20">Loading menu...</p>;

  return (
    <div className="px-[10%] pt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Menu</h1>

      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {categories.map((category, index) => {
        const items = getFilteredItems(category.id);

        if (items.length === 0) return null;

        const isReversed = index % 2 !== 0;

        return (
          <div
            key={category.id}
            className={`flex flex-col md:flex-row items-center gap-8 my-12 ${
              isReversed ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Category Image */}
            <div className="w-full md:w-1/3">
              <img
                src={`${category.image}`}
                alt={category.name}
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
            </div>

            {/* Category Items */}
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center md:text-left">
                {category.name}
              </h2>
              <div className="flex flex-col flex-wrap gap-6">
                {items.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={{
                      ...item,
                      addToCart: () => addItem(item),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {categories.every((c) => getFilteredItems(c.id).length === 0) && (
        <p className="text-center mt-10 text-gray-500">No items found.</p>
      )}
    </div>
  );
}

export default MenuPage;
