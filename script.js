// ===============================
// COUNTER ANIMATION
// ===============================
const counters = document.querySelectorAll(".number");

counters.forEach((counter) => {
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText.replace(/,/g, "").replace("+", "");
    const increment = Math.ceil(target / 100);

    if (current < target) {
      counter.innerText = current + increment;
      setTimeout(updateCounter, 25);
    } else {
      counter.innerText = target.toLocaleString() + "+";
    }
  };
  updateCounter();
});

// ===============================
// CURSOR GLOW
// ===============================
const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
  if (glow) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }
});

// ===============================
// FACTS SLIDER
// ===============================
const facts = document.querySelectorAll(".fact-card");
let factIndex = 0;

if (facts.length > 0) {
  setInterval(() => {
    facts[factIndex].classList.remove("active");
    factIndex = (factIndex + 1) % facts.length;
    facts[factIndex].classList.add("active");
  }, 3000);
}

// ===============================
// QUIZ
// ===============================
let score = 0;
const totalQuestions = 10;

function checkAnswer(button, isCorrect) {
  const question = button.parentElement;
  const buttons = question.querySelectorAll("button");

  if (question.classList.contains("answered")) return;

  question.classList.add("answered");

  buttons.forEach((btn) => {
    btn.disabled = true;
  });

  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    buttons.forEach((btn) => {
      const clickCode = btn.getAttribute("onclick");
      if (clickCode && clickCode.includes("true")) {
        btn.classList.add("correct");
      }
    });
  }

  document.getElementById("quizResult").innerText = `Your Space IQ: ${score}/${totalQuestions}`;
}

// ===============================
// AI DEBRIS ANALYZER
// ===============================
function calculateDebrisRisk() {
  const size = document.getElementById("debrisSize").value;
  const orbit = document.getElementById("debrisOrbit").value;
  const speed = document.getElementById("debrisSpeed").value;
  const material = document.getElementById("debrisMaterial").value;
  const nearby = document.getElementById("debrisNearby").value;

  let risk = 0;

  // Size weight
  if (size === "small") risk += 15;
  if (size === "medium") risk += 30;
  if (size === "large") risk += 45;

  // Orbit weight
  if (orbit === "leo") risk += 25;
  if (orbit === "meo") risk += 15;
  if (orbit === "geo") risk += 10;

  // Speed weight
  if (speed === "low") risk += 10;
  if (speed === "medium") risk += 20;
  if (speed === "high") risk += 35;

  // Material weight
  if (material === "metal") risk += 15;
  if (material === "nonmetal") risk += 8;

  // Nearby active satellite
  if (nearby === "yes") risk += 30;
  if (nearby === "no") risk += 5;

  if (risk > 100) risk = 100;

  let level = "";
  let method = "";
  let priority = "";
  let mission = "";

  if (risk <= 30) {
    level = "Low";
    method = "Track and monitor";
    priority = "Low Priority";
    mission = "No urgent cleanup required. Continue orbital observation.";
  } else if (risk <= 60) {
    level = "Moderate";
    method = material === "metal" ? "Magnetic Collector" : "Capture Net";
    priority = "Medium Priority";
    mission = "Object should be added to future cleanup planning.";
  } else if (risk <= 85) {
    level = "High";
    method = size === "large" ? "Robotic Arm" : "Hunter Drone";
    priority = "High Priority";
    mission = "Recommended for targeted removal mission.";
  } else {
    level = "Critical";
    method = size === "large" ? "Robotic Arm + Drag Sail" : "Hunter Drone + Net";
    priority = "Immediate Action";
    mission = "Dangerous object. AI recommends urgent cleanup action.";
  }

  const riskFill = document.getElementById("riskFill");
  const calcResult = document.getElementById("calcResult");

  if (riskFill) riskFill.style.width = risk + "%";

  if (calcResult) {
    calcResult.innerHTML = `
      <h3>Threat Analysis Result</h3>
      <p><b>Risk Score:</b> ${risk}%</p>
      <p><b>Threat Level:</b> ${level}</p>
      <p><b>Recommended Method:</b> ${method}</p>
      <p><b>Removal Priority:</b> ${priority}</p>
      <p><b>AI Mission Suggestion:</b> ${mission}</p>
    `;
  }
}

// ===============================
// FUTURE SIMULATOR
// ===============================
function showFuture(years) {
  const futureResult = document.getElementById("futureResult");
  if (!futureResult) return;

  let result = "";

  if (years === 5) {
    result = `
      <h3>5 Years Later</h3>
      <p>Orbital traffic increases and collision alerts become more common.</p>
      <p>LEO may become more crowded due to internet and observation satellites.</p>
      <p>Cleanup planning becomes more important for safe launches.</p>
    `;
  } else if (years === 10) {
    result = `
      <h3>10 Years Later</h3>
      <p>Inactive satellites and debris may create serious route management problems.</p>
      <p>More fuel and planning will be needed for safe satellite placement.</p>
      <p>Space missions could become costlier and riskier.</p>
    `;
  } else if (years === 20) {
    result = `
      <h3>20 Years Later</h3>
      <p>If debris is ignored, repeated collisions may create even more debris.</p>
      <p>This can lead to severe orbital congestion and mission failures.</p>
      <p>AI-based cleanup and prevention systems may become essential for future space travel.</p>
    `;
  }

  futureResult.innerHTML = result;
}

// ===============================
// SPACE AI CHATBOT TRAINING
// ===============================
function askBot() {
  const input = document.getElementById("userInput");
  const chatWindow = document.getElementById("chatWindow");

  if (!input || !chatWindow) return;

  const userText = input.value.trim();
  if (userText === "") return;

  // Add user message
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.innerText = userText;
  chatWindow.appendChild(userMsg);

  const lower = userText.toLowerCase();
  let reply = "";

  // ===============================
  // TRAINED SPACE QUESTIONS
  // ===============================

  if (lower.includes("what is leo") || lower === "leo" || lower.includes("low earth orbit")) {
    reply = "LEO means Low Earth Orbit. It is the region closest to Earth where many satellites, the ISS, and imaging systems are placed. It is also the most crowded orbit.";
  }

  else if (lower.includes("what is meo") || lower === "meo" || lower.includes("medium earth orbit")) {
    reply = "MEO means Medium Earth Orbit. It is mainly used for navigation systems like GPS because it provides wide coverage and stable positioning.";
  }

  else if (lower.includes("what is geo") || lower === "geo" || lower.includes("geostationary orbit")) {
    reply = "GEO means Geostationary Orbit. A satellite in GEO appears fixed above one point on Earth because it moves at the same rate as Earth’s rotation.";
  }

  else if (lower.includes("what is space debris") || lower.includes("space junk") || lower === "debris") {
    reply = "Space debris is made of non-working satellites, broken rocket parts, paint flakes, and fragments from collisions. Even small debris is dangerous because it moves at very high speed.";
  }

  else if (lower.includes("why is debris dangerous")) {
    reply = "Debris is dangerous because in orbit, speed matters more than size. Even a tiny fragment can damage a satellite or spacecraft due to its huge kinetic energy.";
  }

  else if (lower.includes("what is orbital decay")) {
    reply = "Orbital decay happens when a satellite slowly loses altitude due to atmospheric drag or other forces, causing it to move closer to Earth over time.";
  }

  else if (lower.includes("what is collision risk")) {
    reply = "Collision risk means the chance that two objects in orbit may hit each other. This becomes more serious when many objects move through the same orbital path.";
  }

  else if (lower.includes("why is leo crowded")) {
    reply = "LEO is crowded because it is easier and cheaper to reach. Many Earth observation, communication, and internet satellites are launched there.";
  }

  else if (lower.includes("how can we clean space debris") || lower.includes("clean debris")) {
    reply = "Space debris can be reduced using robotic arms, magnetic collectors, drag sails, capture nets, or AI-powered cleanup satellites. The best method depends on size, orbit, and material.";
  }

  else if (lower.includes("what is kessler syndrome") || lower.includes("kessler")) {
    reply = "Kessler Syndrome is a chain reaction in space where one collision creates more debris, which can cause more collisions and make orbit increasingly dangerous.";
  }

  else if (lower.includes("what is escape velocity")) {
    reply = "Escape velocity is the minimum speed needed for an object to leave Earth’s gravitational pull without needing extra propulsion. For Earth, it is about 11.2 km/s.";
  }

  else if (lower.includes("why do satellites not fall")) {
    reply = "Satellites are constantly falling toward Earth, but they move forward so fast that they keep missing the ground. This balance creates orbit.";
  }

  else if (lower.includes("difference between satellite and debris")) {
    reply = "A satellite is a useful object placed in orbit for a purpose, while debris is an unwanted object that no longer serves a mission and may create danger.";
  }

  else if (lower.includes("how does gps work")) {
    reply = "GPS works by using signals from multiple satellites in MEO. A receiver compares signal times to calculate its exact position on Earth.";
  }

  else if (lower.includes("why is geo useful")) {
    reply = "GEO is useful because a satellite there stays above the same region of Earth, making it ideal for TV broadcasting, communication, and weather observation.";
  }

  else if (lower.includes("what is a dead satellite")) {
    reply = "A dead satellite is a satellite that no longer works or has completed its mission. It may remain in orbit and become part of space debris if not removed safely.";
  }

  else if (lower.includes("what is orbital speed")) {
    reply = "Orbital speed is the speed needed for an object to stay in orbit. In lower orbits, satellites need higher speeds because Earth’s gravity is stronger there.";
  }

  else if (lower.includes("how ai helps in space")) {
    reply = "AI helps in space by tracking debris, predicting collisions, planning safe satellite paths, detecting risk zones, and selecting cleanup priorities more efficiently.";
  }

  else if (lower.includes("why should we protect earth orbit")) {
    reply = "Earth’s orbit should be protected because modern communication, GPS, weather systems, research, and future space missions all depend on safe orbital regions.";
  }

  else if (lower.includes("who made this project")) {
    reply = "This project is designed as an AI-based orbital defense and debris cleanup system to study space safety in a smart and futuristic way.";
  }

  else if (lower.includes("what is the purpose of this project")) {
    reply = "The purpose of this project is to understand space debris, detect orbital danger, suggest cleanup methods, and show how AI can help keep Earth’s orbit safer.";
  }

  else if (lower.includes("hard question") || lower.includes("give me hard questions")) {
    reply = "Try this: Why can a very small debris particle still damage a satellite badly? Answer: because its high orbital speed gives it large kinetic energy.";
  }

  else if (lower.includes("hello") || lower === "hi" || lower === "hey") {
    reply = "Hello.";
  }

  else {
    const smartReplies = [
      "That is related to orbital science. Try asking about satellites, debris, orbit safety, GPS, or collision risk.",
      "Interesting question. In this project, I mainly focus on satellites, orbits, debris, and AI-based space safety.",
      "I can help with space debris, orbital motion, satellites, Earth orbits, and cleanup systems.",
      "Try asking something like: Why do satellites stay in orbit? or How can space debris be removed?"
    ];

    reply = smartReplies[Math.floor(Math.random() * smartReplies.length)];
  }

  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "bot-message";
    botMsg.innerText = reply;
    chatWindow.appendChild(botMsg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 500);

  input.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Enter key support
const userInput = document.getElementById("userInput");
if (userInput) {
  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      askBot();
    }
  });
}

// ===============================
// CHART.JS
// ===============================
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/chart.js";

script.onload = () => {
  const chartCanvas = document.getElementById("launchChart");
  if (!chartCanvas) return;

  const ctx = chartCanvas.getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["USA", "Russia", "China", "India", "Europe", "Others"],
      datasets: [
        {
          label: "Satellite Contribution (%)",
          data: [45, 15, 18, 7, 8, 7],
          backgroundColor: [
            "#38bdf8",
            "#8b5cf6",
            "#22d3ee",
            "#06b6d4",
            "#818cf8",
            "#c084fc"
          ],
          borderRadius: 10
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "white" }
        }
      },
      scales: {
        x: {
          ticks: { color: "white" },
          grid: { color: "rgba(255,255,255,0.08)" }
        },
        y: {
          ticks: { color: "white" },
          grid: { color: "rgba(255,255,255,0.08)" }
        }
      }
    }
  });
};
const container = document.getElementById("dynamicDebris");

if (container) {
  for (let i = 0; i < 12; i++) {
    const dot = document.createElement("div");
    dot.className = "dynamic-dot";

    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = Math.random() * 100 + "%";

    container.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dynamic-dot");

  setInterval(() => {
    dots.forEach(dot => {
      const x = Math.random() * 80 - 40;
      const y = Math.random() * 80 - 40;
      dot.style.transform = `translate(${x}px, ${y}px)`;
    });
  }, 2000);
}
document.head.appendChild(script);
