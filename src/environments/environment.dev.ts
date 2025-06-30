export const environment = {
  production: false,
  name: 'development',
  apiBaseUrl: 'https://banking-api-dev.bariskayhan.com',
  auth0: {
    domain: 'banking-system-dev.eu.auth0.com',
    clientId: 'ejRXRs1jNCrJgVZR6VvKRMjDhdAhsbT6',
    audience: 'https://banking-api.bariskayhan.com',
    redirectUri: 'https://banking-admin-dev.bariskayhan.com/auth/callback'
  },
  features: {
    enableDebugLogs: true,
    enableAnalytics: false,
    enableErrorReporting: true
  }
};