# SmilePost

SmilePost is a web application designed to help users create and send personalized thank-you cards easily and securely. The platform streamlines the process of building custom cards and sending them via email, making gratitude simple and delightful.

## Features
- Build custom thank-you cards with a user-friendly interface
- Send cards via email using the integrated email server
- Responsive design for desktop and mobile
- API-driven architecture for scalability

## Tech Stack
- **Frontend:** TypeScript, React (inferred from src/components)
- **Backend:** Node.js
- **API:** OpenAPI specification (`openapi.yaml`)
- **Email:** Custom email server (`email-server.js`)
- **Containerization:** Docker (`Dockerfile`, `docker-compose.yml`)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- Docker (optional, for containerized setup)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd thank-you
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the development server:
```bash
npm start
```

### Using Docker
Build and run the app with Docker Compose:
```bash
docker-compose up --build
```

## API Documentation
See `openapi.yaml` for the API specification. You can use tools like Swagger UI to visualize and interact with the API.

## Project Structure
- `src/components/` – UI components
- `src/services/` – API client and service logic
- `src/types/` – TypeScript types
- `src/utils/` – Utility functions
- `email-server.js` – Email sending logic
- `Dockerfile` & `docker-compose.yml` – Containerization

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.

## Contact
For questions or support, please contact the project maintainer.

