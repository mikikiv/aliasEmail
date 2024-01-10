# aliased-email

This lightweight npm package is used to easily generate a valid aliased email addressed. If a custom alias is not included in the function, a timestamp is used that is allowed in email configurations.

Install:
`npm i aliased-email`

Example:

``` javascript | typescript
aliasedEmail("example@test.com", "an alias") 
// returns
"example+an.alias@test.com"

aliasedEmail("example@test.com")
// returns
"example+2024-01-01T12.34.56@test.com"

aliasedEmailObject("example@test.com")
// returns
{
  alias: "2024-01-01T12.34.56"
  aliasedEmail: "example+2024-01-01T12.34.56@test.com",
  createdAt: "2024-01-01T12:34:56.789Z",
  email: "example@test.com",
  error: false
}
``````
