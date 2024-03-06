import React from "react";
import { OrderCardProps } from "./types";
import IngredientCard from "./IngredientCard/IngredientCard";

const OrderCard: React.FC<OrderCardProps> = ({ order, backgroundColor }) => {
  const gethowManyIngredients = (): string => {
    const quantity = order?.dish.ingredients.length;
    if (quantity > 1) {
      return `${quantity} ingredients`;
    }
    return `${quantity} ingredient`;
  };
  const backGround = backgroundColor ? backgroundColor : "bg-white ";

  return (
    <div
      className={`${backGround} overflow-hidden shadow rounded-lg transition duration-300 hover:shadow-md mb-4`}
    >
      <div className="px-3 py-4 sm:p-3">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {order?.dish?.name}
        </h3>
        <p>Order N° {order.id}</p>
        <p>{gethowManyIngredients()}</p>
        <ul>
          {order?.dish.ingredients.map((ingredient) => (
            <IngredientCard ingredient={ingredient} key={ingredient.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderCard;
