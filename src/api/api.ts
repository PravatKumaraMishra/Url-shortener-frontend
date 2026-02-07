import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
  console.error(
    "VITE_BACKEND_URL environment variable is not set. Please configure it in your .env file or Vercel environment variables.",
  );
}

export default axios.create({
  baseURL: backendUrl,
});
