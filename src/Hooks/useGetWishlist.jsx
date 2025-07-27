import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetWishlist() {
  const token = localStorage.getItem("usertoken");

  return useQuery({
    queryKey: ["wishlist"],  
    queryFn: async () => {
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token,
        }
      });
      return response.data;
    }
  });
}
