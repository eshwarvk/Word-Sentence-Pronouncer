const voiceSelect = document.getElementById("voiceSelect");
const pitchSlider = document.getElementById("pitch");
const rateSlider = document.getElementById("rate");
let voices = [];
function populateVoices() {
  voices = speechSynthesis.getVoices();

  voiceSelect.innerHTML = "";
  voices.slice(0, 10).forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang}) ${voice.default ? "[default]" : ""}`;
    voiceSelect.appendChild(option);
  });
}

speechSynthesis.onvoiceschanged = populateVoices;
window.addEventListener("load", populateVoices);

function convert() {
  const text = document.getElementById("text").value.trim();
  if (!text) {
    alert("Please enter some text!");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  const selectedIndex = voiceSelect.value;
  if (voices[selectedIndex]) {
    utterance.voice = voices[selectedIndex];
  }

  utterance.pitch = parseFloat(pitchSlider.value);
  utterance.rate = parseFloat(rateSlider.value);

  speechSynthesis.speak(utterance);
}
