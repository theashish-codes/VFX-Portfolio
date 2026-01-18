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
//particles effect 

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

//making canvas full screnn 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//array to holdd particle
const particles =[];
const particleCount = 100;

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
