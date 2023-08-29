Framer.CurrentContext.backgroundColor = 'rgba(0, 0, 0, 0)';

let screen = new Layer ({
  width: 375, height: 812,
  x: Align.center(),
  y: Align.center(),
  scale: Screen.height / 812 * 0.9,
  // scale: 1, y: 50,
  backgroundColor: '#818187',
  backgroundColor: 'tomato',
  image: 'images/bg.png',
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

let views = 0;

const shift = 0;

let random = Utils.randomNumber(0, 60) / 10;

headImages = [
  'images/Heads/head1.png',
  'images/Heads/head2.png',
  'images/Heads/head3.png',
  'images/Heads/head4.png',
  'images/Heads/head5.png',
  'images/Heads/head6.png',
  'images/Heads/head7.png'
]

let gradient = new Layer({
  parent: screen,
  size: screen.size,
  backgroundColor: ''
})



/* Design */
let tsup = new Layer ({
  parent: screen,
  width: 48, height: 48,
  backgroundColor: 'black',
  y: 730 + shift,
  x: Align.center(),
  borderRadius: 100,
  shadowColor: 'rgba(0, 0, 0, .15)',
  shadowY: 10,
  shadowBlur: 40
});

let tsupObjects = {
  iconTrash: new Layer ({
    image: 'images/Icons/Icon-Trash.png',
    size: 24
  }),
  iconTrashRed: new Layer({
    image: 'images/Icons/Icon-Trash-Red.png',
    size: 24
  }),
  iconZigzag: new Layer({
    image: 'images/Icons/Icon-Zigzag.png',
    size: 24
  }),
  iconZigzagYellow: new Layer({
    image: 'images/Icons/Icon-Zigzag-Yellow.png',
    size: 24
  }),
  iconEyeOpened: new Layer({
    image: 'images/Icons/Icon-Eye-Opened.png',
    size: 24
  }),
  iconEyeClosed: new Layer({
    image: 'images/Icons/Icon-Eye-Closed.png',
    size: 24
  }),
  textOpened: new Layer({
    // image: 'images/TextOpened.png',
    width: 115, height: 48,
    backgroundColor: 'black',
    html: `
      <p class='tsupTitle'>Заказ создан</p>
      <p class='tsupSubtitle'>${views} просмотров</p>`,
    visible: true
  }),
  iconArrow: new Layer({
    image: 'images/Icons/Icon-Arrow.png',
    size: 24
  }),
};

let marginLeft = 20;
let spacer = 12;


for (let prop in tsupObjects) {
  tsupObjects[prop].tsup = false;
};

tsupObjects.iconEyeOpened.tsup = true;
tsupObjects.textOpened.tsup = true;
tsupObjects.iconArrow.tsup = true;


for (let prop in tsupObjects) {
  tsupObjects[prop].props = {
    parent: tsup,
    y: Align.center()
  };

  if (tsupObjects[prop].tsup == true) {
    tsupObjects[prop].x = marginLeft;
    marginLeft += tsupObjects[prop].width + spacer;
  } else {
    tsupObjects[prop].opacity = 0;
  }
};

tsup.props = {
  width: marginLeft + spacer,
  x: Align.center()
}


/* Heads */

let viewsFunc = function() {
  views += 1;

  tsupObjects.textOpened.html = `
    <p class='tsupTitle'>Заказ создан</p>
    <p class='tsupSubtitle'>${views} просмотров</p>
  `;

  // print(views);
  let random = Utils.randomNumber(20, 60) / 10;
  Utils.delay(random, viewsFunc);

  let randomImage = Utils.round(Utils.randomNumber(0, 6));

  let headWrap = new Layer ({
    parent: gradient,
    backgroundColor: '',
    size: 44,
    x: Align.center(),
    y: 815
  });

  headWrap.animate({
    x: Utils.randomNumber(30, 280),
    options: {curve: 'spring(30, 17, 0)'}
  });

  headWrap.animate({
    y: 680 + Utils.randomNumber(0, 200),
    options: {curve: 'spring(40, 5, 0)'}
  });

  let head = new Layer ({
    parent: headWrap,
    backgroundColor: '',
    image: headImages[randomImage],
    size: 44
  });

  head.animate({
    y: -200 + Utils.randomNumber(-50, 50),
    options: {
      curve: 'linear',
      time: 12 - Utils.randomNumber(0, 5) / 10
    }
  });

  head.onAnimationEnd(function() {
    this.animate({
      scale: 0
    });
  })


}

Utils.delay(random, viewsFunc);

let offering = function() {
  gradient.animate({
    opacity: 0,
    options: {time: .3}
  });

  for (let prop in tsupObjects) {
    tsupObjects[prop].tsup = false;
  };

  tsupObjects.iconTrash.tsup = true;
  tsupObjects.iconZigzag.tsup = true;
  tsupObjects.iconEyeClosed.tsup = true;

  for (let prop in tsupObjects) {
    tsupObjects[prop].props = {
      parent: tsup,
      y: Align.center()
    };

    if (tsupObjects[prop].visible == true) {
      tsupObjects[prop].x = marginLeft;
      marginLeft += tsupObjects[prop].width + spacer;
    }
  };

}

tsup.onTap(offering);

/* Phone */

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
