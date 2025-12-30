# Create a repository
# Initialize the repo
# node_moddules, package.json, package-lock.json
# Install express
# Create a server
# Listen to 3001
# Write request handlers for /test, /handle
# Install nodemon and update scripts inside package.json
# what is dependencies
# what is the use of "-g" while npm install
# Difference  between caret  vs tilde (^ vs ~)

# Initialize git
 -- gitignore
 -- Create a remote repo on github
 -- Push all codes to remote origin
 -- Play with the routes and route extensions ex. /hello , /hello/2
# Install postman and make workspace/collection -> test get api call 
- Write logic to handle get, post, patch, delete api calls and test them on postman
- Explore routing and use of ?, +, (), * in the routes
- Use of regex in routes /a/, /.*fly$/
- Reading the query params in the routes
- Reading the dynamic rutes
- Multiple route handlers - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/routes", rh, [rh2,rh3],rh4,rh5)
- what is middleware
- how express js basically handles requests behind the scenes
- diff b/w app.use vs app.all
- write a dummy auth middleware for admin
- write a dummy auth middleware for all user route except /user/logn
- error hnadling using app.use("/",(err,req,res,next)={})

# MongoDB
- Create a free cluster on mongodb official website (mongodb atlas)
- Install mongoose library
- Connect your application to the database "connection-url/devTinder"
- call the connectdb function and connect to database before starting application on 3000
- Create a userSchema & UserModel
- Create post api /signup to add data to db
- push some documents using api calls from postman
- error handling using try catch


- Diff b/w json and javascript object