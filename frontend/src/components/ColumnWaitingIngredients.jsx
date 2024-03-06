import { useQuery } from "react-query";
import OrderCard from "./OrderCard/OrderCard";
import { fetchPendingOrders } from "../fetch/fetch";

export default function ColumnWaitingIngredients() {
  const { data, isSuccess } = useQuery("pending-orders", fetchPendingOrders, {
    refetchInterval: 1000,
  });

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        En cocina esperando ingredientes
      </h2>
      {isSuccess &&
        data.data.map((order) => {
          return <OrderCard key={order.id} order={order} backgroundColor="bg-yellow-100" />;
        })}
    </div>
  );
}
