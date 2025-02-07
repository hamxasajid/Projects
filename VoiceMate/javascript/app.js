let speech = new SpeechSynthesisUtterance();
let isPaused = false;
let isSpeaking = false;
let voices = [];

let voiceSelect = document.querySelector("select");

// Load available voices
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  voices.forEach((voice, index) => {
    voiceSelect.options[index] = new Option(voice.name, index);
  });
};

// Change voice on selection
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
  console.log("Voice changed:", speech.voice);
});

// Speak text on button click
document.querySelector("button").addEventListener("click", () => {
  speechSynthesis.cancel(); // Stop any ongoing speech
  speech.text = document.querySelector("textarea").value;
  
  if (speech.text.trim() !== "") {
    isSpeaking = true;
    isPaused = false;
    window.speechSynthesis.speak(speech);
  }
});

// Speech synthesis events to track end and pause
speech.onend = () => {
  console.log("Speech ended");
  isSpeaking = false;
  isPaused = false;
};

speech.onpause = () => {
  console.log("Speech paused");
  isPaused = true;
};

// Toggle play/pause button
function togglePause() {
  if (isSpeaking) {
    if (isPaused) {
      window.speechSynthesis.resume();
      isPaused = false;
      console.log("Speech resumed");
    } else {
      window.speechSynthesis.pause();
      isPaused = true;
      console.log("Speech paused");
    }
  } else {
    console.log("No speech is currently playing.");
  }
}

// Add click event for pause/play button
document.querySelector("#pause-button").addEventListener("click", () => {
  togglePause();
});

// Speech to text (Speech recognition)
function startSpeechRecognition() {
  var recognition = new webkitSpeechRecognition();
  recognition.onresult = function (event) {
    var result = event.results[0][0].transcript;
    document.querySelector("textarea").value = result;
  };
  recognition.start();
}
