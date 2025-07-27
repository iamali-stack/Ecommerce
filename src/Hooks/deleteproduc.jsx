import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useDeleteItem(endpoint) {
  const token = localStorage.getItem("usertoken");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/${endpoint}/${productId}`,
        {
          headers: { token },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([endpoint]); // 🟢 علشان يعمل refresh للبيانات
    },
  });
}
