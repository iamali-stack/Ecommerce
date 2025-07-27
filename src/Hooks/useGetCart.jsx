import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetCart() {
  const token = localStorage.getItem("usertoken");

  return useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token,
        },
      }),
  });
  
}

