export const environment = {
  production: false,
  name: 'local',
  apiBaseUrl: 'http://localhost:3000',
  auth0: {
    domain: 'banking-system-dev.eu.auth0.com',
    clientId: 'ejRXRs1jNCrJgVZR6VvKRMjDhdAhsbT6',
    audience: 'https://banking-api.bariskayhan.com',
    redirectUri: 'http://localhost:4201/auth/callback'
  },
  features: {
    enableDebugLogs: true,
    enableAnalytics: false,
    enableErrorReporting: false
  }
};
