import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = ({ redirect }) => {
	return redirect("https://summer.uci.edu/calendar/", 307);
};
