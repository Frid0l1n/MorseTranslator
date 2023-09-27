var translation_string = "";
var translated_morse = "";

//without a function for the slider
var slider_wpm = document.getElementById("WPM");
var slider_word = document.getElementById("word");
var output_wpm = document.getElementById("WPM_value");
var output_word = document.getElementById("word_value");
var wpm = 20;

var word_pause = 1000;
output_wpm.innerHTML = display_value(slider_wpm, output_wpm, wpm);
output_word.innerHTML = display_value(slider_word, output_word, word_pause);

function display_value(slider, output, LENGTH_VALUE) {
  slider.oninput = function () {
    output.innerHTML = this.value;
    LENGTH_VALUE = slider.value;
  };
}
//without a function ends here

const dictionary_A = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
  " ": "/",
};
const dictionary_B = {
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
  "/": " ",
};

function MorseToAlpha() {
  //document.A_Form.alpha.value = "";
  //document.getElementById("A_Form").reset();

  morse = document.M_Form.morse.value;

  code_array = morse.split(" ");

  for (let j = 0; j < code_array.length; j++) {
    if (dictionary_B[code_array[j]]) {
      translated_morse += dictionary_B[code_array[j]];
    }
  }
  console.log(translated_morse);
  document.getElementById("alpha").value = translated_morse.trim();
  translated_morse = "";
}

function AlphaToMorse() {
  //document.getElementById("alpha").reset();
  text = document.A_Form.alpha.value.toUpperCase();
  //document.getElementById("morse").textContent = "";
  for (let char of text) {
    if (dictionary_A[char]) {
      translation_string += dictionary_A[char] + " ";
    }
  }
  console.log(translation_string);
  document.getElementById("morse").value = translation_string.trim();
  translation_string = "";
}

function generate_audio() {
  var index = 0;
  var tone = unit;
  var unit = 60000 / (50 * slider_wpm.value);
  // console.log(unit);
  var pause = unit;
  //for the sound
  morse = document.M_Form.morse.value;

  var sign_array = morse.split("");

  //const now = oscillator.now(); //starts a time

  function sound_creator(tone_length, pause_length) {
    //pause organisation
    console.log("sound_generator");
    if (sign_array[index + 1] == " ") {
      index += 1; //skip the next part of the array (" ")
    }
    if (sign_array[index] == " " && sign_array[index + 1] == "/") {
      index += 2; //skipt the next three parts of the array (/, " ")
    }

    index++; //increase the value anyways to to to next position
    const oscillator = new Tone.Oscillator(440, "sine").toDestination();
    //sound creation
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, tone_length);

    setTimeout(() => {
      looping();
      console.log("now");
    }, tone_length + pause_length);
  }

  //creates an array with all signs and spaces

  function looping() {
    console.log(sign_array[index]);

    //for (let i = 0; i < sign_array.length; i++) {
    pause = unit;
    if (sign_array[index + 1] == " ") {
      pause = 3 * unit;
    }
    if (sign_array[index + 1] == " " && sign_array[index + 2] == "/") {
      pause = 7 * unit;
    }

    if (sign_array[index] == ".") {
      tone = unit;
    }
    if (sign_array[index] == "-") {
      tone = 3 * unit;

      //add one pause_length unit
    }
    if (sign_array[index] == "." || sign_array[index] == "-") {
      sound_creator(tone, pause);
    }
  }
  looping();
}
