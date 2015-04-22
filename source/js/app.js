$(document).ready(function() {
    //TweenLite.to(needle, 2, {rotation:-31,  transformOrigin:"bottom right"});
    var speed = 0,
        gearbox = 0,
        time = 0,
        distance = 0,
        rpm = 750,
        rpmResolve = 0,
        speedRound = 0;


    var peugeot = {
        gp: '4.06',
        gear1: '3.42',
        gear2: '1.81',
        gear3: '1.28',
        gear4: '0.98',
        gear5: '0.77',
        hp: '150',
        weight: '1300',
        maxrpm: '7000'
    };

    var gearboxUp = function(){
        if(gearbox == 0) {
            rpm = 2000;
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

    var kpd,
        indexkpd = (peugeot.hp/peugeot.weight)*120;
    var resetRPM;
    var startRace = function() {
        start_timer();
        var startRaceInterval = setInterval(
            function () {

                var gearnumber = 0;
                //var kpd = peugeot.hp/peugeot.weight/2.5;


                if(rpm < 2000) {
                    kpd = indexkpd/2;
                }
                else if(rpm < 3000) {
                    kpd = indexkpd/1.6;
                }
                else if(rpm < 4000) {
                    kpd = indexkpd/1.4;
                }
                else if(rpm < 5000) {
                    kpd = indexkpd/1.2;
                }
                else if(rpm < 6000){
                    kpd = indexkpd/1.1;
                }
                else if(rpm < 7000){
                    kpd = indexkpd/2;
                }

                console.log("time", time);
                if(rpm > peugeot.maxrpm) {
                    rpm = peugeot.maxrpm - 100;
                }
                if(gearbox == 0) {
                    if(rpm > 3500) {
                        rpm = 3500;
                    }
                    rpm = rpm + rpm/75;
                }
                if(gearbox == 1) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear1*rpm;
                    rpm = rpm + (kpd*peugeot.gp*peugeot.gear1);
                }
                if(gearbox == 2) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear2*rpm;
                    rpm = rpm + (kpd*peugeot.gp*peugeot.gear2);
                }
                if(gearbox == 3) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear3*rpm;
                    rpm = rpm + (kpd*peugeot.gp*peugeot.gear3);
                }
                if(gearbox == 4) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear4*rpm;
                    rpm = rpm + (kpd*peugeot.gp*peugeot.gear4);
                }
                if(gearbox == 5) {
                    speed = 0.377*0.28/peugeot.gp/peugeot.gear5*rpm;
                    rpm = rpm + (kpd*peugeot.gp*peugeot.gear5);
                }

                if(speed < 100 ) {
                    $('#speed b').html(time);
                }
                if (rpm > 6500) {

                } else {
                    if(gearbox == 1) {
                        startAuto(speed/150);
                        speedRound = speedRound + speed/150;
                    }
                    if(gearbox == 2) {
                        startAuto(speed/250);
                        speedRound = speedRound + speed/250;
                    }
                    if(gearbox == 3) {
                        startAuto(speed/350);
                        speedRound = speedRound + speed/350;
                    }
                    if(gearbox == 4) {
                        startAuto(speed/450);
                        speedRound = speedRound + speed/450;
                    }
                    if(gearbox == 5) {
                        startAuto(speed/550);
                        speedRound = speedRound + speed/550;
                    }
                }

                console.log("speed", speed);
                console.log("speedRound", speedRound);
                speedMS = speed*0.277777777777778;
                console.log("speedMS", speedMS);
                distance = distance + speedMS/10 ;
                console.log("distance", distance);
                if(distance > 400) {
                    stopRace();
                    clearInterval(startRaceInterval);
                }
                tachometer();
                console.log("gp", peugeot.gp);
                console.log("rpm", rpm);
                console.log("gearbox", gearbox);
                console.log("rpmResolve", rpmResolve);
                console.log("kpd", kpd);
                segDisplay.value(speed);
                gauge.value(rpm/1000);
            },
            100
        );
    };
    var stopRace = function () {
        console.log("Гонка завершена!!!!!!!, ваше время: " + time);
        stop_timer();

        alert("Гонка завершена, вы прошли 400 м за " + time + " сек");
        var speedRoundCount = 0;
        var stopRaceInterval = setInterval(function(){
            if(speedRoundCount < 20) {
                startAuto(speedRound/-20);
                speedRoundCount = speedRoundCount + 1;
            } else {
                clearInterval(stopRaceInterval);
            }
        },100);

    };
    var svg = d3.select("#speedometer")
        .append("svg:svg")
        .attr("width", 300)
        .attr("height", 280);


    var gauge = iopctrl.arcslider()
        .radius(120)
        .events(false)
        .indicator(iopctrl.defaultGaugeIndicator);
    gauge.axis().orient("in")
        .normalize(true)
        .ticks(8)
        .tickSubdivide(3)
        .tickSize(10, 8, 10)
        .tickPadding(5)
        .scale(d3.scale.linear()
            .domain([0,8])
            .range([-3*Math.PI/4, 3*Math.PI/4]));

    var segDisplay = iopctrl.segdisplay()
        .width(80)
        .digitCount(6)
        .negative(false)
        .decimals(0);

    svg.append("g")
        .attr("class", "segdisplay")
        .attr("transform", "translate(130, 200)")
        .call(segDisplay);

    svg.append("g")
        .attr("class", "gauge")
        .call(gauge);

    gauge.value(rpm/1000);

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
        speed = 0;
        gearbox = 0;
        time = 0;
        distance = 0;
        rpm = 750;
        rpmResolve = 0;
        startRace();
        gearboxUp();
        startAuto(10);
        speedRound = 10;


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

        }, 10 );
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
                document.getElementById('timer').innerHTML = 'Время: '+ secs/10 + ' сек.';
                time = secs/10;
            },
            100
        );
    }
    function stop_timer()
    {
        if (timer) clearInterval(timer);
    }


});