$(document).ready(function() {

    var settings = {
        distance: '400'
    };

    // Библиотека автомобилей

    var peugeot206 = {
        name: 'Peugeot 206 RC 2.0',
        gp: 4.06,
        gear1: 3.42,
        gear2: 1.81,
        gear3: 1.28,
        gear4: 0.98,
        gear5: 0.77,
        hp: 177,
        weight: 1150,
        maxrpm: 7000,
        kpd: 0,
        indexkpd: 18
    };

    var fordFocus = {
        name:'Ford Focus ST 2.0 EcoBoost',
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
        indexkpd: 16.5
    };

    // Характеристики игровых автомобилей

    var firstCar = {
        type: 'firstCar',
        speed: 0,
        gearbox: 0,
        time: 0,
        distance: 0,
        rpm: 750,
        rpmResolve: 0,
        speedRound: 0
    };
    var secondCar = {
        type: 'secondCar',
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

    // Трансмиссия. Повышение передач

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
            if (car.type === "firstCar") {
                gearboxUpdate();
            }
            car.rpm = car.rpm - car.rpmResolve;
        }
        console.log('up gearbox ' + car.name);
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



    // начало гонки


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
                    if(car.gearbox < 5) {
                        if (car.type === "secondCar") {
                            gearboxUp(secondCar);
                        }
                    }
                }
                else if(car.rpm < 6000){
                    car.kpd = car.indexkpd/2;
                }
                else if(car.rpm < 6500){
                    car.kpd = car.indexkpd/5;
                    //if(car.gearbox < 5) {
                    //    if (car.type === "firstCar") {
                    //        gearboxUp(firstCar);
                    //        console.log('up gearbox ' + car.name);
                    //    }
                    //    if (car.type === "secondCar") {
                    //        gearboxUp(secondCar);
                    //        console.log('up gearbox ' + car.name);
                    //    }
                    //}
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



                car.time = car.time + 0.1;
                car.speedMS = car.speed*0.277777777777778;
                car.distance = car.distance + car.speedMS/10;

                if(car.distance > settings.distance) {
                    stopRace(car);
                    clearInterval(startRaceInterval);
                }
                tachometer();

                if (car.type === "firstCar") {
                    if(car.speed < 100 ) {
                        $('#speed b').html(Number((car.time).toFixed(3)));
                    }
                    segDisplay.value(car.speed);
                    gauge.value(car.rpm/1000);
                    $('#secondCar').animate({"margin-left": (firstCar.distance-secondCar.distance)*25},100);
                }
            },
            100
        );
    };
    var stopRace = function (car) {
        console.log("Гонка завершена!!!!!!!, ваше время: " + Number((car.time).toFixed(3)) + " - " + car.name);
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

    $("#start").click(function(){
        gearboxUp(firstCar);
        gearboxUp(secondCar);
        setTimeout(function(){startRace(firstCar)},20);
        startRace(secondCar);
    });
});