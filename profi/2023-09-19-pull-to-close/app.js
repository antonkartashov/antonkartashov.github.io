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
  backgroundColor: '#333',
  // backgroundColor: 'tomato',
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

scroll = new ScrollComponent ({
  parent: screen,
  width: 375, height: 700,
  y: 812 - 700,
  backgroundColor: 'white',
  borderRadius: 32,
  scrollHorizontal: false
});

for (let i = 0; i < 4; i++) {
  new Layer ({
    parent: scroll.content,
    y: i * 205 + 100,
    backgroundColor: Utils.randomColor(),
    opacity: .5,
    width: 375 - 20,
    x: 10,
    borderRadius: 20
  });
};

loader = new Layer({
  width: 0,
  height: 5,
  parent: scroll,
  backgroundColor: 'red'
})

let borderline = 120;

scroll.content.onMove(function() {
  // print(scroll.content.y);
  if (scroll.content.y > borderline) {
      if (scroll.y == 812 - 700) {
        scroll.animate({
          y: 812,
          animationOptions: {time: .6}
        });

        loader.width = 375;

        loader.animate({
          x: 375,
          animationOptions: {time: .6}
        })
      };
  };

  loader.width = Utils.modulate(scroll.content.y, [0, borderline], [0, 375], true);
})

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
