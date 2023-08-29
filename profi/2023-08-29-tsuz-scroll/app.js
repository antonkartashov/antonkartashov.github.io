Framer.CurrentContext.backgroundColor = 'rgba(0, 0, 0, 0)';

// let pageColor = new BackgroundLayer ({
//   backgroundColor: '#0a0a0a'
// });

let screen = new Layer ({
  width: 375, height: 812,
  x: Align.center(),
  y: Align.center(),
  scale: Screen.height / 812 * 0.9,
  backgroundColor: '#444751',
  clip: true,
  borderRadius: 40
});

let white = new Layer ({
  parent: screen,
  width: 375, height: 375,
  x: Align.center(),
  y: Align.bottom(),
  backgroundColor: 'white'
});

let scroll = new ScrollComponent({
  parent: screen,
  width: 375, height: 812 - 124,
  y: 124,
  backgroundColor: 'white',
  clip: true,
  borderRadius: 32,
  scrollHorizontal: false,
  backgroundColor: null
});

let layer = new Layer({
  image: 'images/scrollcontent.png',
  width: 375, height: 1551,
  parent: scroll.content
});

let gradient = new Layer({
  parent: screen,
  width: 375, height: 200,
  image: 'images/gradient.png',
  y: 812 - 200
})

gradient.states = {
  'big': {y: 812 - 200, opacity: 1},
  'small': {y: 812, opacity: 0},
  animationOptions: {time: .5}
}

let tsuz = new Layer({
  parent: screen,
  x: 69, y: Align.bottom(-34),
  width: 246, height: 52,
  backgroundColor: '#181818',
  borderRadius: 52 / 2,
  clip: true
});

tsuz.states = {
  'big': {width: 246, x: 69},
  'small': {width: 52, x: 307},
  animationOptions: {curve: 'spring(100, 15, 0)'}
}

let tsuzText = new Layer({
  parent: tsuz,
  image: 'images/tsuz-text.png',
  width: 246, height: 52
});

tsuzText.states = {
  'big': {x: 0, opacity: 1},
  'small': {x: 0, opacity: 0},
  animationOptions: {curve: 'spring(100, 15, 0)'}
}

let tsuzIcon = new Layer({
  size: 52,
  parent: tsuz,
  image: 'images/tsuz-icon.png',
  x: 6
});

tsuzIcon.states = {
  'big': {x: 6},
  'small': {x: 0}
}

let index = 0;
let direction = 'down';

scroll.content.onMove(function(e) {
  if (scroll.content.draggable.velocity.y > 0) {
    if (direction == 'down') {index = 0};
    direction = 'up';
  } else if (scroll.content.draggable.velocity.y < 0) {
    if (direction == 'up') {index = 0};
    direction = 'down';

  };

  // print(scroll.content.y);
  if (scroll.content.y < -20 && scroll.content.y > -860) {
    index += 1;
  }

  if (direction == 'down' && index == 10) {
    tsuz.animate('small');
    tsuzText.animate('small');
    tsuzIcon.animate('small');
    gradient.animate('small');
  }

  if ((direction == 'up' && index == 30) || (scroll.content.y >= -20)) {
    if (tsuz.states.current.name != 'big') {
      tsuz.animate('big');
      tsuzText.animate('big');
      tsuzIcon.animate('big');
      gradient.animate('big');
    }
  }
})




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
