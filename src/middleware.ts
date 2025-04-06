// Derived from https://github.com/baselime/sveltekit-opentelemetry-middleware/blob/e424fab525f097cfb944ff06a53faeec64b34684/src/index.ts
// LICENSE: Apache-2.0 (c) Baselime Limited, Alexander Liu

import { defineMiddleware } from "astro:middleware";
import { getSecret } from "astro:env/server";
import { register, tracer } from "@lib/instrumentation";
import { SpanKind } from "@opentelemetry/api";
import { flatten } from "flat";

if (getSecret("VERCEL_ENV") === "production") {
	register();
}

export const onRequest = defineMiddleware((context, next) => {
	const { request, routePattern } = context;
	let requestId: string | undefined = undefined;

	const vercelId = request.headers.get("x-vercel-id");

	// Only match the last part of the id because otherwise it can differ from the logs as it appends the edge location region to it.
	if (vercelId) {
		const requestIdParts = vercelId.split("::");
		const id = requestIdParts[requestIdParts.length - 1];
		requestId = id;
	}

	const url = new URL(request.url);
	return tracer.startActiveSpan(
		`${request.method} ${routePattern}`,
		{
			kind: SpanKind.SERVER,
			attributes: flatten({
				requestId,
				http: {
					headers: request.headers,
					pathname: url.pathname,
					method: request.method,
					url: request.url,
				},
				astro: {
					routePattern,
					isPrerendered: context.isPrerendered,
					params: context.params,
					generator: context.generator,
				},
			}),
		},
		async (span) => {
			context.locals.traceId = span.spanContext().traceId;

			const response = await next();

			span.setAttributes(
				flatten({
					http: {
						status: response.status,
					},
				}),
			);

			span.end();
			return response;
		},
	);
});
