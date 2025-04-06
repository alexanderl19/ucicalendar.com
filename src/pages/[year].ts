import { baseUrl } from "@lib/consts";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = ({ params, redirect }) => {
  const { year } = params;
  if (year) {
    const yearInt = Number(year);
    if (8 <= yearInt && yearInt <= 25) {
      const firstYear = String(yearInt).padStart(2, "0");
      const secondYear = String(yearInt + 1).padStart(2, "0");
      const yearRange = `${firstYear}-${secondYear}`;
      const fullYearRange = `20${firstYear}-20${secondYear}`;

      return redirect(
        `${baseUrl}/${fullYearRange}/quarterly${yearRange}.html`,
        307,
      );
    }
  }

  return redirect("/format", 307);
};
