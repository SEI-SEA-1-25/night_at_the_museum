# Night At The Museum

## Overview

You will create an app that allows the user to put a search term into a field, and see museum works that contain this search term in their titles. As a stretch goal, your app will allow users to add any search results they like to the list of popular works, and allow users to view all popular works.

## Getting started

Fork and clone this repo. You will build the express project right here!

## Core goals

1. User comes to the homepage and sees a search form
1. User enters a term and submits the form
1. User sees works that contain this term in their title

## Stretch goals

1. Next to each search result, user sees a button to add this work to the list of popular works
1. When this button is clicked, the work is saved to the database
1. After saving a work, the user is redirected to a list of all popular works. (There should also be a link on every page that leads to the popular works page.)

## Steps to achieve core goals

1. Note that the core section does not require a database! You can wait to set up a database until the stretch section.
1. Here is the API we will be using: <https://github.com/harvardartmuseums/api-docs>. Make a request to get your API key.
1. Set up an express app, complete with ejs. Install `dotenv`, create a file at the top level of the project called `.env`, and put your api key in it. Add `require('dotenv').config()` to the top of your server.js.
1. Create a home page with a search form. This form should have a method of GET since it's asking for data. Its action will be a non-RESTful route, perhaps `'/search'` or similar.
1. Create the route that this form gets submitted to. In this route, make a request to `http://api.harvardartmuseums.org/object?apikey=<your api key>&title=<the user's search term>&size=30`. Use `process.env.<the key you used in your .env file>` to get your API key out of there. Note that for GET requests, the incoming data is in the req's `query` property, not its `body`. The purpose of the size=30 is explained below, but you might want to adjust that number to make your results page look how you want.
1. After the query is complete, extract the titles and images of the results. Filter out all results that don't have an image (hint: look at the primaryimageurl property of each result). Render a view file that uses a loop to display all of these filtered results.

## Steps to achieve stretch goals

1. Set up sequelize, and create a model (perhaps called `work`) that has columns for a title and a primaryimageurl. Use a dbTest to make sure you can `create` and `findAll` for this model.
1. For each search result, display a form with an Add to Popular Works button. This form should have hidden inputs that contain the work's title and primaryimageurl. When submitted, this form will add the work to our db table. Decide on a method and action for this form: note that this is a RESTful action!
1. Create a route for this form to submit to. In this route, create a work, then redirect to the works index.
1. Create a route and view file for the works index. The route simply looks up all works and passes them into the view, and the view loops through them to display their titles and images.
1. Your search results page and your works index page probably have very similar code to display the title and image of a work! Refactor these to use a single shared partial. (Think about the advantage of this refactor: if in the future you want to change how individual works are displayed, you only have to change it in one place.)
