song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
rightScore = 0;
leftScore = 0;
songStatus = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}
function draw() {
    image(video, 0, 0, 600, 500);
    songStatus = song1.isPlaying();
    stroke("red");
    fill("red");

    if (leftScore > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
    }
    if (songStatus == false) {
        song1.play();
        document.getElementById("song_name").innerHTML = "Song Name - Harry Potter theme song";
    }
    if (rightScore > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
    }
    if (songStatus == false) {
        song2.play();
        document.getElementById("song_name").innerHTML = "Song Name - Peter Pan theme song";
    }
}
function modelLoaded() {
    console.log("posenet is inisialized");
}
function gotPoses(results) {
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;

    rightScore = results[0].pose.keypoints[10].score;
    leftScore = results[0].pose.keypoints[9].score;
}