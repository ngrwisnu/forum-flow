/*
- visit the homepage: 'http://localhost:5173'
- find a button with content: 'Login'
- click the button
- get the URL
* assert it includes: '/login'
- find input fields with data-testid: 'email' & 'password' 
- find a button with data-testid: 'login-btn'
- simulate typing
    - with correct credentials
    - with wrong credentials
* assert those inputs have the correct value
- click the login button
* assert it has the correct response
    - success
        - get the URL
        * assert it includes: '/'
    - failed
        - window.alert shows up
*/
