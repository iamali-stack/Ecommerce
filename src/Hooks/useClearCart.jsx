import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useClearCart() {
  const token = localStorage.getItem("usertoken");

  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
      });
      return res.data;
    },
  });
}