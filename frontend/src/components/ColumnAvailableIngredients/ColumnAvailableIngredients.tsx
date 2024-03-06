import React from "react";
import { useQuery } from "react-query";
import { fetchStatistics } from "../../fetch/fetch";

export default function ColumnAvailableIngredients() {
  const { data, isSuccess } = useQuery("statistics", fetchStatistics, {
    refetchInterval: 1000,
  });

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Ingredientes Disponibles
      </h2>
      <div className="flex flex-col gap-2">
        {isSuccess && (
          <>
            {data.total_available.map((inventory) => {
              return (
                <div
                  key={inventory.id}
                  className="bg-blue-500 rounded-lg shadow-md p-4 flex justify-center items-center gap-2"
                >
                  <span className="text-sm font-bold text-white flex flex-col">
                    <p>
                      {inventory.id}) {inventory.name}:
                    </p>
                    <p>Disponible: {inventory.total_available}</p>
                    <p>Comprado: {inventory.total_bought}</p>
                  </span>
                </div>
              );
            })}
            <div className="bg-blue-500 rounded-lg shadow-md p-4 flex justify-center items-center gap-2">
              <span className="text-md font-semibold text-white">
                Ingredientes comprados:
              </span>
              <span className="text-2xl font-bold text-white">
                {data.total_used_ingredients}
              </span>
            </div>
            <div className="bg-blue-500 rounded-lg shadow-md p-4 flex justify-center items-center gap-2">
              <span className="text-md font-semibold text-white">
                Ingredientes en inventario:
              </span>
              <span className="text-2xl font-bold text-white">
                {data.total_ingredients_in_inventory}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
