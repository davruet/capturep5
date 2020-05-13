
import defaultExport from 'ccapture.js'

console.log("Loading captureP5.js. Toggle recording with the r key.");


window.capture = {
  recording: false,
  toggleRecordingState: false
  
};

window.capture.initCapture = function initCapture(params) { // Wrap window.draw() with a custom function
  var context = window; // FIXME for instance mode

  var userDraw = context.draw;

  let capturer = new CCapture(params);

  let captureDraw = function() {
    if (window.capture.toggleRecordingState) {
      window.capture.toggleRecordingState = false;
      if (!window.capture.recording) {
        capturer.start();
        window.capture.recording = true;
      } else {
        capturer.stop();
        capturer.save();
        window.capture.recording = false;
      }
    }
    userDraw();
    capturer.capture(document.getElementById('defaultCanvas0'));
  }

  context.draw = captureDraw;
};


document.addEventListener('keypress', (evt) => {
  console.dir(evt);
  if (evt.key === 'r') {
    window.capture.toggleRecordingState = true;
  }
});