import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { apiCocina } from "../fetch/fetch";

export default function MainButton() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return axios.post(`${apiCocina}/api/orders`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("pending-orders");
        queryClient.invalidateQueries("finished-orders");
      },
    }
  );

  return (
    <button
      onClick={() => {
        mutation.mutate();
      }}
      className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg shadow-md"
    >
      {mutation.isLoading ? "Pidiendo..." : "Pedir un plato"}
    </button>
  );
}
