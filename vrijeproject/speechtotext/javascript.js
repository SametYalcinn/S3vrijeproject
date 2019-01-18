//spraakherkenning functie
function startRecognition() {

    // object dat de spraakinterface biedt en een aantal kenmerken en eventhandlers instelt.
    var speech=new webkitSpeechRecognition();

    // wordt gekeken of de id wordt geklikt
    // indien er wordt geklikt staat het gelijk aan een functie
    document.getElementById("nl1").onclick = function setLangNL() {
        //spraak taal wordt leeggemaakt
        speech.lang="";
        // spraak taal wordt ingesteld
        speech.lang="nl";
        console.log("ik ben nu nederlands")
        // de value wordt gevuld
        document.getElementById("text").value = "Start met praten!";
        // de spraakherkenning wordt weer gestart
        startRecognition();
    }

    document.getElementById("en1").onclick = function setLangEN() {
        speech.lang="";
        speech.lang="en";
        console.log("ik ben nu engels")
        document.getElementById("text").value = "Start talking!";
        startRecognition();
    }

    document.getElementById("fr1").onclick = function setLangFR() {
        speech.lang="";
        speech.lang="fr";
        console.log("ik ben nu frans")
        document.getElementById("text").value = "Commence à parler!";
        startRecognition();
    }
    document.getElementById("es1").onclick = function setLangFR() {
        speech.lang="";
        speech.lang="es";
        console.log("ik ben nu spaans")
        document.getElementById("text").value = "Empieza a hablar!";
        startRecognition();
    }

    // als de spraak stopt wordt er een timeout ingesteld
    speech.onspeechend = function(){
        console.log('speech result');

        // er wordt een time-out ingesteld voordat de spraak weer wordt gestart
        setTimeout(function(){
            speech.start();
        }, 300);

    };

    // spraak wordt gestart
    speech.start();


    speech.onresult=function (e) {

        // als er resultaat/ if result > 0 betekent meer dan 0 resultaten
        if (event.results.length > 0) {

            //array van resultaat
            outcome = event.results[event.results.length - 1];
            if (outcome.isFinal) {
                //console.log(outcome);
                // resultaat wordt gevuld in de value van de input
                document.querySelector("input").value = outcome[0].transcript;
            }
        }
    };
    speech.start();

}

// vraag van toegang tot audio
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
if (navigator.getUserMedia) {
    navigator.getUserMedia({
            // als het is toegestaan
            audio: true
        },
        function(outputEffect) {
            //microfoon instellingen
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(outputEffect);
            javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

            //Het is in feite een gemiddelde tussen de huidige buffer en de laatste buffer die door
            // de AnalyserNode is verwerkt en resulteert in een veel gelijkmatiger reeks
            // waardeveranderingen in de loop van de tijd.
            analyser.smoothingTimeConstant = 0.8;

            //wordt gebruikt bij het uitvoeren van een
            // Fast Fourier-transformatie (FFT) om frequentiedomeingegevens te verkrijgen.
            analyser.fftSize = 1024;

            // verbinding van microfoon
            microphone.connect(analyser);
            analyser.connect(javascriptNode);
            javascriptNode.connect(audioContext.destination);

            canvasContext = $("#canvas")[0].getContext("2d");

            // code dat wordt uitgevoerd als er wordt opgenomen
            javascriptNode.onaudioprocess = function() {
                //array van de frequentie
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                var values = 0;

                // code dat de frequentie omzet naar value en lenght
                var length = array.length;
                for (var i = 0; i < length; i++) {
                    values += (array[i]);
                }

                // de gemiddelde wordt berekend
                var average = values / length;

                // console.log(Math.round(average - 40));

                // in de volgende drie if statements wordt gekeken hoe gekeken
                // hoer hard het geluid is en aan de hand daarvan worden er handelingen uitgevoerd
                if((average - 40) < 10){
                    // canvas dat wordt gevuld
                    // canvasContext.clearRect(0, 0, 150, 300);
                    // canvasContext.fillStyle = '#13cc08';
                    // canvasContext.fillRect(0, 300 - average, 150, 300);

                    // lettergrote
                    // document.getElementById("text").style.fontSize = '';

                    // tekst kleur
                    // document.getElementById("text").style.color = '';

                    //logo formaat
                    // document.getElementById("logo1").style.width = '';

                    // achtergrond kleur
                    // document.body.style.backgroundColor = "green";

                    // veranderen naar andere logo in dit geval alleen kleur
                    // document.getElementById('logo1').src='images/SPEXTlogogroen.png';

                }
                if((average - 40) > 0){
                    // canvasContext.clearRect(0, 0, 150, 300);
                    // canvasContext.fillStyle = '#cc6700';
                    // canvasContext.fillRect(0, 300 - average, 150, 300);
                    // document.getElementById("text").style.fontSize = '50px';
                    // document.getElementById("text").style.color = '';
                    // document.getElementById("logo1").style.width = '225';
                    // document.body.style.backgroundColor = "orange";
                    //document.getElementById('logo1').src='images/SPEXTlogooranje.png';

                }

                if((average - 40) > 30){
                    // canvasContext.clearRect(0, 0, 150, 300);
                    // canvasContext.fillStyle = '#bd0600';
                    // canvasContext.fillRect(0, 300 - average, 150, 300);
                    // document.getElementById("text").style.color = 'red';
                    // document.getElementById("text").style.fontSize = '60px';
                    // document.getElementById("logo1").style.width = '250px';
                    // document.body.style.backgroundColor = "red";
                    // document.getElementById('logo1').src='images/SPEXTlogorood.png';
                }

            }
        },
        function(err) {
            console.log("The following error occured: " + err.name)
        });
} else {
    console.log("getUserMedia wordt niet ondersteund");
}



var Recording = function (cb) {
    var recorder = null;
    var recording = true;
    var audioInput = null;
    var volume = null;
    var audioContext = null;
    var callback = cb;

    // toegang voor audio
    navigator.getUserMedia =
        navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true }, function (e) {
            //success
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
            volume = audioContext.createGain(); //maakt een versterkingsknoop
            audioInput = audioContext.createMediaStreamSource(e); // maakt een audioknooppunt van de mic-stream
            audioInput.connect(volume); //verbind de stream met het versterkingsknooppunt
            recorder = audioContext.createScriptProcessor(2048, 1, 1);
            recorder.onaudioprocess = function (e) {
                // als het niet opneemt stop het
                if (!recording)
                    return;
                var left = e.inputBuffer.getChannelData(0);
                //var right = e.inputBuffer.getChannelData(1);
                callback(new Float32Array(left));
            };
            volume.connect(recorder); // connect de recorder
            recorder.connect(audioContext.destination);
        }, function (e) {
            //failure
            alert("Error capturing audio.");
        });
    }
    else {
        alert("getUserMedia wordt niet ondersteund.");
    }
};
var lastClap = new Date().getTime();
function detectClap(data) {
    var t = new Date().getTime();
    //timeout tussen de clap
    if (t - lastClap < 1000)
        return false; // TWEAK HERE
    var zeroCrossings = 0, highAmp = 0;
    for (var i = 1; i < data.length; i++) {
        // nieuwe clap als hoger is dan 0.75
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
    //indien er een "harde" klap wordt gedetecteerd
    if (detectClap(data)) {
        console.log("clap!");
        //wordt de achtergrondkleur verandert naar een random kleur
        document.body.style.backgroundColor =
            "rgb(" +
            Math.random() * 255 +
            "," +
            Math.random() * 255 +
            "," +
            Math.random() * 255 +
            ")";


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

/* Wanneer de gebruiker klikt op de button,
schakelt tussen het laten zien en verbergen van de content */
function clickDropdown() {
    document.getElementById("languageDropdown").classList.toggle("show");
}

// Sluit de dropdown indien er buiten de kader wordt geklikt
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




