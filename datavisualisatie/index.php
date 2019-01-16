<!DOCTYPE HTML>
<html>
<head>
    <title>Visualisatie van JSON data met standaard HTML5 en CSS3</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script src="http://code.jquery.com/jquery-2.2.0.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">



    <script type="text/javascript">
        // wait until the entire document is loaded
        $(document).ready(function () {

            // use an AJAX call to load the static JSON data from the server
            $.ajax({
                    url: "voetbaltransfers.json",
                    dataType: "json",
                    success: appendData // calls a function to handle the JSON data
                }
            );

            /**
             * Appends new mobile OS data to the document.
             *
             * @param data  the JSON mobile usage data
             */
            function appendData(data) {
                var count = 0;
                var price = 0;
                var count1 = 0;
                var price1 = 0;
                var count2 = 0;
                var price2 = 0;
                var count3 = 0;
                var price3 = 0;
                // in the property 'os' there is the actual array with the usage data per operating system (OS)
                data.footballer.forEach(function (key, value) {
                    // console.log("dit is de key: " + key.PLAYER);
                    // console.log("dit is de value: " + value);

                    if(key.LEAGUE == "Serie A"){
                        count = (count + 1);
                        price = price + parseInt(key.PRICE);
                    }
                    if(key.LEAGUE == "EPL"){
                        count1 = (count1 + 1);
                        price1 = price1 + parseInt(key.PRICE);
                    }
                    if(key.LEAGUE == "Bundesliga"){
                        count2 = (count2 + 1);
                        price2 = price2 + parseInt(key.PRICE);
                    }
                    if(key.LEAGUE == "La Liga"){
                        count3 = (count3 + 1);
                        price3 = price3 + parseInt(key.PRICE);
                    }
                    // append data per OS (could be done more elegantly if we can expect data from more years)
                    // $('#content').append('<h2>' + os.PLAYER + '</h2>')
                    //     .append('<h3>Price</h3><div class="bar" style="width:'+os['PRICE']+';">' + os['PRICE'] + '</div>')
                    //     .append('<h3>Position</h3><div class="bar" style="width:'+os['POSITION']+';">' + os['POSITION'] + '</div>');

                });
                console.log("er zijn " + count + " spelers in de Serie A");
                console.log("De transfer waarde van de competitie is " + price);
                console.log("er zijn " + count1 + " spelers in de EPL");
                console.log("De transfer waarde van de competitie is " + price1);
                console.log("er zijn " + count2 + " spelers in de Bundesliga");
                console.log("De transfer waarde van de competitie is " + price2);
                console.log("er zijn " + count3 + " spelers in de La Liga");
                console.log("De transfer waarde van de competitie is " + price3);

            }
        });
    </script>

    <script>
        function openCity(evt, cityName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(cityName).style.display = "block";
            evt.currentTarget.className += " active";
        }
    </script>
</head>
<body>
<div id="content">
    <div class="competitievak">

            <img onclick="openCity(event, 'EPL')" src="img/epl.png">

            <img onclick="openCity(event, 'SerieA')" src="img/seria.png">

            <img onclick="openCity(event, 'Bundesliga')" src="img/bundesliga.png">

            <img onclick="openCity(event, 'LaLiga')" src="img/laliga.png">


    </div>
    <div class="transferbalk">


        <div id="SerieA" class="tabcontent" style="margin-left: 20%">
            <h3>Serie A</h3>
            <div class="bar" style="width: 200px"></div>

        </div>

        <div id="EPL" class="tabcontent" style="margin-left: 20%">
            <h3>EPL</h3>
            <div class="bar" style="width: 1000px"></div>

        </div>

        <div id="LaLiga" class="tabcontent" style="margin-left: 20%">
            <h3>La Liga</h3>
            <div class="bar" style="width: 600px"></div>
        </div>

        <div id="Bundesliga" class="tabcontent" style="margin-left: 20%">
            <h3>Bundesliga</h3>
            <div class="bar" style="width: 400px"></div>
           
        </div>

    </div>


</div>





</body>
</html>