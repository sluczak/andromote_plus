function Wheel() {
    console.log("Wheel ready to be attached");

    Wheel.prototype.attach = function(params) {
        console.log("Attaching Wheel " + params.diameter + "mm to Andromote");
        this.diameter = params.diameter;
    }

    Wheel.prototype.getPerimeter = function() {
        return this.diameter * Math.PI;
    }
}

module.exports = Wheel;
