// =========================
// COUNTER ANIMATION
// =========================
const counters = document.querySelectorAll(".number");

counters.forEach((counter) => {
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText.replace(/,/g, "").replace("+", "");
    const increment = Math.ceil(target / 100);

    if (current < target) {
      counter.innerText = (current + increment).toLocaleString();
      setTimeout(updateCounter, 25);
    } else {
      counter.innerText = target.toLocaleString() + "+";
    }
  };
  updateCounter();
});

// =========================
// CURSOR GLOW
// =========================
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  if (glow) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }
});

// =========================
// FACTS SLIDER
// =========================
const facts = document.querySelectorAll(".fact-card");
let factIndex = 0;

if (facts.length > 0) {
  setInterval(() => {
    facts[factIndex].classList.remove("active");
    factIndex = (factIndex + 1) % facts.length;
    facts[factIndex].classList.add("active");
  }, 3000);
}

// =========================
// QUIZ SYSTEM
// =========================
let score = 0;
let totalQuestions = document.querySelectorAll(".quiz-question").length;

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
      if (
        btn.getAttribute("onclick") &&
        btn.getAttribute("onclick").includes("true")
      ) {
        btn.classList.add("correct");
      }
    });
  }

  const quizResult = document.getElementById("quizResult");
  if (quizResult) {
    quizResult.innerText = `Your Space IQ: ${score}/${totalQuestions}`;
  }
}

// =========================
// LOAD CHART.JS
// =========================
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/chart.js";

script.onload = () => {
  const canvas = document.getElementById("launchChart");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

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

document.head.appendChild(script);

// =========================
// CHATBOT TOGGLE
// =========================
function toggleChatbot() {
  const chatbot = document.getElementById("chatbot");
  if (!chatbot) return;

  if (chatbot.style.display === "flex") {
    chatbot.style.display = "none";
  } else {
    chatbot.style.display = "flex";
  }
}

// =========================
// CHATBOT ELEMENTS
// =========================
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// =========================
// ADD MESSAGE
// =========================
function addMessage(text, sender) {
  if (!chatBox) return;

  const msg = document.createElement("div");
  msg.classList.add(sender === "user" ? "user-message" : "bot-message");
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// =========================
// SMART CLASS 9 SPACE CHATBOT
// =========================
function getBotReply(message) {
  const msg = message.toLowerCase().trim();

  // GREETINGS
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello Explorer! 🚀 I am SpaceBot. Ask me Class 9 level questions about planets, gravity, satellites, black holes, orbits, or space science.";
  }

  // SOLAR SYSTEM
  if (msg.includes("solar system")) {
    return "The Solar System is made up of the Sun, 8 planets, their moons, asteroids, comets, and other celestial bodies that revolve around the Sun due to gravity.";
  }

  if (msg.includes("how many planets")) {
    return "There are 8 planets in the Solar System: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.";
  }

  if (msg.includes("why do planets revolve around the sun")) {
    return "Planets revolve around the Sun because of the Sun’s gravitational pull. Their forward motion and gravity together create a stable orbit.";
  }

  // GRAVITY
  if (msg.includes("gravity")) {
    return "Gravity is the force of attraction between any two objects having mass. It keeps planets in orbit and pulls objects toward Earth.";
  }

  if (msg.includes("why do objects fall on earth")) {
    return "Objects fall on Earth because Earth exerts gravitational force that pulls everything toward its center.";
  }

  if (msg.includes("escape velocity")) {
    return "Escape velocity is the minimum speed needed for an object to leave a planet’s gravitational field. For Earth, it is about 11.2 km/s.";
  }

  if (msg.includes("weight on moon") || msg.includes("why is weight less on moon")) {
    return "Weight is less on the Moon because the Moon has weaker gravity than Earth. Mass stays the same, but weight decreases.";
  }

  // PLANETS
  if (msg.includes("largest planet") || msg.includes("biggest planet")) {
    return "Jupiter is the largest planet in the Solar System. It is a gas giant and has many moons.";
  }

  if (msg.includes("smallest planet")) {
    return "Mercury is the smallest planet in the Solar System and the closest to the Sun.";
  }

  if (msg.includes("red planet")) {
    return "Mars is called the Red Planet because iron oxide on its surface gives it a reddish appearance.";
  }

  if (msg.includes("hottest planet")) {
    return "Venus is the hottest planet because its thick carbon dioxide atmosphere traps heat through the greenhouse effect.";
  }

  if (msg.includes("why is venus hottest")) {
    return "Venus is the hottest planet because its dense atmosphere traps heat and creates an extreme greenhouse effect.";
  }

  if (msg.includes("which planet has rings") || msg.includes("planet with rings")) {
    return "Saturn is the most famous ringed planet, although Jupiter, Uranus, and Neptune also have rings.";
  }

  if (msg.includes("why is mars important")) {
    return "Mars is important because scientists believe it may have had water in the past, making it useful for studying possible life.";
  }

  // EARTH / MOON
  if (msg === "earth" || msg.includes("what is earth") || msg.includes("tell me about earth")) {
    return "Earth is the third planet from the Sun and the only known planet that supports life because it has water, oxygen, and a suitable temperature.";
  }

  if (msg === "moon" || msg.includes("what is moon") || msg.includes("tell me about moon")) {
    return "The Moon is Earth’s natural satellite. It revolves around Earth and reflects sunlight.";
  }

  if (msg.includes("phases of moon")) {
    return "The phases of the Moon happen because as the Moon revolves around Earth, we see different portions of its sunlit side.";
  }

  if (msg.includes("why does the moon shine")) {
    return "The Moon shines because it reflects sunlight. It does not produce its own light.";
  }

  if (msg.includes("why there is no sound in space")) {
    return "There is no sound in space because sound needs a medium like air to travel, and space is mostly a vacuum.";
  }

  // STARS / SUN
  if (msg.includes("what is a star")) {
    return "A star is a massive ball of hot gases, mainly hydrogen and helium, that produces its own heat and light.";
  }

  if (msg === "sun" || msg.includes("what is sun") || msg.includes("tell me about sun")) {
    return "The Sun is a star at the center of the Solar System. It provides heat and light to the planets.";
  }

  if (msg.includes("why does the sun shine")) {
    return "The Sun shines because nuclear fusion occurs in its core, where hydrogen atoms combine to form helium and release energy.";
  }

  if (msg.includes("nuclear fusion")) {
    return "Nuclear fusion is the process in which light atoms like hydrogen combine to form helium, releasing a large amount of energy.";
  }

  if (msg.includes("difference between planet and star")) {
    return "A star produces its own light and heat, while a planet does not. Planets revolve around stars and reflect their light.";
  }

  // GALAXY / UNIVERSE
  if (msg.includes("galaxy")) {
    return "A galaxy is a huge collection of stars, planets, gas, dust, and dark matter held together by gravity. Our Solar System lies in the Milky Way.";
  }

  if (msg.includes("milky way")) {
    return "The Milky Way is the galaxy that contains our Solar System. It has billions of stars and is spiral in shape.";
  }

  if (msg.includes("universe")) {
    return "The universe includes everything that exists: all galaxies, stars, planets, matter, energy, and space itself.";
  }

  // BLACK HOLE
  if (msg.includes("black hole")) {
    return "A black hole is a region in space where gravity is so strong that even light cannot escape.";
  }

  if (msg.includes("how are black holes formed")) {
    return "Black holes are usually formed when a very massive star collapses under its own gravity after using up its nuclear fuel.";
  }

  // SATELLITES / ORBITS
  if (msg.includes("satellite")) {
    return "A satellite is an object that revolves around a planet. It can be natural like the Moon or artificial like communication satellites.";
  }

  if (msg.includes("natural satellite")) {
    return "A natural satellite is a naturally occurring object that revolves around a planet, like the Moon around Earth.";
  }

  if (msg.includes("artificial satellite")) {
    return "An artificial satellite is a human-made object launched into orbit for communication, weather, navigation, or research.";
  }

  if (msg.includes("why do satellites not fall")) {
    return "Satellites do fall toward Earth due to gravity, but they also move forward at very high speed, so they keep missing Earth and continue orbiting it.";
  }

  if (msg.includes("orbit")) {
    return "An orbit is the curved path followed by a planet, moon, or satellite around another object because of gravity.";
  }

  if (msg.includes("leo")) {
    return "LEO means Low Earth Orbit. It is used for Earth observation, the ISS, and many internet satellites.";
  }

  if (msg.includes("meo")) {
    return "MEO means Medium Earth Orbit. It is commonly used for navigation satellites like GPS.";
  }

  if (msg.includes("geo")) {
    return "GEO means Geostationary Orbit. Satellites here appear fixed over one point on Earth.";
  }

  if (msg.includes("why geo satellites appear stationary")) {
    return "GEO satellites appear stationary because they revolve around Earth in exactly 24 hours, matching Earth’s rotation.";
  }

  // SPACE JUNK
  if (msg.includes("space junk") || msg.includes("space debris")) {
    return "Space junk refers to non-working satellites, broken rocket parts, and fragments left in orbit. These can collide with active spacecraft.";
  }

  if (msg.includes("why space junk is dangerous")) {
    return "Space junk is dangerous because even tiny fragments move at extremely high speed and can damage satellites or spacecraft.";
  }

  // GPS / TECH
  if (msg === "gps" || msg.includes("what is gps")) {
    return "GPS stands for Global Positioning System. It uses satellites to determine exact location on Earth.";
  }

  if (msg.includes("how gps works")) {
    return "GPS works by receiving signals from multiple satellites and calculating the time taken by those signals to reach a receiver.";
  }

  if (msg.includes("communication satellite")) {
    return "Communication satellites are used to transmit TV, internet, phone, and radio signals over long distances.";
  }

  if (msg.includes("weather satellite")) {
    return "Weather satellites are used to observe clouds, storms, rainfall, and climate changes from space.";
  }

  // SPACE AGENCIES
  if (msg.includes("nasa")) {
    return "NASA stands for National Aeronautics and Space Administration. It is the space agency of the United States.";
  }

  if (msg.includes("isro")) {
    return "ISRO stands for Indian Space Research Organisation. It is India’s national space agency.";
  }

  if (msg.includes("chandrayaan")) {
    return "Chandrayaan is a series of lunar missions by ISRO. Chandrayaan-3 was important because India successfully landed near the Moon’s south pole.";
  }

  if (msg.includes("mangalyaan")) {
    return "Mangalyaan, also called Mars Orbiter Mission, was India’s Mars mission launched by ISRO in 2013.";
  }

  // ISS / ASTRONAUTS
  if (msg.includes("iss") || msg.includes("international space station")) {
    return "The International Space Station is a large space laboratory orbiting Earth where astronauts live and perform experiments.";
  }

  if (msg.includes("astronaut")) {
    return "An astronaut is a trained person who travels and works in space.";
  }

  if (msg.includes("how do astronauts breathe in space")) {
    return "Astronauts breathe using oxygen supplied through life-support systems inside spacecraft or space stations.";
  }

  // CLASS 9 HARD QUESTIONS
  if (msg.includes("why is there no life on mercury")) {
    return "There is no known life on Mercury because it has almost no atmosphere, extreme temperatures, and no liquid water.";
  }

  if (msg.includes("why is atmosphere important for life")) {
    return "Atmosphere is important because it provides gases, controls temperature, and protects living things from harmful radiation.";
  }

  if (msg.includes("why do seasons occur")) {
    return "Seasons occur because Earth’s axis is tilted while it revolves around the Sun, causing different parts of Earth to receive different amounts of sunlight.";
  }

  if (msg.includes("why do day and night occur")) {
    return "Day and night occur because Earth rotates on its axis. The side facing the Sun has day, while the opposite side has night.";
  }

  if (msg.includes("rotation and revolution")) {
    return "Rotation is the spinning of Earth on its axis, while revolution is the movement of Earth around the Sun.";
  }

  if (msg.includes("difference between asteroid and comet")) {
    return "Asteroids are rocky bodies mostly found in the asteroid belt, while comets are made of ice, dust, and rock and often form tails near the Sun.";
  }

  if (msg.includes("why do comets have tails")) {
    return "Comets develop tails because heat from the Sun causes their ice to vaporize, releasing gas and dust.";
  }

  // GOODBYE
  if (msg.includes("bye") || msg.includes("goodbye")) {
    return "Goodbye Explorer! 🌌 Keep learning about the universe.";
  }

  // DEFAULT SMART REPLY
  return "That’s an interesting space question 🚀 Try asking about gravity, black holes, satellites, GPS, Chandrayaan, escape velocity, Moon phases, or why planets revolve around the Sun.";
}

// =========================
// SEND MESSAGE
// =========================
function handleSend() {
  if (!userInput) return;

  const message = userInput.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  userInput.value = "";

  setTimeout(() => {
    const reply = getBotReply(message);
    addMessage(reply, "bot");
  }, 500);
}

if (sendBtn) {
  sendBtn.addEventListener("click", handleSend);
}

if (userInput) {
  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSend();
    }
  });
}

// =========================
// SUGGESTED QUESTION BUTTONS (OPTIONAL)
// =========================
function askSuggested(question) {
  if (!userInput) return;
  userInput.value = question;
  handleSend();
}