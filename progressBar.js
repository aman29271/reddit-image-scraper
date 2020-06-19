const EventEmitter = require('events');
const os = require('os');
const progressEvent = new EventEmitter();

progressEvent.on('data', () => {});

progressEvent.once('init', init);

progressEvent.on('data', () => {
  process.stdout.write('#');
});

progressEvent.once('end', () => {
  process.stdout.write(']');
  process.stdout.write(os.EOL);
});

function init() {
  process.stdout.write('[');
}

function emitFn() {
  progressEvent.emit('init');
  progressEvent.emit('data');
}

function endStream() {
  progressEvent.emit('end');
}

module.exports.emit = emitFn;
module.exports.end = endStream;
