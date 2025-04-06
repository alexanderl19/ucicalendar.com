import { registerOTel } from "@vercel/otel";
import { trace } from "@opentelemetry/api";

export const tracer = trace.getTracer("sveltekit-middleware");

export function register() {
	registerOTel({
		serviceName: "alexanderliu-ucicalendar",
	});
}
