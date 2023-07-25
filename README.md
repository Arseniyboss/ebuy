# Ebuy

## Description

Fullstack e-commerce website built with NextJS

## Technologies

- Language: **TypeScript**
- Framework: **NextJS**
- Styling: **Styled Components**
- Database: **MongoDB**
- API Route Tests: **Jest**
- E2E Tests: **Cypress**

## Commands

| Command                              | Action                                  |
| ------------------------------------ | --------------------------------------- |
| npm install                          | installs dependencies                   |
| npm run dev                          | starts the app in development mode      |
| npm run build                        | creates a production build of the app   |
| npm start                            | starts the app in production mode       |
| npm test                             | runs all api route tests                |
| npm test [filename]                  | runs the specified api route test       |
| npm run e2e                          | opens e2e tests in cypress              |
| npm run e2e:headless                 | runs e2e tests in terminal              |
| spec=[filename] npm run e2e:headless | runs the specified e2e test in terminal |

## Pages

| Page            | API Route | API Route Test | UI  | E2E Test |
| --------------- | :-------: | :------------: | :-: | :------: |
| Home            |    ✅     |       ✅       | ✅  |    ✅    |
| Product         |    ✅     |       ✅       | ✅  |    ✅    |
| Contact         |    ✅     |       ✅       | ✅  |    ✅    |
| Login           |    ✅     |       ✅       | ✅  |    ✅    |
| Register        |    ✅     |       ✅       | ✅  |    ✅    |
| Profile         |    ✅     |       ✅       | ✅  |    ✅    |
| Cart            |    ✅     |       ✅       | ✅  |    ✅    |
| ShippingAddress |    ✅     |       ✅       | ✅  |    ✅    |
| PaymentMethod   |    ❌     |       ❌       | ❌  |    ❌    |
| PlaceOrder      |    ❌     |       ❌       | ❌  |    ❌    |
| Order           |    ❌     |       ❌       | ❌  |    ❌    |
| UserOrders      |    ❌     |       ❌       | ❌  |    ❌    |
| OrderList       |    ❌     |       ❌       | ❌  |    ❌    |

## Features

- Product Search
- Product Sorting
- Product Pagination
- Full featured shopping cart
- Secure authentication with httpOnly and sameSite cookie
