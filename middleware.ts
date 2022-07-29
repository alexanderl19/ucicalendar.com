export default function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  const match = pathname.match(/^\/(?<summer>s?)(?<year>(\d{2})?)$/);

  if (match) {
    const baseUrl = "https://reg.uci.edu/calendars/quarterly";
    const groups = match.groups;
    const summer = !!groups.summer;
    const year = parseInt(groups.year);

    // Current/Next Summer Calendar (ucicalendar.com/s)
    if (summer && !year) {
      return Response.redirect(
        "https://reg.uci.edu/calendars/quarterly/2021-2022/summer22.html"
      );
    }

    // Current/Next Yearly Calendar (ucicalendar.com/)
    if (!year) {
      return Response.redirect(
        "https://reg.uci.edu/calendars/quarterly/2022-2023/quarterly22-23.html"
      );
    }

    // Summer Calendar (ucicalendar.com/s<year>)
    if (summer && year && 15 < year && year < 22) {
      const firstYear = String(year - 1).padStart(2, "0");
      const secondYear = String(year).padStart(2, "0");
      const fullYearRange = `20${firstYear}-20${secondYear}`;

      return Response.redirect(
        `${baseUrl}/${fullYearRange}/summer${secondYear}.html`
      );
    }

    // Yearly Calendar (ucicalendar.com/<year>)
    if (year && 8 < year && year < 23) {
      const firstYear = String(year).padStart(2, "0");
      const secondYear = String(year + 1).padStart(2, "0");
      const yearRange = `${firstYear}-${secondYear}`;
      const fullYearRange = `20${firstYear}-20${secondYear}`;

      return Response.redirect(
        `${baseUrl}/${fullYearRange}/quarterly${yearRange}.html`
      );
    }

    return Response.redirect(new URL("/about", request.url).toString());
  } else {
    return new Response(null, {
      headers: {
        "x-middleware-next": "1",
      },
    });
  }
}
