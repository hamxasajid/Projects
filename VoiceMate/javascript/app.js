let speech = new SpeechSynthesisUtterance();

let isPaused = false;

let voices = [];

let voiceSelect = document.querySelector("select");

console.log("voice select", voiceSelect);

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  voices.forEach(
    (voice, index) =>
      (voiceSelect.options[index] = new Option(voice.name, index))
  );
};
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
  console.log(speech.voice);
});

document.querySelector("button").addEventListener("click", () => {
  speechSynthesis.cancel(); // Stop the current speech
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});

///////////////////Voice play Pause

function togglePause() {
  if (isPaused) {
    window.speechSynthesis.resume(); // Resume speech synthesis
    isPaused = false;
  } else {
    window.speechSynthesis.pause(); // Pause speech synthesis
    isPaused = true;
  }
}

document.querySelector("#pause-button").addEventListener("click", () => {
  togglePause();
});

//////////////////////speech to text

function startSpeechRecognition() {
  var recognition = new webkitSpeechRecognition();

  recognition.onresult = function (event) {
    var result = event.results[0][0].transcript;
    document.querySelector("textarea").value = result;
  };

  recognition.start();
}
