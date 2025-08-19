// Global variables
let slideIndex = 1;
let autoplayInterval;
let isAutoplay = false;
let intervalTime = 3000; // Default 3 seconds
// Add to global variables
let imageUrls = Array.from(document.querySelectorAll('.slide img')).map(img => img.src);

// File upload handling
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const files = e.target.files;
    if (files.length === 0) return;
    
    document.getElementById('uploadStatus').textContent = `Uploading ${files.length} images...`;
    
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload only image files');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            // Create new slide element
            const newSlide = document.createElement('div');
            newSlide.className = 'slide fade';
            
            const imgNumber = document.querySelectorAll('.slide').length + 1;
            newSlide.innerHTML = `
                <div class="numbertext">${imgNumber} / ${imgNumber}</div>
                <img src="${e.target.result}" alt="Uploaded image">
                <div class="caption">Uploaded Image</div>
            `;
            
            document.querySelector('.slideshow-container').appendChild(newSlide);
            imageUrls.push(e.target.result);
            
            // Update dot indicators
            const newDot = document.createElement('span');
            newDot.className = 'dot';
            newDot.onclick = () => currentSlide(imageUrls.length);
            document.querySelector('.dots-container').appendChild(newDot);
            
            // Update status
            document.getElementById('uploadStatus').textContent = 
                `Added ${file.name} successfully!`;
            
            // If first image uploaded, show it
            if (imageUrls.length === 1) showSlides(1);
        };
        
        reader.readAsDataURL(file);
    });
});

// Modified showSlides function
function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    // Update slide index
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    
    // Update slides and dots
    Array.from(slides).forEach(slide => slide.style.display = "none");
    Array.from(dots).forEach(dot => dot.className = dot.className.replace(" active", ""));
    
    if (slides[slideIndex-1]) {
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }
    
    // Update numbertext for all slides
    Array.from(slides).forEach((slide, index) => {
        slide.querySelector('.numbertext').textContent = 
            `${index+1} / ${slides.length}`;
    });
}


// Initialize the slider when the page loads
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
});

// Function to move to next/previous slide
function changeSlide(n) {
    showSlides(slideIndex += n);
}

// Function to set current slide (used by dots)
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Main function to display slides
function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    // Loop back to first slide if we reach the end
    if (n > slides.length) {slideIndex = 1}
    // Go to last slide if we go before the first one
    if (n < 1) {slideIndex = slides.length}
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Show the current slide and activate its dot
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Function to toggle autoplay
function toggleAutoplay() {
    let button = document.getElementById('autoplay');
    
    if (!isAutoplay) {
        // Start autoplay
        autoplayInterval = setInterval(() => {
            changeSlide(1);
        }, intervalTime);
        isAutoplay = true;
        button.textContent = 'Stop Autoplay';
        button.style.backgroundColor = '#f44336'; // Red color for stop
    } else {
        // Stop autoplay
        clearInterval(autoplayInterval);
        isAutoplay = false;
        button.textContent = 'Start Autoplay';
        button.style.backgroundColor = '#4CAF50'; // Green color for start
    }
}

// Function to update interval time
function updateInterval() {
    let rangeInput = document.getElementById('interval');
    let value = rangeInput.value;
    
    // Update the displayed value
    document.getElementById('interval-value').textContent = value + 's';
    
    // Convert to milliseconds
    intervalTime = value * 1000;
    
    // Restart autoplay with new interval if it's currently running
    if (isAutoplay) {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            changeSlide(1);
        }, intervalTime);
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (event.key === 'ArrowRight') {
        changeSlide(1);
    }
});
