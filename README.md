# Overview

[Software Demo Video] https://youtu.be/LB_O0ftHpR0

# Cloud Database

I used MongoDB.

DB Structure: 

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true
    }
});


# Development Environment

VScode

Languages: 
Javascript
HTML
CSS

Libraries/Database:
MongoDB
Express
NodeJS

# Useful Websites

* [MongoDB](https://www.mongodb.com/mern-stack)
* [geeksforgeeks](https://www.geeksforgeeks.org/mern-stack/)

# Future Work

* Add authentication
* Add notifications when DB is altered
* Fix CRUD operations--replace is currently not working.
