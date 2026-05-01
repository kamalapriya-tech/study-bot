// Enhanced StudyBot Chat Interface
let isTyping = false;

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chatBox");
  const text = input.value.trim();
  if (!text || isTyping) return;

  // Add user message
  addMessage(text, 'user');
  input.value = "";

  // Show typing indicator
  showTypingIndicator();

  try {
    const response = await fetch("http://localhost:3001/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    hideTypingIndicator();

    const reply = data?.reply || "Sorry, I couldn't process your request right now.";

    // Determine message type
    let messageType = 'bot';
    if (reply.includes("⚠️") || reply.includes("quota")) {
      messageType = 'bot demo';
    } else if (reply.includes("❌") || reply.includes("Failed")) {
      messageType = 'bot error';
    }

    addMessage(reply, messageType);
    scrollToBottom();

  } catch (err) {
    hideTypingIndicator();
    addMessage("❌ Sorry, I'm having trouble connecting right now. Please try again.", 'bot error');
    scrollToBottom();
  }
}

function addMessage(text, type) {
  const chat = document.getElementById("chatBox");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;

  const avatarDiv = document.createElement("div");
  avatarDiv.className = type === 'user' ? 'user-avatar' : 'bot-avatar-small';

  if (type === 'user') {
    avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
  } else {
    avatarDiv.innerHTML = '<i class="fas fa-graduation-cap"></i>';
  }

  const contentDiv = document.createElement("div");
  contentDiv.className = "message-content";

  const textP = document.createElement("p");

  // ✅ FORMAT FUNCTION (added)
  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")   // bold
      .replace(/\n/g, "<br>")                   // new line
      .replace(/\|/g, " ")                      // remove |
      .replace(/- /g, "• ");                    // bullets
  }

  // ✅ IMPORTANT FIX (only this line matters)
  textP.innerHTML = formatText(text);

  contentDiv.appendChild(textP);
  messageDiv.appendChild(avatarDiv);
  messageDiv.appendChild(contentDiv);
  chat.appendChild(messageDiv);

  scrollToBottom();
}

function showTypingIndicator() {
  isTyping = true;
  const chat = document.getElementById("chatBox");
  const typingDiv = document.createElement("div");
  typingDiv.className = "message thinking";
  typingDiv.id = "typingIndicator";
  typingDiv.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  chat.appendChild(typingDiv);
  scrollToBottom();
}

function hideTypingIndicator() {
  isTyping = false;
  const typingIndicator = document.getElementById("typingIndicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function scrollToBottom() {
  const chat = document.getElementById("chatBox");
  setTimeout(() => {
    chat.scrollTop = chat.scrollHeight;
  }, 100);
}

function sendQuickMessage(message) {
  document.getElementById("userInput").value = message;
  sendMessage();
}

function clearChat() {
  const chat = document.getElementById("chatBox");
  chat.innerHTML = `
    <div class="welcome-message">
      <div class="bot-avatar-small">
        <i class="fas fa-graduation-cap"></i>
      </div>
      <div class="message-content">
        <p>Hello! I'm StudyBot, your AI study assistant. How can I help you with your studies today?</p>
        <div class="quick-questions">
          <button class="quick-btn" onclick="sendQuickMessage('Help me with math')">📐 Math Help</button>
          <button class="quick-btn" onclick="sendQuickMessage('Explain science concepts')">🔬 Science</button>
          <button class="quick-btn" onclick="sendQuickMessage('History questions')">📚 History</button>
          <button class="quick-btn" onclick="sendQuickMessage('English grammar')">📝 English</button>
        </div>
      </div>
    </div>
  `;
}

async function generateSyllabus() {
  const syllabus = `📅 **Study Plan for This Week:**

**Day 1: Mathematics**
• Algebra basics
• Practice equations
• Word problems

**Day 2: Science**
• Physics fundamentals
• Chemistry basics
• Biology concepts

**Day 3: English**
• Grammar rules
• Reading comprehension
• Writing practice

**Day 4: History**
• Key historical events
• Important figures
• Timeline review

**Day 5: Computer Science**
• Basic programming
• Web development
• Problem-solving

**Day 6: Revision**
• Review all subjects
• Practice tests
• Weak areas focus

**Day 7: Rest & Assessment**
• Light review
• Self-assessment
• Plan for next week

💡 **Tips:** Study 2 hours daily, take breaks, and practice regularly!`;

  addMessage(syllabus, 'bot');
}

// Enhanced keyboard support
document.getElementById("userInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

// Auto-resize input (optional enhancement)
document.getElementById("userInput").addEventListener("input", function() {
  const sendBtn = document.getElementById("sendButton");
  if (this.value.trim()) {
    sendBtn.style.background = "var(--primary-color)";
  } else {
    sendBtn.style.background = "";
  }
});

// Initialize the chat
document.addEventListener("DOMContentLoaded", function() {
  scrollToBottom();
});
