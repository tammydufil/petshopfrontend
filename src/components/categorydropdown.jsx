import React from "react";

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
    <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full p-3 border rounded-lg bg-white text-left flex justify-between items-center transition-all duration-200 ${
          open
            ? "border-blue-500 ring-2 ring-blue-200"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <span className="truncate">{selectedCategory || "All Categories"}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <ul className="py-1 max-h-60 overflow-y-auto">
            <li
              onClick={() => handleSelect("")}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                !selectedCategory
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <span>All Categories</span>
              </div>
            </li>
            {categories.map((cat, i) => (
              <li
                key={i}
                onClick={() => handleSelect(cat.name)}
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  selectedCategory === cat.name
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center">
                  <span>{cat.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
