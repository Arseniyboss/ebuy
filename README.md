# Ebuy

## Description

Fullstack e-commerce website that is highly accessible for people with different types of disabilities such as visual and mobility impairments

## Pages

- Home
- Product
- Contact
- Login
- Register
- Profile
- Change Password
- Cart
- Address
- Payment
- OrderReview
- Order
- UserOrders
- Orders

## Technologies

- Language: **TypeScript**
- Framework: **NextJS**
- Styling: **Styled Components**
- Database: **MongoDB**
- Unit Testing: **Jest**
- E2E Testing: **Cypress**

## Commands

| Command                                     | Action                                  |
| ------------------------------------------- | --------------------------------------- |
| npm install                                 | installs dependencies                   |
| npm run dev                                 | starts the app in development mode      |
| npm run build                               | creates a production build of the app   |
| npm start                                   | starts the app in production mode       |
| npm run lint                                | detects eslint warnings and errors      |
| npm test                                    | runs all unit tests                     |
| npm test [filename]                         | runs the specified unit test            |
| npm run e2e                                 | opens e2e tests in cypress              |
| npm run e2e:headless                        | runs e2e tests in terminal              |
| spec=[filename] npm run e2e:headless-single | runs the specified e2e test in terminal |
| npm run compile                             | detects typescript errors               |
| npm run update:latest                       | updates dependencies to latest versions |
| npm run stripe-webhook                      | tests stripe webhook locally            |
| npm run trigger-payment-success             | triggers stripe payment success         |

## Testing Stripe Webhook Locally

- Disable the real webhook in [Stripe](https://dashboard.stripe.com/test/webhooks) to prevent requests from being sent to it during local testing
- run `stripe login` command
- run `npm run stripe-webhook`

## Useful Learning References

- Custom authentication using access and refresh tokens
- Custom useForm hook with validation
- API route testing using MongoDB Memory Server
- E2E testing for PayPal and Stripe payments
