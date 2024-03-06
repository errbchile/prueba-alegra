import React from "react";
import { useQuery } from "react-query";
import { fetchPurchases } from "../../fetch/fetch";

export default function ColumnPurchases() {
  const { data, isSuccess } = useQuery("purchases", fetchPurchases, {
    refetchInterval: 3000,
  });

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Compras realizadas
      </h2>
      <div className="flex flex-col gap-2">
        {isSuccess && (
          <>
            {data.purchases.map((purchase) => {
              return (
                <div
                  key={purchase.id}
                  className="bg-blue-500 rounded-lg shadow-md p-4 flex justify-center items-center gap-2"
                >
                  <span className="text-sm font-bold text-white flex flex-col">
                    <p>Compra N° {purchase.id}</p>
                    <p>
                      {purchase.ingredient.name} ({purchase.quantity})
                    </p>
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
