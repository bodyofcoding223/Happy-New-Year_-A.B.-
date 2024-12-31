// Get references to elements
const step1 = document.querySelector(".step-1");
const step2 = document.querySelector(".step-2");
const nameInput = document.getElementById("nameInput");
const submitBtn = document.getElementById("submitBtn");
const greetingText = document.getElementById("greetingText");

// Function to speak the greeting with name
function speakGreeting(name) {
  // Create a new speech utterance
  const speech = new SpeechSynthesisUtterance();
  
  // Set the text to be spoken
  speech.text = `Happy New Year, ${name}!`; 
  
  // Set language, volume, rate, and pitch
  speech.lang = "en-US"; // You can change the language if needed
  speech.volume = 1; // Volume: 0 to 1
  speech.rate = 1; // Speed: 0.1 to 10
  speech.pitch = 1; // Pitch: 0 to 2

  // Get all available voices
  const voices = window.speechSynthesis.getVoices();

  // Wait for the voices to be loaded
  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = function() {
      speakGreeting(name);
    };
    return;
  }

  // Choose a more human-like voice (You can experiment with different voices here)
  const humanVoice = voices.find(voice => voice.name === "Google UK English Female") || voices[0]; // Default if not found
  speech.voice = humanVoice;

  // Ensure speech synthesis works on supported browsers
  if ('speechSynthesis' in window) {
    // Speak the text
    window.speechSynthesis.speak(speech);
  } else {
    alert("Sorry, your browser doesn't support Speech Synthesis.");
  }
}

// Event listener for button
submitBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (name) {
    // Move to step 2 and display the name
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
    greetingText.textContent = `Happy New Year, ${name}! 🎉`;

    // Speak the greeting with name after a short delay (so the step-2 is visible first)
    setTimeout(() => {
      speakGreeting(name);
    }, 100); // 100ms delay before starting the speech
  } else {
    alert("Please enter your name.");
  }
});

// Auto-speaking when the page loads (if there's a name in the input field)
window.addEventListener("load", () => {
  const name = nameInput.value.trim();

  if (name) {
    // Speak "Happy New Year" and the name when the page loads
    speakGreeting(name);
  }
});
