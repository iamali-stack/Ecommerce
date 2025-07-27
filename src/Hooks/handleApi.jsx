import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useHandleApi(endpoint) {
  const token = localStorage.getItem("usertoken");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (productId) => {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/${endpoint}`,
        { productId },
        {
          headers: {
            token,
          },
        }
      );

      return response.data;
    },

    onSuccess: () => {
      // ✅ حدّث البيانات بناءً على الـ endpoint
      if (endpoint === "wishlist") {
        queryClient.invalidateQueries(["wishlist"]);
      } else if (endpoint === "cart") {
        queryClient.invalidateQueries(["cart"]);
        console.log("Cart updated successfully");
      }
    }
  });

  return mutation;
}
