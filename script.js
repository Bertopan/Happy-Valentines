document.addEventListener("DOMContentLoaded", () => {
    const firefliesContainer = document.getElementById('fireflies');
    
    // Configuration
    const spawnRate = 200; 
    
    function createFirefly() {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        
        // Randomize Horizontal (Left)
        const xPos = Math.random() * 100;
        firefly.style.left = `${xPos}%`;

        // FIX: Randomize Vertical (Top) so they don't stick to the top
        const yPos = Math.random() * 100;
        firefly.style.top = `${yPos}%`;
        
        // Randomize size
        const size = Math.random() * 5 + 2; 
        firefly.style.width = `${size}px`;
        firefly.style.height = `${size}px`;
        firefly.style.backgroundColor = Math.random() > 0.5 ? '#fffb00' : '#8afcfc'; 
        
        // Randomize speed
        const duration = Math.random() * 3 + 4; 
        firefly.style.animationDuration = `${duration}s`;
        
        firefliesContainer.appendChild(firefly);
        
        setTimeout(() => {
            firefly.remove();
        }, duration * 1000); 
    }

    setInterval(createFirefly, spawnRate);
    console.log("Flower animation started.");
});