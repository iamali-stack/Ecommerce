import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetApi(endPoint) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [endPoint],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`),
  });

  return { data, isLoading, error, isError };
}
