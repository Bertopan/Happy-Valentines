document.addEventListener("DOMContentLoaded", () => {
    
    
    // --- 1. CONFIGURATION: The 12 Flowers ---
    const flowersData = [
        { id: 1, x: 300, y: 150, color: '#ff5555', msg: "To my favorite Sage-colored soul: You make everything a little more peaceful, even from for away." },
        { id: 2, x: 200, y: 250, color: '#55ffff', msg: "I know you find it hard to believe, but you really are the most beautiful view I've seen." },
        { id: 3, x: 400, y: 250, color: '#ff4500', msg: "Distance is just a test to see how far love can travel. From Pampanga to Palawan, my Heart is always with you, Ali." },
        { id: 4, x: 100, y: 350, color: '#aa55ff', msg: "You don't have to say 'I love you' back, for me to know how special I am to you. I'm happy just being your 'bebe'." },
        { id: 5, x: 500, y: 350, color: '#ff55aa', msg: "I'd trade a whole box of Snickers just to see you smile for a second." },
        { id: 6, x: 300, y: 300, color: '#ff00ff', msg: "You're the Carbonara to my Baked Mac, different but the perfect match." },
        { id: 7, x: 150, y: 450, color: '#55ff55', msg: "Our story started on July 27th, and it's been my favorite chapter of my life ever since." },
        { id: 8, x: 450, y: 450, color: '#ffaa55', msg: "The only thing harder than this distance between Pampanga and Palawan is... well, me. every time I imagine you and I can't do anything about it." },
        { id: 9, x: 250, y: 400, color: '#5555ff', msg: "If I had a Devil Fruit power, I'd choose the one that lets me teleport to your right now." },
        { id: 10, x: 350, y: 400, color: '#aa0000', msg: "Every time I see your message, my heart feels like Ace's chest; completely open and melty because of you (ded ace bars)" },
        { id: 11, x: 200, y: 550, color: '#aaffaa', msg: "Our love is like Ace: It's never going to grow old, because... Well, gets mo na yon! 🔥" },
        { id: 12, x: 400, y: 550, color: '#4169e1', msg: "Like Luffy's crew, I'm ready for a long journey ahead. I'll see you soon, Babe. That's a promise!" }
    ];

    const plantGroup = document.getElementById('plantGroup');
    const dialogueBox = document.getElementById('dialogueBox');
    const dialogueText = document.getElementById('dialogueText');
    const secretRose = document.getElementById('secretRose');
    let currentTypeWriterId = 0; // Tracks the most recent click to prevent gibberish

    // --- 2. BUILD THE BOUQUET ---
    flowersData.forEach((flower, index) => {
        const startX = 300;
        const startY = 800;
        const ctrlX = (startX + flower.x) / 2 + (Math.random() * 60 - 30); 
        const ctrlY = (startY + flower.y) / 2;
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("class", "stem");
        path.setAttribute("d", `M${startX},${startY} Q${ctrlX},${ctrlY} ${flower.x},${flower.y}`);
        path.style.animationDelay = `${index * 0.2}s`;
        plantGroup.appendChild(path);

        const flowerGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        flowerGroup.setAttribute("transform", `translate(${flower.x}, ${flower.y})`);
        
        const petalsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        petalsGroup.setAttribute("class", "petals");

        const backIndices = [1, 3, 5, 7];
        const frontIndices = [0, 2, 4, 6];
        
        const createPetal = (i, isBackLayer) => {
            const petal = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            const width = isBackLayer ? 10 : 15;
            const height = isBackLayer ? 28 : 30;
            const rotation = i * 45; 
            
            petal.setAttribute("cx", "0");
            petal.setAttribute("cy", "-25");
            petal.setAttribute("rx", width);
            petal.setAttribute("ry", height);
            petal.setAttribute("transform", `rotate(${rotation})`);
            petal.style.fill = flower.color;
            
            if (isBackLayer) {
                petal.style.filter = "brightness(0.7)"; 
            }

            const arrivalTime = 2.5 + (index * 0.2); 
            const petalDelay = arrivalTime + (i * 0.1); 
            petal.style.animationDelay = `${petalDelay}s`;
            
            return petal;
        };

        backIndices.forEach(i => petalsGroup.appendChild(createPetal(i, true)));
        frontIndices.forEach(i => petalsGroup.appendChild(createPetal(i, false)));

        flowerGroup.appendChild(petalsGroup);

        const core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        core.setAttribute("class", "core");
        core.setAttribute("r", "12");
        core.style.animationDelay = `${2.5 + (index * 0.2)}s`;
        core.addEventListener("click", (e) => {
            e.stopPropagation();
            showDialogue(flower.msg);
        });
        flowerGroup.appendChild(core);
        plantGroup.appendChild(flowerGroup);
    });

    // --- 3. DIALOGUE SYSTEM (FIXED) ---
    function showDialogue(text) {
        const myId = ++currentTypeWriterId;
        dialogueText.innerHTML = ""; dialogueBox.classList.remove("hidden");
        let i = 0;
        function typeWriter() {
            if (myId !== currentTypeWriterId) return;
            if (i < text.length) { dialogueText.innerHTML += text.charAt(i); i++; setTimeout(typeWriter, 30); }
        }
        typeWriter();
    }

    secretRose.addEventListener("click", (e) => { 
        e.stopPropagation(); 
        showDialogue("Galing naman ng bebe na yaannn! I just wanted to tell you that you're my favorite person in every universe. I love youuuu and Happy Valentine's, Babe! ❤️"); 
    });

    document.addEventListener("click", () => dialogueBox.classList.add("hidden"));
    dialogueBox.addEventListener("click", (e) => e.stopPropagation());
    
    // --- 4. FIREFLIES LOGIC ---
    const firefliesContainer = document.getElementById('fireflies');
    function createFirefly() {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        firefly.style.left = `${xPos}%`;
        firefly.style.top = `${yPos}%`;
        const size = Math.random() * 5 + 2; 
        firefly.style.width = `${size}px`;
        firefly.style.height = `${size}px`;
        firefly.style.backgroundColor = Math.random() > 0.5 ? '#fffb00' : '#8afcfc'; 
        const duration = Math.random() * 3 + 4; 
        firefly.style.animationDuration = `${duration}s`;
        firefliesContainer.appendChild(firefly);
        setTimeout(() => firefly.remove(), duration * 1000); 
    }
    setInterval(createFirefly, 200);
});
