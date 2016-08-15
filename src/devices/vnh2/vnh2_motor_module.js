var pigpio = require('pigpio');
var Gpio = pigpio.Gpio;

const MIN_SPEED = 40;
const MAX_SPEED = 200;

function VNH2MotorModule(pinout) {
    this.signalA = new Gpio(pinout.pinA, {mode: Gpio.OUTPUT});
    this.signalB = new Gpio(pinout.pinB, {mode: Gpio.OUTPUT});
    this.signalPWM = new Gpio(pinout.pinPWM, {mode: Gpio.OUTPUT});

    var self = this;
    process.on('SIGINT', function () {
        self.signalPWM.pwmWrite(0);
        process.exit(2);
    });

    process.on('exit', function() {
        self.signalPWM.pwmWrite(0);
    });

    process.on('uncaughtException', function(e) {
        console.log('Uncaught Exception...');
        console.log(e.stack);
        self.signalPWM.pwmWrite(0);
        process.exit(99);
    });

    VNH2MotorModule.prototype.spin = function spin(speed, direction) {
        if(direction != null) {
            applyDirection.call(this);
        }
        try {
            if(speed != null) {
                this.signalPWM.pwmWrite(toDutyCycle(speed));
            }
        } catch(err) {
            console.log("Speed is not from range 0-1")
        }

        function applyDirection() {
            switch (direction) {
                case 'forward' :
                    this.signalA.digitalWrite(1);
                    this.signalB.digitalWrite(0);
                    break;
                case 'backward' :
                    this.signalA.digitalWrite(0);
                    this.signalB.digitalWrite(1);
            }
        }

        function toDutyCycle(speed) {
            if(0 < speed && speed < 1) {
                var fullPowerDutyCycle = MAX_SPEED - MIN_SPEED;
                return speed * fullPowerDutyCycle + MIN_SPEED;
            } else if(speed === 0) {
                return 0;
            } else {
                throw err;  //TODO how to handle errors clearly
            }
        }
    }
}

module.exports = VNH2MotorModule;