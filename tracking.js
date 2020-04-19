async function getWebcam() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
            'Browser API navigator.mediaDevices.getUserMedia not available');
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    let disp = document.getElementById('video');
    disp.srcObject = stream;
    return new Promise((resolve) => {
        disp.onloadeddata = () => {
            disp.play();
            resolve(disp);
        };
    })
}
function detectPeople(video, net,callback) {
    //const canvas = document.getElementById("display");
    // const ctx = canvas.getContext('2d');
    const flipPoseHorizontal = true;
    const minScore = .5;
    async function detect() {
        let poses = [];
        const pose = await net.estimatePoses(video, {
            scale:.2,
            flipHorizontal: flipPoseHorizontal
        });
        poses = poses.concat(pose);
        //ctx.clearRect(0, 0, 800, 800);

        poses.forEach((keypoint)=>{
            keypoint.keypoints.forEach((point)=>{
                if(point.score > minScore){
                    if(point.part == "nose"){
                        //console.log(point);
                        callback(point.position.x, point.position.y);
                    }
                    // ctx.beginPath();
                    // ctx.arc(point.position.x,point.position.y, 5,0, 2*Math.PI);
                    // ctx.fillStyle="green";
                    // ctx.closePath();
                    // ctx.fill();
                }
            })
        });
        requestAnimationFrame(detect);
    }
    detect();
}

async function start() {
    //load in poseInfo
    const net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 640, height: 480 },
        multiplier: 0.75
    })
    let video = await getWebcam();
    detectPeople(video,net,handleChange);
}
start();