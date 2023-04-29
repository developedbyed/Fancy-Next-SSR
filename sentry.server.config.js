import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: "https://7e2b56737a4b4703a0c7e2c21254d099@o4505096963031040.ingest.sentry.io/4505096965652480",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})
