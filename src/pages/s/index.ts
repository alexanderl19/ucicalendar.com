import type { APIRoute } from "astro";

export const GET: APIRoute = ({ params, redirect }) => {
  return redirect("https://summer.uci.edu/calendar/", 307);
};
