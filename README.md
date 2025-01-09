# iShelf

## Getting Started

Follow the steps below to set up and run the project in your local environment.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

---

### Steps to Run the Project

1. **Fork and Clone the Repository**
   - Fork this repository to your GitHub account.
   - Clone the forked repository to your local machine:
     ```bash
     git clone https://github.com/<your-username>/ishelf.git
     ```
   - Navigate into the project directory:
     ```bash
     cd ishelf
     ```

2. **Install Dependencies**
   - Install the required npm packages:
     ```bash
     npm install
     ```

3. **Set Up the Environment Variables**
   - Copy the `.env.example` file to create a `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file if needed to configure the project settings, such as `DATABASE_URL`.

4. **Set Up the Database**
   - Run the following Docker command to set up the PostgreSQL database:
     ```bash
     docker run -d --name ishelf-db -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=ishelf-db -p 5432:5432 postgres
     ```

5. **Migrate and Generate Prisma**
   - Run the migration commands to configure the database schema using Prisma:
     ```bash
     npx prisma migrate dev
     ```
   - Generate Prisma client:
     ```bash
     npx prisma generate
     ```

6. **Run the Development Server**
   - Start the project in development mode:
     ```bash
     npm run dev
     ```

---

### Project Structure

- **`src/`**: Contains the source code.
- **`prisma/`**: Contains the Prisma schema for database management.

---

### Contributing

Feel free to contribute to this project by submitting pull requests. Make sure to fork and create a feature branch for your changes.

---

Happy coding! 🎉