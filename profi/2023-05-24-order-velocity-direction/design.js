

// let switcherGrid = new Toggle ({
//   x: 30, y: 110,
//   caption: 'Сетка для анимации',
//   // backgroundColor: 'rgba(255, 255, 255, 0.05)',
//   randomColor: 'tomato',
//   textStyle: textStyle
// });


/* Design Layout */

let homeScreen = new Layer ({
  parent: screen,
  image: 'images/Home.png',
  width: 375, height: 812
});

let homeHeader = new Layer ({
  parent: screen,
  image: 'images/Home-User.png',
  width: 375,
  height: 242,
  height: 44,
  y: 56
});

let blackout = new Layer ({
  parent: screen,
  backgroundColor: 'rgba(0, 0, 0, .5)',
  size: screen.size
})

let order = new Layer ({
  parent: screen,
  image: 'images/Offers-Background.png',
  width: 375, height: 812
});

let orderTitle = new Layer ({
  parent: order,
  image: 'images/Order-Title.png',
  width: 375, height: 80,
  y: 124
});

let scroll = new ScrollComponent ({
  parent: order, y: 116,
  width: 375, height: screen.height - 116,
  borderRadius: 32,
  clip: true,
  backgroundColor: 'rgba(0, 0, 0, 0)',
  scrollHorizontal: false,
});

scroll.content.clip = false;

let sheet = new Layer ({
  width: 375, height: 1100,
  image: 'images/Sheet.png',
  parent: scroll.content,
  y: 228-116
});

new Layer ({
  parent: sheet,
  backgroundColor: 'white',
  width: 375, height: 1000,
  y: 1000
});

new Layer ({
  parent: sheet,
  width: 375, height: 90,
  image: 'images/Sheet-Title.png',
  y: 0
});

for (let i = 0; i < 3; i++) {
  new Layer ({
    parent: sheet,
    width: 375, height: 318,
    image: 'images/Sheet-Offers.png',
    y: 89 + i * 317
  });
};


/* Phone */

let statusBarBlack = new Layer ({
  image: 'images/StatusBar-BlackOnWhite.png',
  width: 375, height: 44,
  parent: screen
});

statusBarBlack.states = {
  on:   {opacity: 1, animationOptions: {time: 1}},
  off:  {opacity: 0, animationOptions: {time: 1}},
};

let statusBarWhite = new Layer ({
  image: 'images/StatusBar-WhiteOnBlack.png',
  width: 375, height: 44,
  parent: screen
});

statusBarWhite.states = {
  on:   {opacity: 1, animationOptions: {time: 1}},
  off:  {opacity: 0, animationOptions: {time: 1}},
};

statusBarBlack.animate('off');
statusBarWhite.animate('on');

let homeIndicator = new Layer ({
  parent: screen,
  width: 135, height: 5,
  backgroundColor: 'black',
  borderRadius: 100,
  x: Align.center(),
  y: 812 - 5 - 10
});

// let grabber = new Layer ({
//   width: 41, height: 5,
//   opacity: .5, backgroundColor: '#D0D3DD',
//   parent: screen,
//   borderRadius: 20,
//   y: 54 + 15, x: Align.center()
// });

let device = new Layer ({
  image: 'images/iphone-14-display-shape.png',
  image: 'images/iphone-x-display-shape.png',
  width: screen.width + 88 - 4,
  height: screen.height + 88 - 4,
  scale: screen.scale,
  // opacity: .2,
  x: Align.center(),
  y: Align.center(-2)
});
