Framer.CurrentContext.backgroundColor = 'rgba(0, 0, 0, 0)';

// let pageColor = new BackgroundLayer ({
//   backgroundColor: '#0a0a0a'
// });

let screen = new Layer ({
  width: 375, height: 812,
  x: Align.center(),
  y: Align.center(),
  scale: Screen.height / 812 * 0.9,
  backgroundColor: 'white',
  clip: true,
  borderRadius: 40
});

let scroll = new ScrollComponent ({
  parent: screen,
  width: 375, height: 812 - 56 - 24,
  y: 56 + 24,
  scrollHorizontal: false,
  // clip: false
});

let scrollcontent = new Layer ({
  parent: scroll.content,
  width: 375, height: 1172,
  image: 'images/scrollcontent.png'
});

let white = new Layer ({
  parent: screen,
  width: 375, height: 338,
  backgroundColor: 'white',
  opacity: 0
});

let header = new Layer ({
  width: 375, height: 146,
  image: 'images/header.png',
  parent: screen
});

let divider = new Layer ({
  parent: screen,
  // image: 'images/divider.png',
  width: 375, height: .5,
  backgroundColor: 'rgba(0, 0, 0, .15)',
  y: 338
});

let name = new Layer ({
  parent: screen,
  width: 375, height: 58,
  y: 88, x: 0,
  opacity: 0,
  image: 'images/name.png'
});

// name.states = {
//   'on': {
//     x: 0, opacity: 1,
//     animationOptions: {delay: .3}
//   },
//   'off': {
//     x: 20, opacity: 0,
//     animationOptions: {delay: 0}
//   }
// }

// name.animate('off');

scroll.content.onMove(function() {
  if (scroll.content.y > -192) {
    divider.y = Utils.modulate(scroll.content.y, [0, -192], [338, 146]);
    white.opacity = Utils.modulate(scroll.content.y, [-110, -160], [0, 1]);
    white.y = Utils.modulate(scroll.content.y, [0, -192], [0, -192]);
    name.opacity = Utils.modulate(scroll.content.y, [-130, -180], [0, 1]);
  } else {
    divider.y = 146;
    white.opacity = 1;
    white.y = -192;
    name.opacity = 1;
  };

  // if (scroll.content.y < -170) {
  //   if (name.states.current.name == 'off') {
  //     // white.animate({
  //     //   opacity: 1,
  //     //   animationOptions: {delay: 0}
  //     // });
  //     name.animate('on');
  //   };
  // };
  //
  // if (scroll.content.y > -170) {
  //   if (name.states.current.name == 'on') {
  //     // white.animate({
  //     //   opacity: 0,
  //     //   options: {delay: .3}
  //     // });
  //     name.animate('off');
  //   };
  // };

});

let button = new Layer ({
  width: 375, height: 250 + 8,
  parent: scroll.content,
  backgroundColor: null
});

let blackout = new Layer ({
  parent: screen,
  size: screen.size,
  backgroundColor: 'black',
  opacity: 0
});

let profile = new Layer ({
  parent: screen,
  width: 375, height: 812,
  image: 'images/profilescreen.png',
  borderRadius: 32,
  y: 812
});

button.onTap(function() {
  blackout.animate({
    opacity: .7
  });

  profile.animate({
    y: 56,
    options: {
      curve: 'spring(150, 25, 0)'
    }
  });
});

profile.onTap(function() {
  blackout.animate({
    opacity: 0
  });

  profile.animate({
    y: 812,
    options: {
      curve: 'ease-out',
      time: .3
    }
  });
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

statusBar.animate('black');

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
