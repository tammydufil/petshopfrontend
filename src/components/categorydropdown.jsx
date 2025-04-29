import React, { useState } from "react";

export function CategoryDropdown({
  categories,
  selectedCategory,
  setSelectedCategory,
  setSearch,
  open,
  setOpen,
}) {
  const handleSelect = (cat) => {
    setSelectedCategory(cat);
    setSearch("");
    setOpen(false);
  };

  return (
    <div
      className="relative w-full"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        {selectedCategory || "All Categories"}
      </button>

      {open && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <li
            onClick={() => handleSelect("")}
            className="cursor-pointer px-4 py-2 hover:bg-blue-100"
          >
            All Categories
          </li>
          {categories.map((cat, i) => (
            <li
              key={i}
              onClick={() => handleSelect(cat.name)}
              className="cursor-pointer px-4 py-2 hover:bg-blue-100"
            >
              {cat.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
