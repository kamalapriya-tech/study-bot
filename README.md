# StudyBot - AI Study Assistant

A beautiful, modern web-based AI chatbot designed to help students with their studies. Features a sleek chat interface powered by Hugging Face AI models.

## ✨ Features

- 💬 **Modern Chat Interface**: Beautiful, responsive design with smooth animations
- 🤖 **AI-Powered Responses**: Uses Gemini AI Studio for intelligent study assistance
- 📚 **Study-Focused**: Specialized responses for math, science, history, and English
- 🎯 **Quick Actions**: One-click buttons for common study topics
- 📅 **Study Plans**: Generate personalized study schedules
- 📱 **Mobile-Friendly**: Responsive design that works on all devices
- ⚡ **Real-time Chat**: Instant responses with typing indicators
- 🧹 **Clear Chat**: Easy chat history management

## 🎨 UI Highlights

- **Gradient Background**: Beautiful purple-to-blue gradient
- **Modern Cards**: Rounded corners and subtle shadows
- **Avatar System**: Bot and user avatars for better visual hierarchy
- **Typing Animation**: Smooth typing indicators
- **Quick Buttons**: Instant access to common study topics
- **Responsive Design**: Perfect on desktop, tablet, and mobile

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Gemini AI Studio API Key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key (you may need to enable billing for higher quotas)
   - Copy the API key and add it to your `.env` file:
     ```
     GEMINI_API_KEY=your_actual_gemini_api_key_here
     GEMINI_MODEL=gemini-pro-latest
     ```
   - **Important**: The API key in `.env` is currently a placeholder. You need a real API key from Google AI Studio for the bot to work.
   - For higher usage limits, consider enabling billing on your Google Cloud project

3. **Start the server:**
   ```bash
   npm start
   ```

## 🚀 Usage

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open your browser:**
   - Go to `http://localhost:3001`
   - The beautiful chat interface will load automatically

3. **Start chatting:**
   - Use the **quick action buttons** for instant help with math, science, history, or English
   - Type your questions in the input field
   - Press **Enter** or click the send button
   - Use the **calendar icon** to generate study plans
   - Use the **trash icon** to clear chat history

4. **Features:**
   - **Real-time responses** with typing indicators
   - **Mobile-responsive** design
   - **Smooth animations** and transitions
   - **Avatar-based** message system
   - **Quick topic buttons** for instant help

## API Endpoints

- `POST /ask` - Send a message and get AI response
  ```json
  {
    "message": "Help me with algebra"
  }
  ```

## Demo Mode

If your Gemini API is not configured or the model is unavailable, the bot automatically switches to demo mode with intelligent, topic-specific responses to keep you studying!

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript
- **AI:** Gemini AI Studio API (gemini-1.5 or your chosen Gemini model)
- **Styling:** Bootstrap 5