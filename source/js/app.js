$(document).ready(function() {
    TweenLite.to(needle, 2, {rotation:-31,  transformOrigin:"bottom right"});
    var speed = 0,
        gearbox = 0,
        time = 0,
        distance = 0,
        rpm = 750;

    var peugeot = {
        gp: '3.7',
        gear1: '3.636',
        gear2: '1.95',
        gear3: '1.357',
        gear4: '0.941',
        gear5: '0.784',
        hp: '75'
    };


    var resetRPM;
    var startRace = function() {
        start_timer();
        setInterval(
            function () {

                var gearnumber = 0;

                console.log("time", time);
                if(rpm > 6000) {
                    rpm = 6000;
                }
                if(gearbox == 1) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear1*rpm;
                }
                if(gearbox == 2) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear2*rpm;
                }
                if(gearbox == 3) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear3*rpm;
                }
                if(gearbox == 4) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear4*rpm;
                }
                if(gearbox == 5) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear4*rpm;
                }
                rpm = rpm + rpm/75/3;

                console.log("speed", speed);
                speedMS = speed*0.277777777777778;
                console.log("speedMS", speedMS);
                distance = distance + speedMS/100 ;
                console.log("distance", distance);
                if(distance > 400) {
                    console.log("Гонка завершена!!!!!!!, ваше время: " + time);
                    stop_timer();
                }

                console.log("gp", peugeot.gp);
                console.log("rpm", rpm);
                console.log("gearbox", gearbox);
                speedUpdate();
            },
            10
        );
    };
    var speedUpdate = function() {
        var	kmNum = parseInt(speed) * 0.62137;
        //make sure kmNum is a number then output
        if ( (speed <= 195) && !isNaN(kmNum) ){
            var speedKm = kmNum * 2 - 31;
            $('#numbers').css('text-align', 'center');
            $('#miles').val(kmNum.toFixed(2));
            $('#numbers').html(kmNum.toFixed(0));
            $('#mi-km').html('Miles');
        } else if (!isNaN(kmNum)){
            var speedKm= 215;
            $('#numbers').css('text-align', 'right');
            $('#miles').val(kmNum.toFixed(2));
            $('#numbers').html(kmNum.toFixed(0));
            $('#mi-km').html('Miles');
        } else {
            $('#miles').val('');
            $('#kilometers').val('');
            $('#numbers').html('');
            $("#errmsg").html("Numbers Only").show().fadeOut(1600);
        }

        var needle = $("#needle");
        TweenLite.to(needle, 2, {rotation:speedKm,  transformOrigin:"bottom right"});
    };

    var gearboxUpdate = function() {
        $('#gearbox b').html(gearbox);
    };
    console.log(gearbox);
    gearboxUpdate();

    $(document).keyup(function(event){
        if (event.keyCode == 38) {
            //var speedAuto = 1;
            //startAuto(speedAuto);
            //speed = speed+30;
            //speedUpdate();
            gearbox = gearbox + 1;
            gearboxUpdate();
            rpm = rpm - 2500;
        }
    });

    $(document).keyup(function(event){
        if (event.keyCode == 40) {
            //var speedAuto = -1;
            //startAuto(speedAuto);
            //speed = speed-30;
            //speedUpdate();
            gearbox = gearbox - 1;
            gearboxUpdate();
        }
    });

    $("#start").click(function(){
        startRace();

    });
    $("#stop").click(function(){
        //var speedAuto = -15;
        //startAuto(speedAuto);
        //$(".b-peugeot").animate({"margin-left": "+=150px"}, 100);
        stop_timer();
    });



    var sdegree = 1;

    var startAuto = function(speed) {
        setInterval(function() {
            sdegree = sdegree - speed;
            //console.log("sdegree", sdegree);
            //console.log("speed", speed);
            var srotate = "rotate(" + sdegree + "deg)";

            $(".b-peugeot__wheel").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
            $(".b-content").css({"background-position-x" : -sdegree/2});

        }, 0 );
    }

    var timer;
    function start_timer()
    {

        if (timer) clearInterval(timer);
        secs = 0;
        document.getElementById('timer').innerHTML = 'Время: '+ secs + ' сек.';
        timer = setInterval(
            function () {
                secs++;
                document.getElementById('timer').innerHTML = 'Время: '+ secs/100 + ' сек.';
                time = secs/100;
            },
            10
        );
    }
    function stop_timer()
    {
        if (timer) clearInterval(timer);
    }


});