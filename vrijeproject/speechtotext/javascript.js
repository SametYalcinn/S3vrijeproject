
function action() {

    var speech=new webkitSpeechRecognition();


    document.getElementById("nl1").onclick = function setLangNL() {
        speech.lang="";
        speech.lang="nl";
        console.log("ik ben nu nederlands")
        document.getElementById("text").value = "Start met praten!";
        action();
    }

    document.getElementById("en1").onclick = function setLangEN() {
        speech.lang="";
        speech.lang="en";
        console.log("ik ben nu engels")
        document.getElementById("text").value = "Start talking!";
        action();
    }

    document.getElementById("fr1").onclick = function setLangFR() {
        speech.lang="";
        speech.lang="fr";
        console.log("ik ben nu frans")
        document.getElementById("text").value = "Commence à parler!";
        action();
    }
    document.getElementById("es1").onclick = function setLangFR() {
        speech.lang="";
        speech.lang="es";
        console.log("ik ben nu spaans")
        document.getElementById("text").value = "Empieza a hablar!";
        action();
    }





    speech.onspeechend = function(){
        console.log('speech result');

        setTimeout(function(){
            speech.start();
        }, 300);

    };
    speech.start();
    speech.onresult=function (e) {

        if (event.results.length > 0) {

            outcome = event.results[event.results.length - 1];
            if (outcome.isFinal) {
                document.querySelector("input").value = outcome[0].transcript;


            }
        }
    };
    speech.start();

}

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
if (navigator.getUserMedia) {
    navigator.getUserMedia({
            audio: true
        },
        function(stream) {
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            microphone.connect(analyser);
            analyser.connect(javascriptNode);
            javascriptNode.connect(audioContext.destination);

            canvasContext = $("#canvas")[0].getContext("2d");

            javascriptNode.onaudioprocess = function() {
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                var values = 0;

                var length = array.length;
                for (var i = 0; i < length; i++) {
                    values += (array[i]);
                }

                var average = values / length;

         // console.log(Math.round(average - 40));


                if((average - 40) < 10){
                    // canvasContext.clearRect(0, 0, 150, 300);
                    // canvasContext.fillStyle = '#13cc08';
                    // canvasContext.fillRect(0, 300 - average, 150, 300);
                    // document.getElementById("text").style.fontSize = '';
                    // document.getElementById("text").style.color = '';
                    // document.getElementById("logo1").style.width = '';
                    document.body.style.backgroundColor = "green";
                    // document.getElementById('logo1').src='images/SPEXTlogogroen.png';

                }
                if((average - 40) > 0){
                    // canvasContext.clearRect(0, 0, 150, 300);
                    // canvasContext.fillStyle = '#cc6700';
                    // canvasContext.fillRect(0, 300 - average, 150, 300);
                    // document.getElementById("text").style.fontSize = '50px';
                    // document.getElementById("text").style.color = '';
                    // document.getElementById("logo1").style.width = '225';
                    document.body.style.backgroundColor = "orange";
                    //document.getElementById('logo1').src='images/SPEXTlogooranje.png';

                }

                if((average - 40) > 30){
                    // canvasContext.clearRect(0, 0, 150, 300);
                    // canvasContext.fillStyle = '#bd0600';
                    // canvasContext.fillRect(0, 300 - average, 150, 300);
                    // document.getElementById("text").style.color = 'red';
                    // document.getElementById("text").style.fontSize = '60px';
                    // document.getElementById("logo1").style.width = '250px';
                     document.body.style.backgroundColor = "red";
                    // document.getElementById('logo1').src='images/SPEXTlogorood.png';
                }

            }
        },
        function(err) {
            console.log("The following error occured: " + err.name)
        });
} else {
    console.log("getUserMedia not supported");
}



var Recording = function (cb) {
    var recorder = null;
    var recording = true;
    var audioInput = null;
    var volume = null;
    var audioContext = null;
    var callback = cb;
    navigator.getUserMedia =
        navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true }, function (e) {
            //success
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
            volume = audioContext.createGain(); // creates a gain node
            audioInput = audioContext.createMediaStreamSource(e); // creates an audio node from the mic stream
            audioInput.connect(volume); // connect the stream to the gain node
            recorder = audioContext.createScriptProcessor(2048, 1, 1);
            recorder.onaudioprocess = function (e) {
                if (!recording)
                    return;
                var left = e.inputBuffer.getChannelData(0);
                //var right = e.inputBuffer.getChannelData(1);
                callback(new Float32Array(left));
            };
            volume.connect(recorder); // connect the recorder
            recorder.connect(audioContext.destination);
        }, function (e) {
            //failure
            alert("Error capturing audio.");
        });
    }
    else {
        alert("getUserMedia not supported in this browser.");
    }
};
var lastClap = new Date().getTime();
function detectClap(data) {
    var t = new Date().getTime();
    if (t - lastClap < 200)
        return false; // TWEAK HERE
    var zeroCrossings = 0, highAmp = 0;
    for (var i = 1; i < data.length; i++) {
        if (Math.abs(data[i]) > 0.75)
            highAmp++; // TWEAK HERE
        if ((data[i] > 0 && data[i - 1] < 0) || (data[i] < 0 && data[i - 1] > 0))
            zeroCrossings++;
    }
    if (highAmp > 20 && zeroCrossings > 30) {
        // TWEAK HERE
        //console.log(highAmp+' / '+zeroCrossings);
        lastClap = t;
        return true;
    }
    return false;
}

var rec = new Recording(function (data) {
    if (detectClap(data)) {
        console.log("clap!");
        // document.body.style.backgroundColor =
        //     "rgb(" +
        //     Math.random() * 255 +
        //     "," +
        //     Math.random() * 255 +
        //     "," +
        //     Math.random() * 255 +
        //     ")";


        // document.getElementById("logo1").style.width = '250px';
        // console.log('hallo');

        // var logo = document.getElementById('logo1');
        //
        // var r = Math.floor(Math.random() * 255);
        //
        // var g = Math.floor(Math.random() * 255);
        //
        // var b = Math.floor(Math.random() * 255);
        //
        // logo.style.fill = 'rgb(' + r + ', ' + g + ' , ' + b + ')';

    }

});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}




