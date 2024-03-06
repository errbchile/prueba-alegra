export type OrderCardProps = {
  order: OrderType;
  backgroundColor?: string;
};

export type OrderType = {
  id: number;
  dish: DishType;
  dish_id: number;
  status: string;
};

export type DishType = {
  id: number;
  name: string;
  ingredients: IngredientType[];
};

export type IngredientType = {
  id: number;
  name: string;
  pivot: {
    quantity: number;
  };
};
