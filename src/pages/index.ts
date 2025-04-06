import type { APIRoute } from "astro";

export const GET: APIRoute = ({ redirect }) => {
  return redirect(
    "https://reg.uci.edu/calendars/quarterly/2024-2025/quarterly24-25.html",
    307,
  );
};
