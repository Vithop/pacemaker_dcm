// console.log("hello World");

// const SerialPort = require('serialport');

// SerialPort.list((err, ports_1) => {
//     console.log(ports_1)                
// })

// const port = new SerialPort('USB\VID_2341&PID_0043\64935343433351F090E0')

// port.write('main screen turn on', function(err) {
//   if (err) {
//     return console.log('Error on write: ', err.message)
//   }
//   console.log('message written')
// })

// // Open errors will be emitted as an error event
// port.on('error', function(err) {
//   console.log('Error: ', err.message)
// })

const SerialPort = require('serialport');

SerialPort.list((err, ports) => {
  if (err) {
    return console.log(err);
  }

  ports.forEach((path) => {
    console.log(path);

    let { comName } = path;

    const port = new SerialPort(comName, {
      baudRate: 9600
    }, console.log);

    port.on('data', console.log);
  });
});