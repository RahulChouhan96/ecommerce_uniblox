# Ecommerce App
[Task Link](https://github.com/neustackapp/assignment)


## Introduction
Following app has only backend APIs. It's tech stack is NodeJS, ExpressJS and MongoDB. This ecommerce app has almost all functionalities except one. In admin APIs, the first one is not implemented due to lack of understanding. So, please make it clear. 

In this "Generate a discount code if the condition above is satisfied.", firstly discound codes will already be there hence, why one need to generate them. Also, "if the condition above is satisfied", the above conditions are mentioned for normal user but this API is for admin, so how do you want me to apply those conditions.


## Server Setup
1. Install nodeJS by downloading it from browser.
2. Inside this project, run `npm install`. It will generate all the packages used inside.
3. Also install nodemon by `npm install -g nodemon`. It will be used to run the server.
4. Now run the server by command `nodemon server.js`.


## MongoDB Setup
1. Download mongoDB from browser and install it.
2. You can download its GUI Studio3T to check data in better way. Its free to use.


## Functionalities Implemented
1. User can add item in a cart.
2. User can checkout an item along with coupon code functionality. The API checks whether coupon code is valid or not. And then only applies it on price.
3. Admin API: API to get all purchases, overall amount, all discount codes and overall discount.


## Postman APIs

