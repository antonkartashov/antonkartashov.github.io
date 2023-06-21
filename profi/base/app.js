Framer.CurrentContext.backgroundColor = 'rgba(0, 0, 0, 0)';

// let pageColor = new BackgroundLayer ({
//   backgroundColor: '#0a0a0a'
// });

let screen = new Layer ({
  width: 375, height: 812,
  x: Align.center(),
  y: Align.center(),
  scale: Screen.height / 812 * 0.9,
  // scale: 1, y: 50,
  backgroundColor: '#818187',
  backgroundColor: 'tomato',
  clip: true,
  borderRadius: 40
});


/* Phone */

let iPhone14 = new Layer ({
  image: 'images/iphone-14-display-shape.png',
  width: screen.width + 84 - 4,
  height: screen.height + 84 - 4,
  y: Align.center(0),
  scale: screen.scale,
  // scale: 1, y: 10,
  // opacity: .2,
  x: Align.center()
});

// let iPhoneX = new Layer ({
//   image: 'images/iphone-x-display-shape.png',
//   width: screen.width + 88 - 4 - 6,
//   height: screen.height + 88 - 4 - 6,
//   y: Align.center(0),
//   scale: screen.scale,
//   // scale: 1, y: 10,
//   // opacity: .2,
//   x: Align.center()
// });

let statusBar = new StatusBar ({
  device: 'iPhone 14',
  mode: 'white'
});

let homeIndicator = new Layer ({
  parent: screen,
  width: 135, height: 5,
  backgroundColor: 'black',
  borderRadius: 100,
  x: Align.center(),
  y: 812 - 10 - 5
});

// let grabber = new Layer ({
//   width: 41, height: 5,
//   opacity: .5, backgroundColor: '#D0D3DD',
//   parent: screen,
//   borderRadius: 20,
//   y: 54 + 15, x: Align.center()
// });
