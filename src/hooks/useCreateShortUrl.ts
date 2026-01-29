import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import toast from "react-hot-toast";
import useTokenStore from "../api/Store";

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
        "Content-Type": "application/json",
        Accept: "application/json",
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
      const fullShortUrl = `${import.meta.env.VITE_BACKEND_URL}/${data.shortUrl}`;
      navigator.clipboard
        .writeText(fullShortUrl)
        .then(() => toast.success("Short URL copied to clipboard!"))
        .catch(() => toast.error("Failed to copy"));

      queryClient.invalidateQueries({ queryKey: ["my-urls"] });
      onClose();
    },
    onError: (error) => {
      toast.error("Failed to create short URL");
      console.error(error);
    },
  });
};
