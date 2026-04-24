import './style.css';

// Intersection Observer for Timeline animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
  observer.observe(item);
});

// Interactive Assistant Logic
const chatWindow = document.getElementById('chat-window');
const optionsContainer = document.getElementById('assistant-options');

const responses = {
  "How do I register?": "To register to vote, you can usually do so online through your state's election website, by mail, or in person at a local election office. Deadlines vary by state, so it's important to check your state's specific guidelines early!",
  "When is Election Day?": "In the United States, federal Election Day is held on the Tuesday following the first Monday in November. Many local elections are also held on this day, but it's important to check your local calendar.",
  "What is a primary?": "A primary election is used by political parties to select their candidates for the general election. Depending on your state, primaries can be open (anyone can vote) or closed (only registered party members can vote).",
  "Mail-in voting?": "Mail-in voting allows you to receive your ballot by mail and return it via postal service or designated drop boxes. Most states require you to request a mail-in ballot in advance, while some automatically mail them to all registered voters."
};

function appendMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}-msg`;
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  // Auto-scroll to the bottom
  setTimeout(() => {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 50);
}

// Add typing indicator
function showTypingIndicator() {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message assistant-msg typing-indicator';
  msgDiv.id = 'typing-indicator';
  msgDiv.textContent = 'Typing...';
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

optionsContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const query = e.target.getAttribute('data-query');
    
    // Append User message
    appendMessage(query, 'user');
    
    // Disable buttons temporarily
    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
    
    // Simulate thinking delay with typing indicator
    showTypingIndicator();
    
    setTimeout(() => {
      removeTypingIndicator();
      appendMessage(responses[query], 'assistant');
      buttons.forEach(btn => btn.disabled = false);
    }, 1200);
  }
});
