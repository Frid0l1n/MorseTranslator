var translation_string = "";
var translated_morse = "";
let sign_array = [];


//slider information
var slider_wpm = document.getElementById("WPM");
var slider_word = document.getElementById("word");
var output_wpm = document.getElementById("WPM_value");
var output_word = document.getElementById("word_value");
var wpm = 20;


//var word_pause = 1000;
output_wpm.innerHTML = display_value(slider_wpm, output_wpm, wpm);

//output_word.innerHTML = display_value(slider_word, output_word, word_pause);

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
//translate Morse to normal
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

//translate normal to morse
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

//everything for the AUDIO ----------------------------------------------------------------------------------------------------------------
var index = 0;
var unit = 0;
var tone = unit;
// console.log(unit);
var pause = unit;

var PlayPause = document.getElementById("play_pause");
var PLAY = true;
var current_situation = "loop";


//pause the audio
function pause_audio() {
  console.log("Audio should be paused");
  var play = "<button type='button' class='button' onclick='continue_audio()'> <span class='glyphicon glyphicon-play'></span> Play</button>";
  PlayPause.innerHTML = play;
  PLAY = false;

}

function continue_audio() { //continue the staff: problem with the loop, initialize the current function with if statmentes would work.
  console.log("continue AUDIO")
  var pause = "<button type='button' class='button' onclick='pause_audio()'> <span class='glyphicon glyphicon-pause'></span> Pause</button>";
  PlayPause.innerHTML = pause;
  PLAY = true;
  switch (current_situation) {
    case "loop":
      looping();
      break;
    case "production":
      sound_creator(tone,pause);
      break;
  }
}

//creates the sound then runs the loop function to generate the next
//tests if the pause button is pressed.
function sound_creator(tone_length, pause_length) {
  console.log("in the creation");
  current_situation = "production";
  if(PLAY){
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

    if(index == sign_array.length){
        console.log("end");
        play = "<button type='button' class='button' onclick='init_audio()'> <span class='glyphicon glyphicon-play'></span> Play</button>";
        PlayPause.innerHTML = play;
    }
    else {
      setTimeout(() => {
        looping();
       
      }, tone_length + pause_length);
  

    }
    
  }
  
}

//initialization of audio
function init_audio() {
  console.log("initialized audio");
  index=0;
  
  var pause = "<button type='button' class='button' onclick='pause_audio()'> <span class='glyphicon glyphicon-pause'></span> Pause</button>";
  PlayPause.innerHTML = pause;
  unit = 60000 / (50 * slider_wpm.value);


  //for the sound
  morse = document.M_Form.morse.value;

  sign_array = morse.split("");

  //const now = oscillator.now(); //starts a time

  //start the loop
  looping();
}

//creates an array with all signs and spaces
function looping() {
  console.log("in the algorithm");
  current_situation = "loop";
  if(PLAY){
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
}



//should produce an audio file to download via recorder.start() from Tone.js
function download_audio() {
var delay = 0;
var unit = 60 / (50 * slider_wpm.value);
var tone_length = unit;
morse = document.M_Form.morse.value;
const synth = new Tone.Synth().toDestination().toFrequency();
const now = Tone.now()
var sign_array = morse.split("");

  function produce(length, delay) {
    synth.triggerAttackRelease(400, length, now +delay);
  }

  recorder.start();
  for(let i = 0; i < sign_array.length; i++)
  {
    if(sign_array[i] == "."){
      tone_length = unit;
      delay += 2* unit;
      produce(unit, delay);
    }
    if(sign_array[i] == "-"){
      tone_length = 3* unit;
      delay += 4*unit;
  }
  else if (sign_array[i] == " ") {
    if (sign_array[i + 1] == "/" || sign_array[i - 1] == "/") {
      //do nothing
    } else {
      delay += 2 * unit;
    }
  } else if (sign_array[i] == "/") {
    delay += 6 * unit;
  }

  setTimeout(async () => {
    // the recorded audio is returned as a blob
    const recording = await recorder.stop();
    // download the recording by creating an anchor element and blob url
    const url = URL.createObjectURL(recording);
    const anchor = document.createElement("a");
    anchor.download = "recording.webm";
    anchor.href = url;
    anchor.click();
  }, 4000);
}
}
