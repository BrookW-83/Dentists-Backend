# Kalkidan Dentistry Website Backend Project

## Overview

The Dental Website Backend Project is a comprehensive Node.js application designed to manage various functionalities for a dental website. It provides user authentication, appointment scheduling, patient management, and more. The project leverages Express.js for handling HTTP requests, bcrypt for password hashing, and JSON Web Tokens (JWT) for secure user sessions. It also integrates with a PostgreSQL database for data storage.

## Features

- **User Authentication**: Allows users to register and log in securely.
- **Appointment Scheduling**: Enables patients to book, view, and manage their dental appointments.
- **Patient Management**: Provides functionalities to manage patient records, including personal information and medical history.
- **Blogs Posts**: Allows the management of dental staff, to publish blogs.
- **Services**: Shows services to users.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for handling HTTP requests and routing.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Library for creating and verifying JWTs.
- **@vercel/postgres**: PostgreSQL client for database operations.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/dental-website-backend.git
   cd dental-website-backend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:
   Create a [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fas2v%2FDocuments%2FGitHub%2FDentists-Backend%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/as2v/Documents/GitHub/Dentists-Backend/.env") file in the root directory and add the following variables:
   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**:
   ```sh
   npm start
   ```

## Security Considerations

- **Password Hashing**: User passwords are hashed using bcrypt before being stored in the database.
- **JWT**: JSON Web Tokens are used to manage user sessions securely. Ensure that the `JWT_SECRET` environment variable is kept secure and not exposed.


## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For any questions or issues, please open an issue on GitHub or contact the project maintainer.

---

Thank you for using the Dental Website Backend Project! We hope it helps you build secure and robust systems for managing your dental practice.
