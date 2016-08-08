var pigpio = require('pigpio'),
    Gpio = pigpio.Gpio,
    Notifier = pigpio.Notifier,
    m1_pwm,
    m1_A,
    m1_B,
    m2_pwm,
    m2_A,
    m2_B,
// enc1_notifier,
    enc_1,
    dutyCycle = 100;

const numberOfTicksPerRound = 82;
const perimeterMM = 188;
var ENC_GPIO = 16;

var distanceCM = 100;

pigpio.configureClock(5, pigpio.CLOCK_PCM);

m1_A = new Gpio(17, {mode: Gpio.OUTPUT});
m1_B = new Gpio(2, {mode: Gpio.OUTPUT});
m1_pwm = new Gpio(13, {mode: Gpio.OUTPUT});

m2_A = new Gpio(27, {mode: Gpio.OUTPUT});
m2_B = new Gpio(3, {mode: Gpio.OUTPUT});
m2_pwm = new Gpio(12, {mode: Gpio.OUTPUT});

var tickCount = 0;

enc_1 = new Gpio(ENC_GPIO,
    {
        mode: Gpio.INPUT,
        alert: true
    });

const limit = distanceCM * 10 / perimeterMM * numberOfTicksPerRound;

(function () {
    enc_1.on('alert', function (level, tick) {
        if(level == 1) {
            tickCount++;
        }

        if(tickCount >= limit) {
            m1_A.digitalWrite(1);
            m1_B.digitalWrite(0);
            m1_pwm.pwmWrite(0);

            m2_A.digitalWrite(0);
            m2_B.digitalWrite(1);
            m2_pwm.pwmWrite(0);
            console.log(tickCount);
            console.log(limit)
        }
    });
}());


m1_A.digitalWrite(0);
m1_B.digitalWrite(1);
m1_pwm.pwmWrite(dutyCycle);

m2_A.digitalWrite(1);
m2_B.digitalWrite(0);
m2_pwm.pwmWrite(dutyCycle);
