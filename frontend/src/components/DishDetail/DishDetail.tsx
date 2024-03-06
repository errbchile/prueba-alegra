import React from "react";

export default function DishDetail({ dish }) {
  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg transition duration-300 hover:shadow-md w-36">
        <div className="px-2 py-2 sm:p-3">
          <h3 className="text-md font-semibold text-gray-900 mb-2">
            {dish.name}
          </h3>
          <ul>
            {dish.ingredients.map((ingredient) => (
              <li className="text-xs" key={ingredient.id}>
                {ingredient.name} ({ingredient.pivot.quantity})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
