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

// Initialize slider
changeSlide();

prev_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (n > 0) {
        n--;
    } else {
        n = imgs.length - 1; // Loop back to last image
    }
    changeSlide();
});

next_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (n < imgs.length - 1) {
        n++;
    } else {
        n = 0; // Loop back to first image
    }
    changeSlide();
});

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

// Chatbot functionality
let chatbotOpen = false;

function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        // For now, just show an alert. In your actual implementation, 
        // you'll replace this with your chatbot interface
        alert("🤖 AI Assistant: Hi Joshua! I'm your Amazon shopping assistant. How can I help you find the perfect product today?");
        
        // Reset the state
        chatbotOpen = false;
    }
}

// Add some interaction feedback to product cards
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // This would normally add to cart or navigate to product page
            // For now, just provide feedback
            const productName = this.querySelector('h4').textContent;
            alert(`Product "${productName}" clicked! In the full version, this would add to cart or show product details.`);
        });
    });
    
    // Add click handlers to box-col elements for better UX
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
});