## Initial Setup
* Add Landing Page
* And Campgrounds Page that list all campgrounds

Each campground has
	name
	image


## Creating New campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

## Style the campground page
* Add a better header/footer
* make campground display in a grid

## Style the navbar and Form
* Add a navbar to all templates
* Style the new campground form

## Add mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of routes.

## Show Page
* Review the RESTful routes we've seen so far
* Add description to campground model
* Show db.collection.drop()
* Add a show route/template

# Refactor Mongoose Code
* Create a model directory
* use module.exports
* require everything correctly

# Add seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add the comment model
* make our error go away
* display comments on campground show page

# Comment new/create
* discuss nested routes
* add the comment new and create routes
* add the new comment form

# Style show page
* Add sidebar to show page
* Display comments nicely

# Finish styling show page
* Add public directory
* Add custom stylesheet

## Auth pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model

## Auth pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

# Auth pt. 3 - Login
* Add login routes
* Add login template

# Auth pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

# Auth pt. 5 - Show/Hide links
* Show/hide auth links correctly

# refactor the routes
* use express router to reorganize all routes

# Users + comments
* associate users and comments
* save author's name to a comment automatically

# Users + campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campgrounds
* Add Method-Override
* ADD Edit Route for Campgrounds
* Add link to edit page
* Add Update Route
* Fix $set problem

# Deleting Campgrounds
* Add Destroy Route
* Add Delete button

# Authorization Part 1: campgrounds
## authentication: find out if someone is whom they say they are
## Authorization: Once you know who someone is, figure out what they are allowed to do
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

<!-- /campgrounds/:id/edit
/campgrounds/:id/comments/:comment_id/edit -->

# Deleting Coments
* Add Destroy route
* Add Delete button

<!-- /campgrounds/:id/comments/:comment_id/ -->

# Authorization part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

# Adding in Flash! (for messages)
* Demo working version
* Install and configure connect-flash
* Add bootstrap alert to header
<!-- connect-flash -->

# Style the landing page
* pictures fade in and fade out
* nax3t/background-slider

# UI improvement
* Use Bootstrap to style the login & sign up views
* Update the nav-bar menu
	* Convert .container-fluid to regular .container
	* Add conditional active class to menu list items
	* Add collapsable hamburger menu
	* Make site responsive for mobile
* Fix registration flash message bug

# Overview - Time since created w/ Moment
* Install moment js
* Require moment and add it to app.locals
* Update campground and comment models
* Use moment in your show.ejs file

# Deploy - Heroku (push - install dependency - npm start)
* 
* 
* 
* 
* 