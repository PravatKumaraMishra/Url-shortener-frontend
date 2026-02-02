import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import toast from "react-hot-toast";
import useTokenStore from "./Store";

export interface CreateUrlRequest {
  longUrl: string;
}

export interface UrlResponse {
  id: number;
  originalUrl: string;
  shortUrl: string; // The full short URL or just the slug, depending on your backend
  createdAt: string;
}

// The fetcher function
const createUrl = (
  token: string | null,
  payload: CreateUrlRequest,
): Promise<UrlResponse> => {
  return api
    .post("/shorten", payload, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => response.data);
};

export const useCreateShortUrl = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const { token } = useTokenStore();

  return useMutation({
    mutationFn: (payload: CreateUrlRequest) => createUrl(token, payload),

    onSuccess: (data) => {
      const fullShortUrl = `${import.meta.env.VITE_SUBDOMAIN_URL}/${data.shortUrl}`;
      navigator.clipboard
        .writeText(fullShortUrl)
        .then(() => toast.success("Short URL copied to clipboard!"))
        .catch(() => toast.error("Failed to copy"));

      // Invalidate URL list to show new URL instantly
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      // Invalidate analytics to update total clicks
      queryClient.invalidateQueries({ queryKey: ["url-totalclick"] });
      onClose();
    },
    onError: (error) => {
      toast.error("Failed to create short URL");
      console.error(error);
    },
  });
};
