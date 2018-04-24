var pigpio = require('pigpio');
var PololuMotorModule = require('./pololu_motor_module.js');
var Gpio = pigpio.Gpio;

function PololuDriver() {
    console.log("Pololu Driver ready to be attached");
    PololuDriver.prototype.attach = function(motorPinout) {
        console.log("Attaching Pololu driver to GPIO -=");
        console.log(motorPinout.motor1Pinout);
        console.log(motorPinout.motor2Pinout);
        this.motorLeft = new PololuMotorModule(motorPinout.motor1Pinout);
        this.motorRight = new PololuMotorModule(motorPinout.motor2Pinout);
    };

    PololuDriver.prototype.move = function(movement) {
        var direction = movement.direction;
        var speed = movement.speed;
        switch(direction) {
            case 'forward':
                this.motorLeft.spin(speed, 'f');
                this.motorRight.spin(speed, 'b');
                break;
            case 'backward':
                this.motorLeft.spin(speed, 'b');
                this.motorRight.spin(speed, 'f');
                break;
            case 'left':
                this.motorLeft.spin(speed, 'f');
                this.motorRight.spin(speed, 'f');
                break;
            case 'right':
                this.motorLeft.spin(speed, 'b');
                this.motorRight.spin(speed, 'b');
                break;
            default:
                this.motorLeft.spin(speed);
                this.motorRight.spin(speed);
        }
    };

    PololuDriver.prototype.stop = function() {
        this.motorLeft.spin(0);
        this.motorRight.spin(0);
    }
}

module.exports = PololuDriver;