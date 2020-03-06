Water My Plants Back End Docs 

Base Url 

Use this to prefix the beginning of all requests.  Moving fowrad, all endpoints in this documentation will assume the base url has already been input before the endpoint being addressed. 

https://water-my-plants-bw-3.herokuapp.com/

content-Type = application/json

Users Route 

Register  Endpoint  /register 

    Method: POST 
    Expects
    Body 
    {
        username: // string, unique, mandatory 
        password: // string, unique, mandatory
        phone_number: // string, optional 
    }

    Returns 
    {
        id: // auto incremented, *save record to gain access to dashboard, edit or delete user. 
        username: // 
    }


Login Endpoint /login

    Method: POST 
    Expects 
    Body 
    {
        username: //
        password: //   
    }

    Returns 
    {
        message: 'Welcome 🌱 {username}!'
        token: // * save record of this, needs passed as an "authorization" header for protected routes. 
    }

Get By Id Endpoint /dashboard/:id *(where user_id from records would go)
    Method: Get 
    Expects ID passed into URL &
    Headers: Authorization: token *(from records)

    Returns 
    {
        message: Hello {username},
        user: {
            id: #
            username: username; 
            }
    }

*Logout  endpoint /logout (NOTE: in process)
    Method: POST
    Expects: nothing
    Results:  200 OK, no messages about each user. 


Edit User  endpoint /edituser/:id
    Method: PUT
    Expects: ID passed into URL & 
    Body 
    {
        username: //
        password: //
        phone_number: //
    }
    Results 
    {
        message: user {username} has been updated.
        updated: # 
    }



