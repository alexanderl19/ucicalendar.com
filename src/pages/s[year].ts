import { baseUrl } from "@lib/consts";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, redirect, rewrite }) => {
	const { year } = params;
	if (year) {
		const yearInt = Number(year);
		if (15 <= yearInt && yearInt <= 24) {
			const firstYear = String(yearInt - 1).padStart(2, "0");
			const secondYear = String(yearInt).padStart(2, "0");
			const fullYearRange = `20${firstYear}-20${secondYear}`;

			return redirect(
				`${baseUrl}/${fullYearRange}/summer${secondYear}.html`,
				307,
			);
		}
	}

	const response = await rewrite("/format?error=1");
	return new Response(response.body, {
		status: 400,
		statusText: "Year Not Currently Valid",
	});
};
