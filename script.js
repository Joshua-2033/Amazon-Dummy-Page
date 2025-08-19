const imgs = document.querySelectorAll('.header-slider ul img');
const prev_btn = document.querySelector('.control-prev');
const next_btn = document.querySelector('.control-next');
const slider = document.querySelector('.header-slider ul');

let n = 0;

function changeSlide() {
    // Calculate the position to scroll to
    const slideWidth = imgs[0].offsetWidth;
    const targetPosition = n * slideWidth;
    
    // Smooth scroll to the target position
    slider.style.transform = `translateX(-${targetPosition}px)`;
}

// Initialize slider (only if elements exist)
if (imgs.length > 0 && slider) {
    changeSlide();
    
    // Auto-slide functionality
    setInterval(() => {
        if (n < imgs.length - 1) {
            n++;
        } else {
            n = 0;
        }
        changeSlide();
    }, 5000); // Change slide every 5 seconds
}

if (prev_btn) {
    prev_btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (n > 0) {
            n--;
        } else {
            n = imgs.length - 1; // Loop back to last image
        }
        changeSlide();
    });
}

if (next_btn) {
    next_btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (n < imgs.length - 1) {
            n++;
        } else {
            n = 0; // Loop back to first image
        }
        changeSlide();
    });
}

// Enhanced horizontal scrolling for product containers
const scrollContainer = document.querySelectorAll(".products");

for (const item of scrollContainer) {
    item.addEventListener("wheel", (e) => {
        // Check if the scroll is more horizontal than vertical
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            if (e.deltaX > 0) {
                item.scrollLeft += 100;
            } else {
                item.scrollLeft -= 100;
            }
        } else {
            // Allow normal vertical scrolling when user is scrolling vertically
            // Only prevent and do horizontal scroll if user is scrolling horizontally over the products
            const rect = item.getBoundingClientRect();
            const isOverProducts = e.clientX >= rect.left && e.clientX <= rect.right;
            
            if (isOverProducts && item.scrollWidth > item.clientWidth) {
                // Only intercept if there's actually content to scroll horizontally
                if (e.deltaY > 0 && item.scrollLeft < item.scrollWidth - item.clientWidth) {
                    e.preventDefault();
                    item.scrollLeft += 100;
                } else if (e.deltaY < 0 && item.scrollLeft > 0) {
                    e.preventDefault();
                    item.scrollLeft -= 100;
                }
            }
        }
    });
}

// Enhanced Chatbot functionality
let chatbotOpen = false;

function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        // Create a more sophisticated chatbot interface
        createChatbotInterface();
        chatbotOpen = false; // Reset for next use
    }
}

function createChatbotInterface() {
    // Remove existing chatbot if any
    const existingChatbot = document.querySelector('.chatbot-interface');
    if (existingChatbot) {
        existingChatbot.remove();
        return;
    }
    
    // Create chatbot interface
    const chatbotInterface = document.createElement('div');
    chatbotInterface.className = 'chatbot-interface';
    chatbotInterface.innerHTML = `
        <div class="chatbot-header">
            <div class="chatbot-title">
                <div class="chatbot-avatar">🤖</div>
                <div>
                    <h3>Amazon AI Assistant</h3>
                    <p>Online now</p>
                </div>
            </div>
            <button class="chatbot-close" onclick="closeChatbot()">×</button>
        </div>
        <div class="chatbot-messages" id="chatbotMessages">
            <div class="message bot-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>Hi Joshua! I'm your Amazon shopping assistant. How can I help you find the perfect product today?</p>
                    <div class="quick-actions">
                        <button onclick="sendQuickMessage('Show me deals')">Show me deals</button>
                        <button onclick="sendQuickMessage('Track my order')">Track order</button>
                        <button onclick="sendQuickMessage('Product recommendations')">Recommendations</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="chatbot-input-container">
            <input type="text" id="chatbotInput" placeholder="Type your message..." onkeypress="handleChatbotKeypress(event)">
            <button onclick="sendChatbotMessage()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(chatbotInterface);
    
    // Focus on input
    setTimeout(() => {
        document.getElementById('chatbotInput').focus();
    }, 100);
}

function closeChatbot() {
    const chatbot = document.querySelector('.chatbot-interface');
    if (chatbot) {
        chatbot.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            chatbot.remove();
        }, 300);
    }
}

function handleChatbotKeypress(event) {
    if (event.key === 'Enter') {
        sendChatbotMessage();
    }
}

function sendChatbotMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatbotMessage(message, 'user');
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatbotMessage(response, 'bot');
    }, 1000);
}

function sendQuickMessage(message) {
    addChatbotMessage(message, 'user');
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatbotMessage(response, 'bot');
    }, 1000);
}

function addChatbotMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'user' ? '👤' : '🤖';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('deal') || lowerMessage.includes('offer')) {
        return "Great! I found some amazing deals for you. Check out our Today's Deals section with up to 60% off on electronics. Would you like me to show you specific categories?";
    } else if (lowerMessage.includes('track') || lowerMessage.includes('order')) {
        return "I'd be happy to help you track your order! You can find all your orders in the 'Returns & Orders' section. Is there a specific order you'd like to track?";
    } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion')) {
        return "Based on your browsing history, I recommend checking out the iPhone 15 Pro or Samsung Galaxy S24 Ultra. Both have excellent reviews and are currently on sale. What type of device are you looking for?";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
        return "I'm here to help! I can assist you with product searches, order tracking, recommendations, and general shopping questions. What would you like help with?";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return "I can help you find products within your budget! What price range are you considering, and what type of product are you looking for?";
    } else {
        return "I understand you're interested in that! Let me help you find exactly what you're looking for. Could you provide more details about what you need?";
    }
}

// Add some interaction feedback to product cards (for homepage)
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only if it's not the add to cart button
            if (!e.target.classList.contains('add-to-cart-btn')) {
                const productName = this.querySelector('h4')?.textContent || 'this product';
                
                // Create a simple product view modal or notification
                showProductQuickView(productName);
            }
        });
    });
    
    // Add click handlers to box-col elements for better UX (homepage)
    const boxCols = document.querySelectorAll('.box-col');
    boxCols.forEach(box => {
        box.addEventListener('click', function(e) {
            const link = this.querySelector('a');
            if (link && e.target !== link) {
                // If clicking on the box but not the link directly, trigger the link
                link.click();
            }
        });
    });
    
    // Initialize cart counter on all pages
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
});

function showProductQuickView(productName) {
    // Simple notification for product interaction
    if (typeof showCartNotification === 'function') {
        showCartNotification(`Viewing ${productName} details...`);
    } else {
        // Fallback alert if notification function not available
        alert(`Product details for ${productName} would be shown here.`);
    }
}

// Enhanced search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.nav-search-input');
    const searchIcon = document.querySelector('.nav-search-icon');
    
    if (searchInput && searchIcon) {
        searchIcon.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

function performSearch() {
    const searchInput = document.querySelector('.nav-search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        // In a real app, this would perform actual search
        if (typeof showCartNotification === 'function') {
            showCartNotification(`Searching for "${query}"...`);
        } else {
            alert(`Searching for "${query}"...`);
        }
        
        // Simulate search delay
        setTimeout(() => {
            if (typeof showCartNotification === 'function') {
                showCartNotification(`Found results for "${query}"`);
            }
        }, 1500);
    }
}

// Add styles for chatbot interface
const chatbotStyles = `
<style>
.chatbot-interface {
    position: fixed;
    bottom: 90px;
    right: 30px;
    width: 350px;
    height: 500px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    font-family: 'Outfit', sans-serif;
}

.chatbot-header {
    background: linear-gradient(135deg, #232f3e, #37475a);
    color: white;
    padding: 15px 20px;
    border-radius: 12px 12px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chatbot-title {
    display: flex;
    align-items: center;
    gap: 12px;
}

.chatbot-avatar {
    font-size: 20px;
}

.chatbot-title h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
}

.chatbot-title p {
    margin: 0;
    font-size: 12px;
    opacity: 0.8;
}

.chatbot-close {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}

.chatbot-close:hover {
    background: rgba(255,255,255,0.2);
}

.chatbot-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #f8f9fa;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.message {
    display: flex;
    gap: 10px;
    animation: fadeInUp 0.3s ease-out;
}

.message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
}

.bot-message .message-avatar {
    background: #e7f3ff;
}

.user-message {
    flex-direction: row-reverse;
}

.user-message .message-avatar {
    background: #febd69;
}

.message-content {
    max-width: 70%;
}

.message-content p {
    background: white;
    padding: 12px 16px;
    border-radius: 18px;
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-message .message-content p {
    background: #007185;
    color: white;
}

.quick-actions {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 10px;
}

.quick-actions button {
    background: white;
    border: 1px solid #ddd;
    padding: 8px 12px;
    border-radius: 12px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
}

.quick-actions button:hover {
    background: #f0f8ff;
    border-color: #007185;
    color: #007185;
}

.chatbot-input-container {
    padding: 15px 20px;
    border-top: 1px solid #eee;
    display: flex;
    gap: 10px;
    border-radius: 0 0 12px 12px;
    background: white;
}

.chatbot-input-container input {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 10px 15px;
    outline: none;
    font-size: 14px;
}

.chatbot-input-container input:focus {
    border-color: #007185;
}

.chatbot-input-container button {
    background: #007185;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}

.chatbot-input-container button:hover {
    background: #005a6b;
}

.chatbot-messages::-webkit-scrollbar {
    width: 4px;
}

.chatbot-messages::-webkit-scrollbar-track {
    background: transparent;
}

.chatbot-messages::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 2px;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes fadeInUp {
    from {
        transform: translateY(10px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .chatbot-interface {
        right: 15px;
        left: 15px;
        width: auto;
        bottom: 80px;
    }
}
</style>
`;

// Inject chatbot styles
document.head.insertAdjacentHTML('beforeend', chatbotStyles);