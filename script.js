const strategyChat = document.getElementById("strategyChat");
const strategySteps = [
  { title: "CREARE CONȚINUT AI", icon: "fa-robot", body: "Generăm vizualuri și texte care păstrează vocea unică a brandului tău." },
  { title: "PROGRAMARE AUTOMATĂ", icon: "fa-calendar-check", body: "Sincronizăm calendarul pentru ca postările să apară la orele ideale, fără efort manual." },
  { title: "RĂSPUNSURI INSTANTANEE", icon: "fa-comments", body: "AI-ul preia DM-urile și comentariile 24/7, oferind informații și închizând vânzări pe loc." },
  { title: "RE-ENGAGEMENT", icon: "fa-bell", body: "Sistemul trimite memento-uri clienților vechi pentru a genera noi programări automat." }
];

let sIndex = 0;
let strategyStarted = false;

function spawnStrategy() {
  if (!strategyChat || sIndex >= strategySteps.length) return;
  const step = strategySteps[sIndex];
  const msg = document.createElement("div");
  msg.className = "strategy-message";
  msg.innerHTML = `<i class="fa-solid ${step.icon}"></i><div><strong style="display:block; font-size:12px; margin-bottom:2px;">${step.title}</strong><span style="font-size:12px; color:#A7B0BA;">${step.body}</span></div>`;
  strategyChat.appendChild(msg);
  setTimeout(() => msg.classList.add("animate"), 20);
  sIndex++;
  setTimeout(spawnStrategy, 750);
}

// TYPING EFFECT
const captionText = "Descoperă-ți strălucirea naturală. Programare optimizată prin AI în bio. ✨ #Luxury #Automation";
let typingStarted = false;

function typeCaption() {
  const span = document.getElementById("typeCaption") || document.getElementById("typeCaptionDemo");
  if(!span) return;
  let i = 0;
  const interval = setInterval(() => {
    span.textContent += captionText.charAt(i);
    i++;
    if (i >= captionText.length) clearInterval(interval);
  }, 45);
}

// CALENDAR (INDEX PAGE)
function initCalendar() {
  const grids = document.querySelectorAll(".cal-grid");
  grids.forEach(grid => {
    for (let i = 1; i <= 28; i++) {
      const day = document.createElement("div");
      day.className = "cal-day";
      if (i % 4 === 0 || i % 7 === 0) {
        const p = document.createElement("div");
        p.className = "cal-post";
        day.appendChild(p);
      }
      grid.appendChild(day);
    }
  });
}

let calendarAnimated = false;
let chatAnimated = false;

function handleScroll() {
  const trigger = window.innerHeight - 80;

  // Strategy Section
  const stratSection = document.getElementById("strategyStage");
  if (!strategyStarted && stratSection && stratSection.getBoundingClientRect().top < trigger) {
    strategyStarted = true;
    spawnStrategy();
  }

  // Instagram Typing
  const igMockup = document.getElementById("igMockup") || document.getElementById("igMockupDemo");
  if (!typingStarted && igMockup && igMockup.getBoundingClientRect().top < trigger) {
    typingStarted = true;
    setTimeout(typeCaption, 400);
  }

  // Calendar Animation (Index)
  const calSection = document.getElementById("calendarSection");
  if (!calendarAnimated && calSection && calSection.getBoundingClientRect().top < trigger) {
    calendarAnimated = true;
    document.querySelectorAll(".cal-post").forEach((p, idx) => setTimeout(() => p.classList.add("active"), idx * 150));
  }

  // Schedule Animation (Demo Page)
  const schedSection = document.getElementById("scheduleMockup");
  if (schedSection && schedSection.getBoundingClientRect().top < trigger) {
    document.querySelectorAll(".schedule-item").forEach((item, idx) => {
      setTimeout(() => item.classList.add("active"), idx * 250);
    });
  }

  // Chat Animation + Notification Sync (Demo Page)
  const chatSection = document.getElementById("chatMockup");
  if (!chatAnimated && chatSection && chatSection.getBoundingClientRect().top < trigger) {
    chatAnimated = true;
    document.querySelectorAll(".chat-bubble").forEach((bubble, idx) => {
      setTimeout(() => bubble.classList.add("active"), idx * 1000);
    });
    
    // Arată notificarea abia DUPĂ ce s-a terminat discuția (4 mesaje * 1 sec = 4 secunde)
    const remDemo = document.getElementById("reminderSectionDemo");
    if (remDemo) {
      setTimeout(() => remDemo.classList.add("active"), 4500);
    }
  }

  // Notification (Index)
  const remIndex = document.getElementById("reminderSectionIndex");
  if (remIndex && remIndex.getBoundingClientRect().top < trigger) remIndex.classList.add("active");

  // Impact Section (Numbers & Graph)
  const growthSection = document.getElementById("growthSection");
  if (growthSection && growthSection.getBoundingClientRect().top < trigger) {
    if (!growthSection.classList.contains("animated")) {
      growthSection.classList.add("animated");
      document.querySelectorAll(".metric-number").forEach(num => {
        const target = +num.getAttribute("data-target");
        let count = 0;
        const interval = setInterval(() => {
          count += Math.ceil(target / 40);
          if (count >= target) { num.innerText = target; clearInterval(interval); }
          else { num.innerText = count; }
        }, 40);
      });
      document.querySelectorAll(".progress-fill").forEach(bar => {
        bar.style.width = bar.getAttribute("data-width");
      });
    }
  }

  // Graph Line
  const graphContainer = document.querySelector(".graph-container");
  if (graphContainer && graphContainer.getBoundingClientRect().top < trigger) {
    graphContainer.classList.add("visible");
  }

  // Scroll Appear global class
  document.querySelectorAll(".scroll-appear").forEach(el => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add("visible");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCalendar();
  handleScroll(); // Trigger checks immediately
  
  // Also trigger strategy on click
  const stratStage = document.getElementById("strategyStage");
  if(stratStage) {
    stratStage.addEventListener("click", () => {
      if(!strategyStarted) { strategyStarted = true; spawnStrategy(); }
    });
  }
});
window.addEventListener("scroll", handleScroll);