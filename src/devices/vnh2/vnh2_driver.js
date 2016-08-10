var pigpio = require('pigpio');
var VNH2MotorModule = require('./vnh2_motor_module.js');
var Gpio = pigpio.Gpio;

function VNH2Driver() {
    VNH2Driver.prototype.attach = function(motor1Pinout, motor2Pinout) {
        console.log("Attaching VNH2 driver to GPIO");
        this.motorLeft = new VNH2MotorModule(motor1Pinout);
        this.motorRight = new VNH2MotorModule(motor2Pinout);
    };

    VNH2Driver.prototype.move = function(movement) {
        var direction = movement.direction;
        var speed = movement.speed;

        this.motorLeft.move(movement);
        this.motorRight.move(movement);
    };
}

module.exports = VNH2Driver;