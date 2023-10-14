arr = [];


function setup() {
  canvas = createCanvas(300, 400);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  facingMode: {
    exact: "environment"
  }
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/R3rBWMPIl/model.json", modelloaded);

}

function modelloaded(){
  console.log("model loaded");
}


function draw(){
 image(video, 0,0, 300, 400);
 classifier.classify(video, gotResult);
}

previous_result = "";

function gotResult(error, results){
  if (error) {
    console.log(error);
  } else {
    
    if ((results[0].confidence>0.5)&& previous_result != results[0].label) {
      console.log(results);
      previous_result = results[0].label;
      synth = window.speechSynthesis
      speakdata = "object detected is " + results[0].label;
      utterthis = new SpeechSynthesisUtterance(speakdata);
      synth.speak(utterthis);
      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = (results[0].confidence*100).toFixed(2);
      
    }
  }
}

acc_result = previous_result

var sentence = [];

function printDaArray() {
    console.log(previous_result);
    sentence = sentence.concat(previous_result);
    document.getElementById("textarea1").innerHTML = sentence.join("");
  
}


let startTimer = setInterval(printDaArray, 2000);
printDaArray()


