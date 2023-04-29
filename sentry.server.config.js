import * as Sentry from "@sentry/nextjs"
import { ProfilingIntegration } from "@sentry/profiling-node"

Sentry.init({
  dsn: "https://7e2b56737a4b4703a0c7e2c21254d099@o4505096963031040.ingest.sentry.io/4505096965652480",
  // ... SDK config
  traceSampleRate: 1.0,
  profilesSampleRate: 1.0, // Profiling sample rate is relative to tracesSampleRate
  integrations: [
    // Add profiling integration to list of integrations
    new ProfilingIntegration(),
  ],
})
