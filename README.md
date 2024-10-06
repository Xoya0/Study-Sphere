# StudySphere

StudySphere is an interactive online learning platform designed to facilitate collaborative studying and knowledge sharing. It combines video conferencing, real-time chat, and AI-assisted learning to create an engaging virtual study environment.

## Features

- **Video Rooms**: Create or join video study sessions with peers.
- **Real-time Chat**: Communicate with study partners through text chat.
- **Whiteboard**: Collaborate on a shared digital whiteboard during video sessions.
- **AI-Assisted Learning**: Get instant answers to questions using GPT-4 integration.
- **User Authentication**: Secure login and registration system.
- **Responsive Design**: Fully functional on both desktop and mobile devices.

## Technologies Used

- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MongoDB
- Real-time Communication: Socket.io
- Video Conferencing: Agora SDK
- AI Integration: OpenAI GPT-4 API
- Authentication: JWT (JSON Web Tokens)
- UI Framework: Material-UI

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Xoya0/Study-Sphere.git
   cd StudySphere
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   REACT_APP_GPT4_API_KEY=your_openai_api_key_here
   REACT_APP_AGORA_APP_ID=your_agora_app_id_here
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Usage

1. Register for an account or log in if you already have one.
2. Create a new study room or join an existing one.
3. Use the video conferencing feature to connect with study partners.
4. Collaborate using the shared whiteboard.
5. Ask questions in the chat and get AI-assisted answers.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for the GPT-4 API
- Agora.io for the video SDK
- All contributors and supporters of the project

## Contact

For any queries, please reach out to [your-email@example.com](mailto:your-email@example.com).
