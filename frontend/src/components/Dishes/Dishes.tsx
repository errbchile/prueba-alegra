import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import DishDetail from "../DishDetail/DishDetail";

export default function Dishes() {
  const fetchAvailableDishes = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8001/api/dishes/available-dishes"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al cargar los datos");
    }
  };

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
