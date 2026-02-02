import api from "../api/api";
import { useQuery } from "@tanstack/react-query";

const fetchAnalyticsData = (token: string | null) => {
  const startDate = new Date("2024-01-01T00:00:00");
  const endDate = new Date().toISOString();
  return api
    .get("/analytics/urls", {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    })
    .then((response) =>
      Object.keys(response.data).map((key) => ({
        clickDate: key,
        count: response.data[key],
      })),
    );
};

export const useFetchTotalClicks = ({ token }: { token: string | null }) => {
  return useQuery({
    queryKey: ["url-totalclick", token],
    queryFn: () => fetchAnalyticsData(token),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for real-time updates
    refetchOnWindowFocus: true, // Refresh when user returns to tab
    enabled: !!token,
  });
};
