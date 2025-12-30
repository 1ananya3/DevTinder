# DevTinder Apis

## authRouter
- Post /signup
- Post /login
- Post /logout

## profileROuter
- Get /profile/view
- Patch /profile/edit
- Patch  /profile/password

## connectionRequestRouter
- Post /request/send/intested/:userId
- Post /request/send/ignored/:userId 
- Post /request/send/:status/:userId 

- Post /request/review/accepted/:requestId
- Post /request/review/rejected/:requestId

## userRouter
- Get /user/connections
- Get /user/requests/received
- Get /user/feed - Gets you the profiles of other users on platform
Status : ignore, interested, accept, reject

 {
        "emailId":"hdfc@gmail.com",
        "password":"hdfcBacnk@123"
 }