$(document).ready(function() {

    // Библиотека автомобилей

    var peugeot206 = {
        gp: 4.06,
        gear1: 3.42,
        gear2: 1.81,
        gear3: 1.28,
        gear4: 0.98,
        gear5: 0.77,
        hp: 450,
        weight: 1150,
        maxrpm: 7000,
        kpd: 0,
        indexkpd: 12
    };

    var fordFocus = {
        gp: 4.06,
        gear1: 3.42,
        gear2: 1.81,
        gear3: 1.28,
        gear4: 0.98,
        gear5: 0.77,
        hp: 250,
        weight: 1150,
        maxrpm: 7000,
        kpd: 0,
        indexkpd: 12
    };

    // Характеристики игровых автомобилей

    var firstCar = {
        name: 'firstCar',
        speed: 0,
        gearbox: 0,
        time: 0,
        distance: 0,
        rpm: 750,
        rpmResolve: 0,
        speedRound: 0
    };
    var secondCar = {
        name: 'secondCar',
        speed: 0,
        gearbox: 0,
        time: 0,
        distance: 0,
        rpm: 750,
        rpmResolve: 0,
        speedRound: 0
    };

    $.extend(firstCar, peugeot206);
    $.extend(secondCar, fordFocus);

    console.log(firstCar);
    console.log(secondCar);

    // Повышение передач

    var gearboxUp = function(car){
        if(car.gearbox == 0) {
            car.rpm = 3000;
        }

        if(car.gearbox == 1) {
            car.rpmResolve = car.rpm - (car.speed/(0.377*0.28/car.gp/car.gear2));
        }
        if(car.gearbox == 2) {
            car.rpmResolve = car.rpm - (car.speed/(0.377*0.28/car.gp/car.gear3));
        }
        if(car.gearbox == 3) {
            car.rpmResolve = car.rpm - (car.speed/(0.377*0.28/car.gp/car.gear4));
        }
        if(car.gearbox == 4) {
            car.rpmResolve = car.rpm - (car.speed/(0.377*0.28/car.gp/car.gear5));
        }
        if(car.gearbox < 5) {
            car.gearbox = car.gearbox + 1;
            if (car.name === "firstCar") {
                gearboxUpdate();
            }
            car.rpm = car.rpm - car.rpmResolve;
        }
        console.log(firstCar);
        console.log(secondCar);
    };

    $(document).keyup(function(event){
        if (event.keyCode == 38) {
            gearboxUp(firstCar);
        }
    });
    $(document).keyup(function(event){
        if (event.keyCode == 39) {
            gearboxUp(secondCar);
        }
    });

    var gearboxUpdate = function() {
        $('#gearbox b').html(firstCar.gearbox);
    };
    gearboxUpdate();







    var startRace = function(car) {
        var startRaceInterval = setInterval(
            function () {
                if(car.rpm < 2000) {
                    car.kpd = car.indexkpd/1.5;
                }
                else if(car.rpm < 3000) {
                    car.kpd = car.indexkpd;
                }
                else if(car.rpm < 3500) {
                    car.kpd = car.indexkpd/2.2;
                }
                else if(car.rpm < 4000) {
                    car.kpd = car.indexkpd/2.4;
                }
                else if(car.rpm < 4500) {
                    car.kpd = car.indexkpd/2.6;
                }
                else if(car.rpm < 5000) {
                    car.kpd = car.indexkpd/2.4;
                }
                else if(car.rpm < 5500) {
                    car.kpd = car.indexkpd/2.2;

                }
                else if(car.rpm < 6000){
                    car.kpd = car.indexkpd/2;
                }
                else if(car.rpm < 6500){
                    car.kpd = car.indexkpd/5;
                    if (car.name === "secondCar") {
                        gearboxUp(secondCar);
                        console.log('up gearbox ford');
                    }

                }
                else if(car.rpm < 6750){
                }
                else if(car.rpm < 7000){
                    car.kpd = car.indexkpd/7;

                }

                if(car.rpm > car.maxrpm) {
                    car.rpm = car.maxrpm - 150;
                }
                if(car.gearbox == 0) {
                    if(car.rpm > 3500) {
                        car.rpm = 3500;
                    }
                    car.rpm = car.rpm + car.rpm/75;
                }
                if(car.gearbox == 1) {
                    car.speed = 0.377*0.28/car.gp/car.gear1*car.rpm;
                    car.rpm = car.rpm + (car.kpd*car.gp*car.gear1*2);
                }
                if(car.gearbox == 2) {
                    car.speed = 0.377*0.28/car.gp/car.gear2*car.rpm;
                    car.rpm = car.rpm + (car.kpd*car.gp*car.gear2*1.7);
                }
                if(car.gearbox == 3) {
                    car.speed = 0.377*0.28/car.gp/car.gear3*car.rpm;
                    car.rpm = car.rpm + (car.kpd*car.gp*car.gear3*1.4);
                }
                if(car.gearbox == 4) {
                    car.speed = 0.377*0.28/car.gp/car.gear4*car.rpm;
                    car.rpm = car.rpm + (car.kpd*car.gp*car.gear4*1.1);
                }
                if(car.gearbox == 5) {
                    car.speed = 0.377*0.28/car.gp/car.gear5*car.rpm;
                    car.rpm = car.rpm + (car.kpd*car.gp*car.gear5);
                }

                if(car.speed < 100 ) {
                    $('#speed b').html(Math.round(car.time));
                }
                if (car.rpm > 6500) {

                } else {
                    startAuto(car.speed/150);
                    car.speedRound = car.speedRound + car.speed/150;
                }

                car.time = car.time + 0.1;
                car.speedMS = car.speed*0.277777777777778;
                car.distance = car.distance + car.speedMS/10;

                if(car.distance > 1000) {
                    stopRace(car);
                    clearInterval(startRaceInterval);
                }
                tachometer();

                if (car.name === "firstCar") {
                    segDisplay.value(car.speed);
                    gauge.value(car.rpm/1000);
                }
            },
            100
        );
    };
    var stopRace = function (car) {
        console.log("Гонка завершена!!!!!!!, ваше время: " + car.time);
        stop_timer();

        alert("Гонка завершена, вы прошли 400 м за " + car.time + " сек");
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

    gauge.value(firstCar.rpm/1000);


    var tachometer = function() {
        $('#tachometer b').html(Math.round(firstCar.rpm));
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
        startRace(firstCar);
        startRace(secondCar);
        gearboxUp(firstCar);
        gearboxUp(secondCar);
        //startAuto(10);
        //speedRound = 10;


    });
    $("#stop").click(function(){
        //var speedAuto = -15;
        //startAuto(speedAuto);
        //$(".b-peugeot").animate({"margin-left": "+=150px"}, 100);
        //stop_timer();
    });



    var sdegree = 1;

    var startAuto = function(speed) {
        setInterval(function() {
            sdegree = sdegree - speed;
            //console.log("sdegree", sdegree);
            //console.log("speed", speed);
            //var srotate = "rotate(" + sdegree + "deg)";

            //$(".b-peugeot__wheel, .b-ford__wheel").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
            //$(".b-content").css({"background-position-x" : -sdegree/2});

        }, 10 );
    };
});