import React from "react";
import { IngredientCardProps } from "./types";

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient }) => {
  return (
    <>
      <li key={ingredient.id}>
        <p className="text-xs">
          - {ingredient.name} ({ingredient.pivot.quantity})
        </p>
      </li>
    </>
  );
};
export default IngredientCard;
