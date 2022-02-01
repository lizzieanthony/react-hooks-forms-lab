import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const [allData, setAllData] = useState(items);
  function onItemFormSubmit(itemNew) {
    setAllData([...allData, itemNew]);
  }

  const itemsToDisplay = allData.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  const [searchChange, setSearchChange] = useState("");
  const handleSearchChange = (e) => setSearchChange(e.target.value);

  const searchItemsToDisplay = itemsToDisplay.filter((item) =>
    item.name.toLowerCase().includes(searchChange.toLowerCase())
  );

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      <ul className="Items">
        {searchItemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;