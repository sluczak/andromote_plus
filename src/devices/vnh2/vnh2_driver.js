var pigpio = require('pigpio');
var VNH2MotorModule = require('./vnh2_motor_module.js');
var Gpio = pigpio.Gpio;

function VNH2Driver() {
    console.log("VNH2 Driver ready to be attached");
    VNH2Driver.prototype.attach = function(motorPinout) {
        console.log("Attaching VNH2 driver to GPIO -=");
        console.log(motorPinout.motor1Pinout);
        console.log(motorPinout.motor2Pinout);
        this.motorLeft = new VNH2MotorModule(motorPinout.motor1Pinout);
        this.motorRight = new VNH2MotorModule(motorPinout.motor2Pinout);
    };

    VNH2Driver.prototype.move = function(movement) {
        var direction = movement.direction;
        var speed = movement.speed;
        switch(direction) {
            case 'forward':
            case 'backward':
                this.motorLeft.spin(speed, direction);
                this.motorRight.spin(speed, direction);
                break;
            case 'left':
                this.motorLeft.spin(speed, 'backward');
                this.motorRight.spin(speed, 'forward');
                break;
            case 'right':
                this.motorLeft.spin(speed, 'forward');
                this.motorRight.spin(speed, 'backward');
                break;
            default:
                this.motorLeft.spin(speed);
                this.motorRight.spin(speed);
        }
    };

    VNH2Driver.prototype.stop = function() {
        this.motorLeft.spin(0);
        this.motorRight.spin(0);
    }
}

module.exports = VNH2Driver;