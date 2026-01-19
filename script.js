// custom cursor effect
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');


document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    //folower effect delay
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 150);
});

const buttons = document.querySelector('.cta-button');

buttons.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursorFollower.style.width = '50px';
    cursorFollower.style.height = '50px';   
});

buttons.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursorFollower.style.width = '30px';
    cursorFollower.style.height = '30px';   
});

// Make cursor interactive with all clickable elements
const clickables = document.querySelectorAll('button, .glass-card');

clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'rgba(0, 245, 255, 0.2)';
        cursorFollower.style.width = '50px';
        cursorFollower.style.height = '50px';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = 'transparent';
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
    });
});
//particles effect 

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

//making canvas full screnn 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//array to holdd particle
const particles =[];
const particleCount = 150;

//particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy; 
        
        //Bounce offf 
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;    

    }

    draw() {
        ctx.fillStyle = 'rgba(0,255,255,0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

//create particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

//flowwww
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    //connection liness of partivles
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < 100) {
                ctx.strokeStyle = `rgba(0,255,255,${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animate);
}

animate();

//resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

//parralx effect = cards or objs move at diff speed ;
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const glassCards = document.querySelectorAll('.glass-card');

    glassCards.forEach((card, index) => {
        const speed = (index + 1) * 0.05;
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

//animation for bars 

// Skill Bar Animation on Scroll
const skillsSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.skill-progress');

let skillsAnimated = false;

window.addEventListener('scroll', () => {
    const skillsTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    // When skills section is visible
    if (skillsTop < windowHeight && !skillsAnimated) {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
        skillsAnimated = true;
    }
});

// Typing Effecttt

const typingText = document.getElementById('typing-text');
const texts = ['Full Stack Developer', 'Java Developer', 'Product Engineer', 'Tech Enthusiast'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before typing next text
    }
    setTimeout(type, typingSpeed);
}
type();
// End of typing effect

//tillt effcts for prjcts cards 
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top;  //y position within the element.

        const centerX = rect.width / 1.1;
        const centerY = rect.height / 1.1;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = ` translateY(-2px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
}); 

// Contact Form Handler
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && subject && message) {
        // Success animation
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<span>✓ Message Sent!</span>';
        submitBtn.style.background = 'linear-gradient(45deg, #0cff00, #00ff88)';
        
        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = '<span>Send Message</span>';
            submitBtn.style.background = 'linear-gradient(45deg, var(--primary), var(--secondary))';
        }, 2000);
    }
});

// Add ripple effect to submit button
const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
    `;
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});


