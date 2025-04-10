/*
- visit the homepage: 'http://localhost:5173'
- find link with href: '/threads/create'
- click the link
* assert that url includes: '/login'
- log in with correct credentials
* assert that url includes: '/'
- click link to create new thread
* assert that url includes: '/threads/create'
- find input with data-testid: 'newThread-title'
- find input with data-testid: 'newThread-category'
- find input with data-testid: 'newThread-body'
- find button with data-testid: 'newThread-button'
- simulate typing
    - with title
    - with empty title
* assert those inputs have the correct value
- click the post thread button
- check the response
    - success
        * assert that url includes: '/'
        * assert the new thread's title is visible
    - failed
        * assert the alert shows up
*/
