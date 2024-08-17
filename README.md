# Guestara Menu Management Application

This is a Node.js backend application for menu management. It allows you to create, read, update, and delete categories, subcategories, and items in a menu.

## Prerequisites

- Node.js 
- MongoDB 

## Getting Started

The application will run on `https://guestara-one.vercel.app/`, since it is already deployed .

## API Documentation

You can find the API documentation by visiting `https://guestara-thgj.onrender.com/api-docs`, it is the server deployment for this project . All requests can be verified through postman onto the base url which is `https://guestara-thgj.onrender.com` . 

## Database

I have chosen MongoDB as the database for this application because it is a NoSQL database that provides a flexible schema for storing hierarchical data like categories, subcategories, and items. Additionally, MongoDB integrates well with Node.js and has a powerful querying language.

## Learnings

1. Implementing CRUD operations with Mongoose and Express.
2. Managing hierarchical data structures in a database.
3. Documenting and showcasing a project through a README file and API documentation.

## Difficulties

The most difficult part of the assignment was establishing the relationships between the models (Category, SubCategory, and Item) and ensuring proper data retrieval and manipulation for nested data structures.

## Improvements

Given more time, I would have implemented additional features such as authentication and authorization, data validation, and error handling. Additionally, I would have created more comprehensive unit tests and explored deployment options for the application.


