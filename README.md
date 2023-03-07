# Express UUID Generator

This is an express application that generates UUIDs with a given number and type. It takes a pre-defined API key in the header and a JWT token with a username and password in the body under the /token endpoint. The application uses the uuid package to generate UUIDs.

## Installation

To install and run the application, follow these steps:

Clone the repository: 
Install the dependencies: `npm install`
Set the API_KEY environment variable: `export API_KEY=your-api-key`
Start the server: `npm start`

## API Endpoints

### POST /token
Generates a JWT token with a username and password.
```json 
{
  "username": "your-username",
  "password": "your-password"
}
```

### POST /uuid
Generates UUIDs with a given number and type.

Request Headers

Name|Type|Required|Description
API-Key|string|Yes|Your API key
Authorization|string|Yes|Your JWT token

Request Body
```json
{
  "type": "uuid",
  "count": 2
}
```
Response Body
``` json
{
  "uuids": [
    "a4a7098e-aa68-4d4f-9a33-8f1d2c36d601",
    "fe20994c-06f9-4443-af87-2c244f4940d3"
  ]
}
```

## Testing

To run the tests, use the following command:

bash
Copy code
`npm test`
The tests use the *supertest* test framework The tests are located in the test.js .

## Contributing

If you would like to contribute to this project, please follow these steps:

Fork the repository
Create a new branch: `git checkout -b my-feature`
Make your changes and commit them: `git commit -am 'Add some feature'`
Push to the branch: `git push origin my-feature`
Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

