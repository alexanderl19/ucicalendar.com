import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = ({ redirect }) => {
	return redirect(
		"https://reg.uci.edu/calendars/quarterly/2025-2026/quarterly25-26.html",
		307,
	);
};
