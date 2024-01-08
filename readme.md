# aliased-email

This lightweight npm package is used to easily generate a valid aliased email addressed. If a custom alias is not included in the function, a timestamp is used that is allowed in email configurations.

Example:

``` javascript
aliasedEmail("example@test.com", "an alias") 

// returns
"example+an.alias@test.com"

aliasedEmail("example@test.com")
// returns
"example+2024-01-01T12.34.56.789Z@test.com"

aliasedEmailObject("example@test.com")
// returns
{
  email: "example@test.com",
  alias: "2024-01-01T12.34.56.789Z"
  aliasedEmail: "example+2024-01-01T12.34.56.789Z@test.com",
  error: false
}
``````
