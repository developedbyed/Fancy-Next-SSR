import * as Sentry from "@sentry/nextjs"
import { ProfilingIntegration } from "@sentry/profiling-node"

Sentry.init({
  // ... SDK config
  traceSampleRate: 1.0,
  profilesSampleRate: 1.0, // Profiling sample rate is relative to tracesSampleRate
  integrations: [
    // Add profiling integration to list of integrations
    new ProfilingIntegration(),
  ],
})
