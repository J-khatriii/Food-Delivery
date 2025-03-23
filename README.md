# Food Ordering Website


![Hero](https://i.ibb.co/59cwY75/food-hero.png)

![Products](https://i.ibb.co/JnNQPyQ/food-products.png)

![Cart](https://i.ibb.co/t2LrQ8p/food-cart.png)

![Payment](https://private-user-images.githubusercontent.com/141726527/318243171-de526971-c9c7-4235-93b2-dc2690c25b5d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDI3NTQ2ODIsIm5iZiI6MTc0Mjc1NDM4MiwicGF0aCI6Ii8xNDE3MjY1MjcvMzE4MjQzMTcxLWRlNTI2OTcxLWM5YzctNDIzNS05M2IyLWRjMjY5MGMyNWI1ZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzIzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMyM1QxODI2MjJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kNzkzYjI0NzA0ZjU2ZmU5MTRmYzk2Yzg4YmE5MDRlZTRkOWNlM2QwZDhmZWM3NTE1YWM2OGIwNDIzOTA2ZGMyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.oDqZgf7bhBXdzMpYIF1q7bQD4R_i256HtWihIgY9GQE)


## Run Locally

Clone the project

```bash
    https://github.com/J-khatriii/Food-Delivery.git
```
Go to the project directory

```bash
    cd Food-Delivery
```
Install dependencies (frontend)

```bash
    cd frontend
    npm install
```
Install dependencies (admin)

```bash
    cd admin
    npm install
```
Install dependencies (backend)

```bash
    cd backend
    npm install
```
Setup Environment Vaiables

```Make .env file in "backend" folder and store environment Variables
  JWT_SECRET=YOUR_SECRET_TEXT
  SALT=YOUR_SALT_VALUE
  MONGO_URL=YOUR_DATABASE_URL
  STRIPE_SECRET_KEY=YOUR_KEY
 ```

Setup the Frontend and Backend URL
   - App.jsx in Admin folder
      const url = YOUR_BACKEND_URL
     
  - StoreContext.js in Frontend folder
      const url = YOUR_BACKEND_URL

  - orderController in Backend folder
      const frontend_url = YOUR_FRONTEND_URL 

Start the Backend server

```bash
    nodemon server.js
```

Start the Frontend server

```bash
    npm start
```

Start the Backend server

```bash
    npm start
```
## Tech Stack
* [React](https://reactjs.org/)
* [Node.js](https://nodejs.org/en)
* [Express.js](https://expressjs.com/)
* [Mongodb](https://www.mongodb.com/)
* [Stripe](https://stripe.com/)
* [JWT-Authentication](https://jwt.io/introduction)
* [Multer](https://www.npmjs.com/package/multer)

## Deployment

The application is deployed on Render.
