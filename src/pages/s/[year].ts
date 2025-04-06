import { baseUrl } from "@lib/consts";
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ params, redirect }) => {
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

  return redirect("/format", 307);
};
