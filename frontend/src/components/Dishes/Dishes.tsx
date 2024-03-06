import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import DishDetail from "../DishDetail/DishDetail";
import { fetchAvailableDishes } from "../../fetch/fetch";

export default function Dishes() {
  const { data, isSuccess } = useQuery(
    "available-dishes",
    fetchAvailableDishes
  );

  return (
    <>
      {isSuccess &&
        data.map((dish) => <DishDetail key={dish.id} dish={dish} />)}
    </>
  );
}
