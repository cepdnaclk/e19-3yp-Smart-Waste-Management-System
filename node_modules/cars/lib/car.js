const _ = require("lodash");

const CARS = {
    au: "Holden Ute",
    in: "Hindustan Ambassador",
    en: "Range Rover",
    ru: "Lada Niva",
    ge: "Mercedes-Benz 600",
    it: "Alfa Romeo Giulia",
    sw: "Volvo 240 Wagon",
    am: "Ford GT/GT40"
};

exports.car = function (code) {
    if (code) {
        
        if (!CARS[code]) {
            return "sorry! We dont have any answer for this.";
        }
        else {
            return CARS[code];
        }
    }
    else {
        return CARS['in'];
    }
}


exports.carRandom = function () {
    return _.sample(_.values(CARS));
}