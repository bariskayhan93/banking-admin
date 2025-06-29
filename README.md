# BankingAdmin

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


Complete Admin API Endpoints

1. System Setup & Initialization [Auth0 Required]

- POST /seed - Reset and populate database with mock data
- GET /seed/status - Check if system is initialized

2. Person Management (/persons) [Auth0 Required]

- POST /persons - Create new person
- GET /persons - List all persons
- GET /persons/:id - Get person details
- PUT /persons/:id - Update person
- DELETE /persons/:id - Delete person
- POST /persons/:id/friends - Add friendship
- GET /persons/:id/friends - Get person's friends

3. Bank Account Management (/bank-accounts) [Auth0 Required]

- POST /bank-accounts - Create new account
- GET /bank-accounts - List all accounts (optional ?personId filter)
- GET /bank-accounts/:iban - Get account by IBAN
- DELETE /bank-accounts/:iban - Delete account

4. Transaction Management (/bank-transactions) [Auth0 Required]

- POST /bank-transactions - Create new transaction
- GET /bank-transactions - List all transactions (optional ?iban filter)

5. Banking Operations (/processes) [Auth0 Required]

- POST /processes - Trigger batch processing (processId: 1, 2, or 3)
- GET /processes/persons/:id/loan-potential - Calculate loan potential

6. Admin Dashboard (/admin) [Auth0 Required]
- GET /admin/users/me - Admin user profile
