$(document).ready(function() {
    TweenLite.to(needle, 2, {rotation:-31,  transformOrigin:"bottom right"});
    var speed = 0,
        gearbox = 0,
        time = 0,
        distance = 0,
        rpm = 750,
        rpmResolve = 0;

    var peugeot = {
        gp: '4.06',
        gear1: '3.42',
        gear2: '1.81',
        gear3: '1.28',
        gear4: '0.98',
        gear5: '0.77',
        hp: '75',
        weight: '1300'
    };

    var gearboxUp = function(){
        if(gearbox == 0) {
            rpm = 1500;
        }
        if(gearbox == 1) {
            rpmResolve = rpm - (speed/(0.377*0.28/peugeot.gp/peugeot.gear2));
        }
        if(gearbox == 2) {
            rpmResolve = rpm - (speed/(0.377*0.28/peugeot.gp/peugeot.gear3));
        }
        if(gearbox == 3) {
            rpmResolve = rpm - (speed/(0.377*0.28/peugeot.gp/peugeot.gear4));
        }
        if(gearbox == 4) {
            rpmResolve = rpm - (speed/(0.377*0.28/peugeot.gp/peugeot.gear5));
        }
        if(gearbox < 5) {
            gearbox = gearbox + 1;
            gearboxUpdate();
            rpm = rpm - rpmResolve;
        }

    };

    $(document).keyup(function(event){
        if (event.keyCode == 38) {
            gearboxUp();
        }
    });

    var kpd;
    var resetRPM;
    var startRace = function() {
        start_timer();
        setInterval(
            function () {

                var gearnumber = 0;
                var kpd = peugeot.weight/peugeot.hp/2.5;


                if(rpm < 2000) {
                    kpd = peugeot.weight/peugeot.hp/3.5;
                }
                else if(rpm < 3500) {
                    kpd = peugeot.weight/peugeot.hp/3;
                }
                else if(rpm < 5500) {
                    kpd = peugeot.weight/peugeot.hp/2.5;
                }
                else if(rpm > 5500){
                    kpd = peugeot.weight/peugeot.hp/3.5;
                }

                console.log("time", time);
                if(rpm > 6000) {
                    rpm = 6000;
                }
                if(gearbox == 0) {
                    if(rpm > 3500) {
                        rpm = 3500;
                    }
                    rpm = rpm + rpm/75;
                }
                if(gearbox == 1) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear1*rpm;
                    rpm = rpm + (kpd*peugeot.gp*peugeot.gear1)/10;
                }
                if(gearbox == 2) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear2*rpm;
                    rpm = rpm + (kpd*peugeot.gp*peugeot.gear2)/10;
                }
                if(gearbox == 3) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear3*rpm;
                    rpm = rpm + (kpd*peugeot.gp*peugeot.gear3)/10;
                }
                if(gearbox == 4) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear4*rpm;
                    rpm = rpm + (kpd*peugeot.gp*peugeot.gear4)/10;
                }
                if(gearbox == 5) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear5*rpm;
                    rpm = rpm + (kpd*peugeot.gp*peugeot.gear5)/10;
                }

                if(speed < 100 ) {
                    $('#speed b').html(time);
                }
                console.log("speed", speed);
                speedMS = speed*0.277777777777778;
                console.log("speedMS", speedMS);
                distance = distance + speedMS/100 ;
                console.log("distance", distance);
                if(distance > 400) {
                    console.log("Гонка завершена!!!!!!!, ваше время: " + time);
                    stop_timer();
                }
                tachometer();
                console.log("gp", peugeot.gp);
                console.log("rpm", rpm);
                console.log("gearbox", gearbox);
                console.log("rpmResolve", rpmResolve);
                console.log("kpd", kpd);
                speedUpdate();
            },
            10
        );
    };
    var speedUpdate = function() {
        var	kmNum = parseInt(speed);
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
        TweenLite.to(needle, 20, {rotation:speedKm,  transformOrigin:"bottom right"});
    };

    var gearboxUpdate = function() {
        $('#gearbox b').html(gearbox);
    };
    gearboxUpdate();
    var tachometer = function() {
        $('#tachometer b').html(Math.round(rpm));
    };



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
        gearboxUp();
        //startAuto(10);

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