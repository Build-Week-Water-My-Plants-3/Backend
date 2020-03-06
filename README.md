Water My Plants Back End Docs 

Base Url 

Use this to prefix the beginning of all requests.  Moving foward, all endpoints in this documentation will assume the base url has already been input before the endpoint being addressed. 

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


------------------------------------------------------------------------------------------------------

Water my Plants
NAME
Water my Plants
PITCH
Ensuring that all your plants are consistently watered is actually pretty difficult. Water My Plants is an app that helps to solve those problems. With an easy to use interface for creating a plant watering schedule tailored to each individual plant, WaterMyPlants will remind users when its time to feed that foliage and quench your plants' thirst.
MVP
1. User can signup/create an account by providing a unique `username`, a valid mobile `phoneNumber` and a `password`. (mobile, web)
2. User can log in to an authenticated session using the credentials provided at account creation/signup.(mobile, web)
3. Authenticated user can Create, Update and Delete a `plant` object.  At a minimum, each  `plant` must have the following properties (mobile, web):
	- `id`: Integer
	- `nickname`: String
	- `species` : String
	- `h2oFrequency`: Type determined by implementation
	- `image`: optional
4. Authenticated user can view a list of created `plants`. A `plant` can be Deleted or selected to present user with a detail view where user can then update any property of the selected `plant`.(mobile, web)
5. Authenticated user can receive local reminder/notification on their mobile device when when a scheduled `h2oFrequency` is reached. At a minimum, this reminder/notification must display the `nickname` and a short description of the task. (mobile)
6. Authenticated user can update their `phoneNumber` and `password`.
STRETCH
1. Authenticated user can set up Push Notifications to be triggered when an `h2oFrequency` of any `plant` arrives/has elapsed. (mobile, web)
2. Implement a feature that allows an Authenticated user can see an appropriate suggested `h2oFrequency` based on `species` using the API of your choice. (web, mobile)
3. Authenticated user can upload `images` of a `plant`. If no user `image` is provided, a placeholder `image` of a plant of the same `species` populates the view. (web, mobile)
4. UX: Collaborate on a portion or all of a Web MVP with any Web teammate. For example: File structuring, Git, Styles, Semantic elements, etc. Learn something new and practice cross-collaborating. (UX)
