Framer.CurrentContext.backgroundColor = 'rgba(0, 0, 0, 0)';

let screen = new Layer ({
  width: 375, height: 812,
  x: Align.center(),
  y: Align.center(),
  scale: Screen.height / 812 * 0.9,
  // scale: 1, y: 50,
  backgroundColor: 'white',
  clip: true,
  borderRadius: 40
});

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

screen.backgroundColor = 'white';



let primaryScreen = new Layer ({
  image: 'images/Home.png',
  parent: screen,
  width: 375, height: 812
});

new Layer ({
  parent: primaryScreen,
  y: 56,
  width: 375, height: 44,
  image: 'images/Home-User.png'
});

let primaryScreenStartScale = primaryScreen.scale = .95



let blackout = new Layer ({
  parent: screen,
  width: 375, height: 812,
  backgroundColor: 'rgba(0, 0, 0, 0.5)'
});


let wrap = new Layer ({
  width: 375, height: 812,
  backgroundColor: null,
  backgroundColor: 'rgba(10, 100, 10, 0.2)',
  parent: screen,
  clip: true
});

let secondaryScreen = new Layer ({
  parent: wrap,
  image: 'images/Pattern.png',
  width: 375, height: 812
});

let orderStatus = new Layer ({
  parent: secondaryScreen,
  width: 375, height: 40,
  image: 'images/Order-Status.png',
  y: 96
});

let bigTitle = new Layer ({
  parent: secondaryScreen,
  width: 375, height: 80,
  image: 'images/Title.png',
  x: 0, y: 136
});

let counters = new Layer ({
  parent: secondaryScreen,
  width: 79, height: 16,
  image: 'images/counter.png',
  x: 260 + 20, y: 202 + 10,
  opacity: 0
});

let navigationBar = new Layer ({
  parent: secondaryScreen,
  width: 375, height: 40,
  image: 'images/Navigation-Bar.png',
  y: 56
});

let sheet = new Layer ({
  parent: secondaryScreen,
  image: 'images/Sheet.png',
  width: 375, height: 713,
  y: 240
});



let dragArea = new Layer ({
  parent: screen,
  width: 375, height: 812,
  backgroundColor: 'rgba(0, 0, 0, 0)'
})

dragArea.draggable.enabled = true;
let dragStartPoint = {x: 0, y: 0};

let velocity = '↓';

dragArea.onDragStart(function(dragStartEvent) {
  dragStartPoint.x = dragStartEvent.x;
  dragStartPoint.y = dragStartEvent.y;
});

dragArea.onDragMove(function(dragMoveEvent) {
  let offsetHorizont = dragMoveEvent.x - dragStartPoint.x;
  let offsetVertical = dragMoveEvent.y - dragStartPoint.y;
  let distance = Math.max(offsetHorizont, offsetVertical);

  wrap.x = offsetHorizont;
  wrap.y = offsetVertical;

  if (offsetHorizont > offsetVertical) {velocity = '→'}
  else {velocity = '↓'};

  wrap.scale = Utils.modulate(distance,
    [0, screen.height],
    [1, 0.8]
  );

  wrap.borderRadius = Utils.modulate(distance,
    [0, 20],
    [1, 32],
    true // limited
  );

  primaryScreen.scale = Utils.modulate(distance,
    [0, screen.height],
    [primaryScreenStartScale, 1]
  );

  blackout.opacity = Utils.modulate(distance,
    [0, screen.height],
    [1, 0]
  );
});



let endAnimationOptions = {
  // time: 10
  curve: "spring(250, 28, 0)"
};

dragArea.onDragEnd(function(dragEndEvent) {
  statusBar.animate('black');

  primaryScreen.animate({
    x: 0, y: 0, scale: 1, opacity: 1, borderRadius: 0,
    options: endAnimationOptions
  });

  blackout.animate({
    opacity: 0,
    options: {time: 1}
  });

  wrap.animate({
    width: 343, height: 174, x: 16, y: 124, scale: 1, borderRadius: 24,
    options: endAnimationOptions
  });

  secondaryScreen.animate({
    x: -16, y: -50,
    options: endAnimationOptions
  });

  orderStatus.animate({
    x: 12, y: 64,
    options: endAnimationOptions
  });

  bigTitle.animate({
    x: -18, y: 131, scale: .8,
    options: endAnimationOptions
  });

  navigationBar.animate({
    y: 20, opacity: 0,
    options: endAnimationOptions
  });

  counters.animate({
    x: 260, y: 185, opacity: 1,
    options: endAnimationOptions
  });

  cardArea.animate({
    y: 124, options: {time: .3}
  });

  backButtonArea.animate({
    x: -100, options: {time: .3}
  });
});



let backButtonArea = new Layer({
  size: 60,
  x: 6, y: 46,
  backgroundColor: null,
  // backgroundColor: 'rgba(0, 0, 0, .4)',
  parent: dragArea
});

let cardArea = new Layer({
  width: 343, height: 174,
  x: 16, y: 124 - 300,
  backgroundColor: null,
  // backgroundColor: 'rgba(0, 0, 0, .4)',
  parent: screen
});



backButtonArea.onTap(function() {
  statusBar.animate('black');

  primaryScreen.animate({
    x: 0, y: 0, scale: 1, opacity: 1, borderRadius: 0,
    options: endAnimationOptions
  });

  blackout.animate({
    opacity: 0,
    options: {time: 2}
  });

  wrap.animate({
    width: 343, height: 174, x: 16, y: 124, scale: 1, borderRadius: 24,
    options: endAnimationOptions
  });

  secondaryScreen.animate({
    x: -16, y: -50,
    options: endAnimationOptions
  });

  orderStatus.animate({
    x: 12, y: 64,
    options: endAnimationOptions
  });

  bigTitle.animate({
    x: -18, y: 131, scale: .8,
    options: endAnimationOptions
  });

  navigationBar.animate({
    y: 20, opacity: 0,
    options: endAnimationOptions
  });

  counters.animate({
    x: 260, y: 185, opacity: 1,
    options: endAnimationOptions
  });

  cardArea.animate({
    y: 124, options: {time: .3}
  });

  backButtonArea.animate({
    x: -100, options: {time: .3}
  });
});



cardArea.onTap(function() {
  statusBar.animate('white');

  primaryScreen.animate({
    scale: primaryScreenStartScale,
    options: endAnimationOptions
  });

  blackout.animate({
    opacity: 1,
    options: endAnimationOptions
  });

  secondaryScreen.animate({
    x: 0, y: 0,
    options: endAnimationOptions
  });

  dragArea.animate({
    x: 0, y: 0,
    options: {time: .3}
  });

  wrap.animate({
    x: 0, y: 0, width: 375, height: 812, borderRadius: 24,
    options: endAnimationOptions
  });

  secondaryScreen.animate({
    x: 0, y: 0,
    options: endAnimationOptions
  });

  orderStatus.animate({
    x: 0, y: 96,
    options: endAnimationOptions
  });

  bigTitle.animate({
    x: 0, y: 136, scale: 1,
    options: endAnimationOptions
  });

  navigationBar.animate({
    y: 56,
    opacity: 1,
    options: endAnimationOptions
  });

  counters.animate({
    x: 260 + 20, y: 202 + 10, opacity: 0,
    options: endAnimationOptions
  });

  cardArea.animate({
    x: 16, y: 124 - 300,
    options: {time: .3}
  });

  backButtonArea.animate({
    x: 6, options: {time: .3}
  });
})



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
