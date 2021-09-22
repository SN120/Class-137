var video = "";
var status = "";
var objects = [];
var red1 = "";
var green1 = "";
var blue1 = "";
var red2 = [];
var green2 = [];
var blue2 = [];

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(340, 260);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 340, 260);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {

            red1 = Math.floor(Math.random() * 255);
            green1 = Math.floor(Math.random() * 255);
            blue1 = Math.floor(Math.random() * 255);

            red2.push(red1);
            green2.push(green1);
            blue2.push(blue1)

            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
            
            percent = floor(objects[i].confidence * 100);
            fill(red2[i], green2[i], blue2[i]);
            text(objects[i].label + " " + percent + "%", objects[i].x - 20, objects[i].y);
            noFill();
            
            stroke(red2[i], green2[i], blue2[i]);
            rect(objects[i].x - 20, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    video.loop();
    video.speed(1);
    video.volume(0);
    status = true;
    console.log("Model Loaded!");
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        objects = result;
    }
}