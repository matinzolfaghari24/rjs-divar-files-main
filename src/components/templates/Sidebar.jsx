import React from "react";

function Sidebar({ categories }) {
  return (
    <div>
      <h3 className="text-sm font-bold">دسته ها</h3>
      <div className="mt-5 w-52">
        {categories.data.map((category) => (
          <div
            key={category._id}
            className="flex gap-2 mb-4 text-gray-500 text-[15px]"
          >
            <img src={`${category.icon}.svg`} className="w-5" />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
