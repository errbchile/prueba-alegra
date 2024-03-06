import { useQuery } from "react-query";
import OrderCard from "./OrderCard/OrderCard";
import { fetchFinishedOrders } from "../fetch/fetch";

export default function ColumnReadyToBeServed() {
  const { data, isSuccess } = useQuery("finished-orders", fetchFinishedOrders, {
    refetchInterval: 3000,
  });

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Listos para retirar
      </h2>
      {isSuccess &&
        data.data.map((order) => {
          return <OrderCard key={order.id} order={order} backgroundColor="bg-green-100" />;
        })}
    </>
  );
}
