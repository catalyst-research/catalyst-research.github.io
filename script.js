// // Custom Cursor - Fixed lag
// const cursor = document.getElementById('cursor');
// const cursorGlow = document.getElementById('cursor-glow');

// let cursorX = 0;
// let cursorY = 0;

// document.addEventListener('mousemove', (e) => {
//     cursorX = e.clientX;
//     cursorY = e.clientY;
    
//     // Direct update - no lag
//     cursor.style.left = cursorX + 'px';
//     cursor.style.top = cursorY + 'px';
//     cursorGlow.style.left = cursorX + 'px';
//     cursorGlow.style.top = cursorY + 'px';
// });

// document.addEventListener('mousedown', () => {
//     document.body.classList.add('clicking');
// });

// document.addEventListener('mouseup', () => {
//     document.body.classList.remove('clicking');
// });

// Click Ripple Animation
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '30px';
    ripple.style.height = '30px';
    ripple.style.borderRadius = '50%';
    ripple.style.border = '2px solid rgb(231, 170, 80)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '10000';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});

// Theme Toggle - FIXED
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

console.log(themeToggle);

// Load saved theme or default to light
const savedTheme = localStorage.getItem('catalyst-theme');
console.log('Initial theme:', savedTheme); // Debug

if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
} else {
    htmlElement.setAttribute('data-theme', 'light');
    localStorage.setItem('catalyst-theme', 'light');
}

if (themeToggle) {
    console.log('Theme toggle button found!'); // Debug
    
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('Switching from', currentTheme, 'to', newTheme); // Debug
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('catalyst-theme', newTheme);
    });
} else {
    console.error('Theme toggle button NOT found!'); // Debug
}

// Particle Animation - MICROSCOPE ICONS
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 20;

    class MicroscopeParticle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.phase = Math.random() * Math.PI * 2;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -50;
            this.speed = 0.4 + Math.random() * 0.6;
            this.size = 20 + Math.random() * 15;
            this.opacity = 0.2 + Math.random() * 0.3;
            this.drift = (Math.random() - 0.5) * 0.4;
            this.wobble = 0.3 + Math.random() * 0.5;
            this.rotation = Math.random() * 0.02 - 0.01;
            this.currentRotation = 0;
        }

        update() {
            this.y += this.speed;
            this.phase += 0.02;
            this.x += Math.sin(this.phase) * this.wobble + this.drift;
            this.currentRotation += this.rotation;

            if (this.y > canvas.height + 50) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.currentRotation);
            
            // Catalyst brand color
            const color = 'rgba(231, 170, 80, ';
            
            const scale = this.size / 30;
            
            // Draw detailed microscope
            ctx.fillStyle = color + this.opacity + ')';
            ctx.strokeStyle = color + this.opacity + ')';
            ctx.lineWidth = 1.5;
            
            // Base (circular)
            ctx.beginPath();
            ctx.arc(0, 12 * scale, 8 * scale, 0, Math.PI * 2);
            ctx.fill();
            
            // Stand/body (vertical rectangle)
            ctx.fillRect(-2 * scale, -8 * scale, 4 * scale, 20 * scale);
            
            // Eyepiece (circle on top)
            ctx.beginPath();
            ctx.arc(0, -12 * scale, 4 * scale, 0, Math.PI * 2);
            ctx.fill();
            
            // Arm (angled line)
            ctx.beginPath();
            ctx.moveTo(0, -4 * scale);
            ctx.lineTo(8 * scale, 4 * scale);
            ctx.lineWidth = 2.5;
            ctx.stroke();
            
            // Objective lens (small circle)
            ctx.beginPath();
            ctx.arc(8 * scale, 4 * scale, 3 * scale, 0, Math.PI * 2);
            ctx.fill();
            
            // Stage (horizontal line)
            ctx.fillRect(-6 * scale, 0, 12 * scale, 1.5 * scale);
            
            // Condenser (small rectangle below stage)
            ctx.fillRect(-1.5 * scale, 2 * scale, 3 * scale, 4 * scale);
            
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new MicroscopeParticle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-item, .additionalcontent, .subcontent').forEach(section => {
    observer.observe(section);
});

// Journal Modal
const modal = document.getElementById('journalModal');
const modalClose = document.getElementById('modalClose');
const modalIframe = document.getElementById('modalIframe');
const journalButtons = document.querySelectorAll('.boxbutton');
const journalPreviews = document.querySelectorAll('.journal-preview');

function openJournalModal(volume) {
    if (modal && modalIframe) {
        // Set the PDF source
        modalIframe.src = `./journals/volume${volume}.pdf#toolbar=0`;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update button states
        journalButtons.forEach(btn => {
            btn.classList.remove('selectedjournal');
            if(btn.getAttribute('data-volume') === volume) {
                btn.classList.add('selectedjournal');
            }
        });
        
        console.log('Opening journal volume:', volume); // Debug
    }
}

function closeJournalModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Clear iframe to stop loading
        if (modalIframe) {
            modalIframe.src = '';
        }
    }
}

// Journal preview cards click
if (journalPreviews.length > 0) {
    journalPreviews.forEach(preview => {
        preview.addEventListener('click', function(e) {
            e.preventDefault();
            const volume = this.getAttribute('data-volume');
            openJournalModal(volume);
        });
    });
}

// Volume buttons click
if (journalButtons.length > 0) {
    journalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const volume = this.getAttribute('data-volume');
            openJournalModal(volume);
        });
    });
}

// Close button
if (modalClose) {
    modalClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeJournalModal();
    });
}

// Click outside to close
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeJournalModal();
        }
    });
}

// Escape key to close
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeJournalModal();
    }
});

// Calendar
let currentMonth = 0;
let currentYear = 2026;

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const events = [
    {
        date: '2026-01-30',
        title: 'Placeholder Event',
        time: 'Placeholder Time',
        description: 'Placeholder event description',
        location: 'Placeholder Location'
    }
];

function getEventsForDate(dateStr) {
    return events.filter(event => event.date === dateStr);
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const nextDays = 7 - lastDayIndex - 1;

    const currentMonthEl = document.getElementById('currentMonth');
    if (currentMonthEl) {
        currentMonthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

    let days = '';

    dayNames.forEach(day => {
        days += `<div class="calendar-day-name">${day}</div>`;
    });

    for (let x = firstDayIndex; x > 0; x--) {
        const dayNum = prevLastDay.getDate() - x + 1;
        days += `<div class="calendar-day other-month">
            <span class="day-number">${dayNum}</span>
        </div>`;
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const dayEvents = getEventsForDate(dateStr);
        const today = new Date();
        const isToday = i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
        
        days += `<div class="calendar-day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-event' : ''}">
            <span class="day-number">${i}</span>
            ${dayEvents.length > 0 ? `<span class="event-count">${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}</span>` : ''}
            ${dayEvents.length > 0 ? '<div class="event-dot"></div>' : ''}
        </div>`;
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="calendar-day other-month">
            <span class="day-number">${j}</span>
        </div>`;
    }

    calendarGrid.innerHTML = days;
}

function renderEvents() {
    const eventsList = document.getElementById('eventsList');
    if (!eventsList) return;

    const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const eventsHTML = upcomingEvents.map(event => {
        const date = new Date(event.date);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        return `
            <div class="event-card">
                <div class="event-date">
                    <span class="event-date-box">${dateStr}</span>
                    <span class="event-time">${event.time}</span>
                </div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <p class="event-location">📍 ${event.location}</p>
            </div>
        `;
    }).join('');

    eventsList.innerHTML = eventsHTML || '<p style="text-align: center; color: var(--text-tertiary); padding: 3rem;">No upcoming events scheduled.</p>';
}

const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
}

// Initialize calendar if on events page
if (document.getElementById('calendarGrid')) {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    renderCalendar();
    renderEvents();
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Apply Button Links - Will route to Google Docs (add URLs later)
const applyButtons = document.querySelectorAll('.applybutton');
applyButtons.forEach(button => {
    button.addEventListener('click', () => {
        // TODO: Replace these URLs with your actual Google Form/Doc links
        if (button.textContent.includes('Author/Editor')) {
            window.open('https://forms.gle/Hrh241TvbFiU9d8SA', '_blank');
        } else if (button.textContent.includes('Board')) {
            window.open('https://forms.gle/Za9dsnUvA1pDMcYE9', '_blank');
        }
    });
});