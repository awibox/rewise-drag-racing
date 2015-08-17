$(document).ready(function() {

    // Библиотека автомобилей

    var peugeot206 = {
        name: 'Peugeot 206 2.0',
        gp: 4.06,
        gear1: 3.42,
        gear2: 1.81,
        gear3: 1.28,
        gear4: 0.98,
        gear5: 0.77,
        hp: 650,
        weight: 1150,
        maxrpm: 7000,
        kpd: 0,
        indexkpd: 24
    };

    var fordFocus = {
        name:'Ford Focus 2.0',
        gp: 4.06,
        gear1: 3.42,
        gear2: 1.81,
        gear3: 1.28,
        gear4: 0.98,
        gear5: 0.77,
        hp: 100,
        weight: 1150,
        maxrpm: 7000,
        kpd: 0,
        indexkpd: 22
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


    var startRace = function() {
        var startRaceInterval = setInterval(
            function () {
                // Двигатель первой машины
                if(firstCar.rpm < 2000) {
                    firstCar.kpd = firstCar.indexkpd/1.5;
                }
                else if(firstCar.rpm < 3000) {
                    firstCar.kpd = firstCar.indexkpd;
                }
                else if(firstCar.rpm < 3500) {
                    firstCar.kpd = firstCar.indexkpd/2.2;
                }
                else if(firstCar.rpm < 4000) {
                    firstCar.kpd = firstCar.indexkpd/2.4;
                }
                else if(firstCar.rpm < 4500) {
                    firstCar.kpd = firstCar.indexkpd/2.6;
                }
                else if(firstCar.rpm < 5000) {
                    firstCar.kpd = firstCar.indexkpd/2.4;
                }
                else if(firstCar.rpm < 5500) {
                    firstCar.kpd = firstCar.indexkpd/2.2;
                }
                else if(firstCar.rpm < 6000){
                    firstCar.kpd = firstCar.indexkpd/2;
                }
                else if(firstCar.rpm < 6500){
                    firstCar.kpd = firstCar.indexkpd/5;
                    if(firstCar.gearbox < 5) {
                        gearboxUp(firstCar);
                    }
                }
                else if(firstCar.rpm < 6750){
                }
                else if(firstCar.rpm < 7000){
                    firstCar.kpd = firstCar.indexkpd/7;
                }

                // Двигатель второй машины
                if(secondCar.rpm < 2000) {
                    secondCar.kpd = secondCar.indexkpd/1.5;
                }
                else if(secondCar.rpm < 3000) {
                    secondCar.kpd = secondCar.indexkpd;
                }
                else if(secondCar.rpm < 3500) {
                    secondCar.kpd = secondCar.indexkpd/2.2;
                }
                else if(secondCar.rpm < 4000) {
                    secondCar.kpd = secondCar.indexkpd/2.4;
                }
                else if(secondCar.rpm < 4500) {
                    secondCar.kpd = secondCar.indexkpd/2.6;
                }
                else if(secondCar.rpm < 5000) {
                    secondCar.kpd = secondCar.indexkpd/2.4;
                }
                else if(secondCar.rpm < 5500) {
                    secondCar.kpd = secondCar.indexkpd/2.2;
                }
                else if(secondCar.rpm < 6000){
                    secondCar.kpd = secondCar.indexkpd/2;
                }
                else if(secondCar.rpm < 6500){
                    secondCar.kpd = secondCar.indexkpd/5;
                    if(secondCar.gearbox < 5) {
                        gearboxUp(secondCar);
                    }
                }
                else if(secondCar.rpm < 6750){
                }
                else if(secondCar.rpm < 7000){
                    secondCar.kpd = secondCar.indexkpd/7;
                }

                // Максимальные обороты

                if(firstCar.rpm > firstCar.maxrpm) {
                    firstCar.rpm = firstCar.maxrpm - 150;
                }
                if(secondCar.rpm > secondCar.maxrpm) {
                    secondCar.rpm = secondCar.maxrpm - 150;
                }
                // коробка первой машины
                if(firstCar.gearbox == 0) {
                    if(firstCar.rpm > 3500) {
                        firstCar.rpm = 3500;
                    }
                    firstCar.rpm = firstCar.rpm + firstCar.rpm/75;
                }
                if(firstCar.gearbox == 1) {
                    firstCar.speed = 0.377*0.28/firstCar.gp/firstCar.gear1*firstCar.rpm;
                    firstCar.rpm = firstCar.rpm + (firstCar.kpd*firstCar.gp*firstCar.gear1*2);
                }
                if(firstCar.gearbox == 2) {
                    firstCar.speed = 0.377*0.28/firstCar.gp/firstCar.gear2*firstCar.rpm;
                    firstCar.rpm = firstCar.rpm + (firstCar.kpd*firstCar.gp*firstCar.gear2*1.7);
                }
                if(firstCar.gearbox == 3) {
                    firstCar.speed = 0.377*0.28/firstCar.gp/firstCar.gear3*firstCar.rpm;
                    firstCar.rpm = firstCar.rpm + (firstCar.kpd*firstCar.gp*firstCar.gear3*1.4);
                }
                if(firstCar.gearbox == 4) {
                    firstCar.speed = 0.377*0.28/firstCar.gp/firstCar.gear4*firstCar.rpm;
                    firstCar.rpm = firstCar.rpm + (firstCar.kpd*firstCar.gp*firstCar.gear4*1.1);
                }
                if(firstCar.gearbox == 5) {
                    firstCar.speed = 0.377*0.28/firstCar.gp/firstCar.gear5*firstCar.rpm;
                    firstCar.rpm = firstCar.rpm + (firstCar.kpd*firstCar.gp*firstCar.gear5);
                }
                // коробка первой машины
                if(secondCar.gearbox == 0) {
                    if(secondCar.rpm > 3500) {
                        secondCar.rpm = 3500;
                    }
                    secondCar.rpm = secondCar.rpm + secondCar.rpm/75;
                }
                if(secondCar.gearbox == 1) {
                    secondCar.speed = 0.377*0.28/secondCar.gp/secondCar.gear1*secondCar.rpm;
                    secondCar.rpm = secondCar.rpm + (secondCar.kpd*secondCar.gp*secondCar.gear1*2);
                }
                if(secondCar.gearbox == 2) {
                    secondCar.speed = 0.377*0.28/secondCar.gp/secondCar.gear2*secondCar.rpm;
                    secondCar.rpm = secondCar.rpm + (secondCar.kpd*secondCar.gp*secondCar.gear2*1.7);
                }
                if(secondCar.gearbox == 3) {
                    secondCar.speed = 0.377*0.28/secondCar.gp/secondCar.gear3*secondCar.rpm;
                    secondCar.rpm = secondCar.rpm + (secondCar.kpd*secondCar.gp*secondCar.gear3*1.4);
                }
                if(secondCar.gearbox == 4) {
                    secondCar.speed = 0.377*0.28/secondCar.gp/secondCar.gear4*secondCar.rpm;
                    secondCar.rpm = secondCar.rpm + (secondCar.kpd*secondCar.gp*secondCar.gear4*1.1);
                }
                if(secondCar.gearbox == 5) {
                    secondCar.speed = 0.377*0.28/secondCar.gp/secondCar.gear5*secondCar.rpm;
                    secondCar.rpm = secondCar.rpm + (secondCar.kpd*secondCar.gp*secondCar.gear5);
                }



                firstCar.time = firstCar.time + 0.1;
                secondCar.time = secondCar.time + 0.1;
                firstCar.speedMS = firstCar.speed*0.277777777777778;
                secondCar.speedMS = secondCar.speed*0.277777777777778;
                firstCar.distance = firstCar.distance + firstCar.speedMS/10;
                secondCar.distance = secondCar.distance + secondCar.speedMS/10;
                var strartRaceStop = 0;
                if(firstCar.distance > 1000) {

                    stopRace(firstCar);
                    firstCar.distance = 1000;
                    if(strartRaceStop === 1) {
                        clearInterval(startRaceInterval);
                    } else {
                        strartRaceStop = strartRaceStop + 1;
                    }

                }
                if(secondCar.distance > 1000) {
                    stopRace(secondCar);
                    secondCar.distance = 1000;
                    if(strartRaceStop === 1) {
                        clearInterval(startRaceInterval);
                    } else {
                        strartRaceStop = strartRaceStop + 1;
                    }
                }
                tachometer();

                if (firstCar.type === "firstCar") {
                    if(firstCar.speed < 100 ) {
                        $('#speed b').html(Number((firstCar.time).toFixed(3)));
                    }
                    segDisplay.value(firstCar.speed);
                    gauge.value(firstCar.rpm/1000);
                    $('#secondCar').animate({"margin-left": (firstCar.distance-secondCar.distance)*50},300);
                }
            },
            100
        );
    };


    var stopRace = function (car) {
        console.log(firstCar);
        console.log(secondCar);
        console.log("Гонка завершена!!!!!!!, ваше время: " + car.time + " - " + car.name);
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
        gearboxUp(secondCar);
        gearboxUp(firstCar);
        startRace();
    });
});