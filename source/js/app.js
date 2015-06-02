$(document).ready(function() {
    var speed = 0,
        gearbox = 0,
        time = 0,
        distance = 0,
        rpm = 750,
        rpmResolve = 0,
        speedRound = 0;

    var firstCar, secondCar;



    var peugeot206 = {
        gp: '4.06',
        gear1: '3.42',
        gear2: '1.81',
        gear3: '1.28',
        gear4: '0.98',
        gear5: '0.77',
        hp: '150',
        weight: '1150',
        maxrpm: '7000'
    };

    var fordFocus = {
        gp: '4.06',
        gear1: '3.42',
        gear2: '1.81',
        gear3: '1.28',
        gear4: '0.98',
        gear5: '0.77',
        hp: '150',
        weight: '1150',
        maxrpm: '7000'
    };

    firstCar = peugeot206;
    secondCar = fordFocus;
    console.log(firstCar);


    var gearboxUp = function(){
        if(gearbox == 0) {
            rpm = 3000;
        }
        if(gearbox == 1) {
            rpmResolve = rpm - (speed/(0.377*0.28/firstCar.gp/firstCar.gear2));
        }
        if(gearbox == 2) {
            rpmResolve = rpm - (speed/(0.377*0.28/firstCar.gp/firstCar.gear3));
        }
        if(gearbox == 3) {
            rpmResolve = rpm - (speed/(0.377*0.28/firstCar.gp/firstCar.gear4));
        }
        if(gearbox == 4) {
            rpmResolve = rpm - (speed/(0.377*0.28/firstCar.gp/firstCar.gear5));
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
        indexkpd = (firstCar.hp/firstCar.weight)*92;
    var resetRPM;
    var startRace = function() {
        start_timer();
        var startRaceInterval = setInterval(
            function () {

                var gearnumber = 0;
                //var kpd = firstCar.hp/firstCar.weight/2.5;


                if(rpm < 2000) {
                    kpd = indexkpd/1.5;
                }
                else if(rpm < 3000) {
                    kpd = indexkpd/1;
                }
                else if(rpm < 3500) {
                    kpd = indexkpd/2.2;
                }
                else if(rpm < 4000) {
                    kpd = indexkpd/2.4;
                }
                else if(rpm < 4500) {
                    kpd = indexkpd/2.6;
                }
                else if(rpm < 5000) {
                    kpd = indexkpd/2.4;
                }
                else if(rpm < 5500) {
                    kpd = indexkpd/2.2;

                }
                else if(rpm < 6000){
                    kpd = indexkpd/2;
                }
                else if(rpm < 6500){
                    kpd = indexkpd/5;
                    gearboxUp();
                }
                else if(rpm < 6750){
                }
                else if(rpm < 7000){
                    kpd = indexkpd/7;

                }

                console.log("time", time);
                if(rpm > firstCar.maxrpm) {
                    rpm = firstCar.maxrpm - 150;
                }
                if(gearbox == 0) {
                    if(rpm > 3500) {
                        rpm = 3500;
                    }
                    rpm = rpm + rpm/75;
                }
                if(gearbox == 1) {
                    speed = 0.377*0.28/firstCar.gp/firstCar.gear1*rpm;
                    rpm = rpm + (kpd*firstCar.gp*firstCar.gear1*2);
                }
                if(gearbox == 2) {
                    speed = 0.377*0.28/firstCar.gp/firstCar.gear2*rpm;
                    rpm = rpm + (kpd*firstCar.gp*firstCar.gear2*1.7);
                }
                if(gearbox == 3) {
                    speed = 0.377*0.28/firstCar.gp/firstCar.gear3*rpm;
                    rpm = rpm + (kpd*firstCar.gp*firstCar.gear3*1.4);
                }
                if(gearbox == 4) {
                    speed = 0.377*0.28/firstCar.gp/firstCar.gear4*rpm;
                    rpm = rpm + (kpd*firstCar.gp*firstCar.gear4*1.1);
                }
                if(gearbox == 5) {
                    speed = 0.377*0.28/firstCar.gp/firstCar.gear5*rpm;
                    rpm = rpm + (kpd*firstCar.gp*firstCar.gear5);
                }

                if(speed < 100 ) {
                    $('#speed b').html(time);
                }
                if (rpm > 6500) {

                } else {
                    startAuto(speed/150);
                    speedRound = speedRound + speed/150;
                }

                console.log("speed", speed);
                console.log("speedRound", speedRound);
                speedMS = speed*0.277777777777778;
                console.log("speedMS", speedMS);
                distance = distance + speedMS/10 ;
                console.log("distance", distance);
                if(distance > 1000) {
                    stopRace();
                    clearInterval(startRaceInterval);
                }
                tachometer();
                console.log("gp", firstCar.gp);
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
            if(speedRoundCount < 50) {
                startAuto(speedRound/-50);
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

            $(".b-peugeot__wheel, .b-ford__wheel").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
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