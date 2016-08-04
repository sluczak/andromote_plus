var rpio = require('rpio');

var OnOff = require('onoff').Gpio,
    input = new OnOff(24, 'in', 'both');

var options = {
    gpiomem: false,
    mapping: 'physical'
};

input.watch(function (err, value) {
    if (err) {
        console.log("err");
        throw err;
    }

    console.log("zmiana " + value);
});


console.log("init");
rpio.init(options);

rpio.open(11, rpio.OUTPUT, rpio.HIGH);
rpio.open(3, rpio.OUTPUT, rpio.LOW);

rpio.open(13, rpio.OUTPUT, rpio.LOW);
rpio.open(5, rpio.OUTPUT, rpio.HIGH);
console.log("open");
// rpio.open(24, rpio.INPUT, rpio.PULL_DOWN);
// rpio.poll(24, readValues);

rpio.open(33, rpio.PWM);
rpio.open(32, rpio.PWM);
//
rpio.pwmSetClockDivider(4);
//
rpio.pwmSetRange(33, 100);
rpio.pwmSetRange(32, 100);
//
rpio.pwmSetData(33, 50);
rpio.pwmSetData(32, 50);

// function readValues() {
//     console.log("val: " + rpio.read(24));
// }



console.log("PWM");
rpio.sleep(2);
console.log("Change");
rpio.open(11, rpio.OUTPUT, rpio.LOW);
rpio.open(3, rpio.OUTPUT, rpio.HIGH);

rpio.sleep(2);
console.log("Close");

rpio.close(11);
rpio.close(3);
rpio.close(33);
rpio.close(13);
rpio.close(5);
rpio.close(32);
rpio.close(26);

process.on('SIGINT', function () {
    input.unexport();
});