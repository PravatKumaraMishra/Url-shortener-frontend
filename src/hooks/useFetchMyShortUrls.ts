import api from "../api/api";
import { useQuery } from "@tanstack/react-query";

interface UrlsResponse {
  clickCount: number;
  createdAt: string;
  id: number;
  originalUrl: string;
  shortUrl: string;
  userName: string;
}

const fetchAllUrls = (token: string | null): Promise<UrlsResponse[]> => {
  return api
    .get("/myUrls", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data || []);
};

export const useFetchMyShortUrls = (token: string | null) => {
  return useQuery<UrlsResponse[], Error>({
    queryKey: ["urls", token],
    queryFn: () => fetchAllUrls(token),
    select: (data) =>
      data && data.length > 0
        ? [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
        : [],
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true, // Refresh when user returns to tab
    refetchOnMount: true, // Always fetch fresh data on mount
    enabled: !!token,
  });
};
