export const environment = {
  production: false,
  name: 'preview',
  apiBaseUrl: 'https://banking-api.bariskayhan.com',
  auth0: {
    domain: 'banking-system-dev.eu.auth0.com',
    clientId: 'ejRXRs1jNCrJgVZR6VvKRMjDhdAhsbT6',
    audience: 'https://banking-api.bariskayhan.com',
    redirectUri: 'https://banking-admin-preview.bariskayhan.com/auth/callback'
  },
  features: {
    enableDebugLogs: true,
    enableAnalytics: false,
    enableErrorReporting: true
  }
};