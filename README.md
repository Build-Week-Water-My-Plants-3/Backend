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

Get By Id  endpoint /dashboard/:id     *(where user_id from records would go)
    Method: Get 
    Expects: ID passed into URL &
    Headers: Authorization: token *(from records)

    Returns: 
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
    Body: 
    {
        username: //
        password: //
        phone_number: //
    }
    Results: 
    {
        message: user {username} has been updated.
        updated: # 
    }

Delete User endpoint /deleteuser/:id
    Method: DELETE
    Expects: ID in URL 
    Returns 
    {
        deletedUser: 1 
    }

Get All Users (for testing purposes) endpoint /users/all
    Method: GET 
    Expects: 
        Headers: Authorization: token *(from records)
    Results: Array of Users, each user being an object {}.


Plant Routes

Get All  endpoint /plants/all
    Method: GET
    Expects:  
        Headers: Authorization: token *(from records)
    Results: Array of Plants, each plant being an object {}. 

Add New Plant   endpoint /plants/new 
    Method: POST
    Expects: 
    Body 
    {
        species_name: // string, mandatory
        nickname:  // string, mandatory
        h2o_amount: // string, mandatory
        user_id: // number(foreign key), mandatory
    }
    Results: 
    {
        id: // #
        species_name: // string
        nickname: // string 
    }

Edit a Plant  endpoint /edit/:id
    Method: PUT
    Expects: ID (of plant) in URL &
    Body: 
    {
       species_name: // 
        nickname:  // 
        h2o_amount: // 
        user_id: // 
    }
    Results: 
    {
        message: Your plant was updated
        updated: #
        changes: 
            {
                species_name: //
                nickname: //
                h2o_amount: //
                user_id: //
            }
    }

Delete A Plant  endpoint /delete/:id 
    Method: DELETE
    Expects: ID(of plant) in the URL 
    Results: 
    {
        message: Plant with the id of #7 was deleted.
        deletedPlant: 1 
    }


Testing Routes 

Get Title of Project endpoint /testing
    Method: GET
    Expects: nothing
    Results: 
    {
        message: Water My Plants 🌻
    }

Get Testing Token endpoint /testing-token
    Method: GET
    Expects: nothing
    Results: 
    {
        message: Testing Token
        token: // token * (Cannot be used in authorization header because it's not linked to a user.)
    }
