# Google Sign-In Verification

A Lambda function that verifies Google Sign-In tokens and retrieves user information. It can be integrated with a SwiftUI front-end application.

## Usage

The code provided in this repository implements an AWS Lambda function that serves as an API endpoint for verifying Google Sign-In tokens and retrieving user information. The API supports the following operations:

- `POST /verifyToken`: Verifies a Google Sign-In token provided in the request body and returns the user information if the token is valid.
- `GET /getUserInfo`: Retrieves user information based on the authenticated user's ID. This operation requires authentication.

To use this code, follow these steps:

1. Clone the repository:
`https://github.com/pavan3008/GoogleSignInVerification`

2. Install the required dependencies:
`npm install`

3. Configure the necessary environment variables, such as the CLIENT_ID, by updating the `.env` file.

4. Deploy the Lambda function to your AWS account using your preferred deployment method.

## Contributing

Contributions to this repository are welcome. If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.