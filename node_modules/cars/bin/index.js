#!/usr/bin/env node

const colors = require('colors');
const car = require("../lib/car");

var arguments = process.argv.splice(2);
var country = null;

if (arguments[0] == '--show') {
    
    country = arguments[1];
}



if (country) {
    console.log(
        colors.rainbow(
            car.car(country)
        )
    );
}
else {
    console.log(
        colors.rainbow(
            car.carRandom()
        )
    );
}