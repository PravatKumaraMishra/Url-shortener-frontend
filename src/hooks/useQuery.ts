import api from "../api/api";
import { useQuery } from "@tanstack/react-query";

const fetchAnalyticsData = (token: string | null) => {
  return api
    .get(
      //Todo: Make the endpoint accecpt start and end date as perameter
      "/analytics/urls?startDate=2024-01-01T00:00:00&endDate=2026-01-26T00:00:00",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      },
    )
    .then((response) =>
      Object.keys(response.data).map((key) => ({
        clickDate: key,
        count: response.data[key],
      })),
    );
};

export const useFetchTotalClicks = ({ token }: { token: string | null }) => {
  return useQuery({
    queryKey: ["url-totalclick"],
    queryFn: () => fetchAnalyticsData(token), // ✅ Wrap in arrow function
    staleTime: 5000,
  });
};
