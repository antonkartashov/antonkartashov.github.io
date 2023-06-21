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
  backgroundColor: 'white',
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

screen.backgroundColor = 'white';
// screen.backgroundColor = '#444751';


let pattern = new Layer ({
  image: 'images/Pattern.png',
  parent: screen,
  width: 375, height: 812,
  scale: 1.02
});

let primaryScreen = new Layer ({
  image: 'images/Order.png',
  parent: screen,
  width: 375, height: 812
});

let primaryScreenStartScale = primaryScreen.scale = .95

let blackout = new Layer ({
  parent: screen,
  width: 375, height: 812,
  backgroundColor: 'rgba(0, 0, 0, 0.5)'
});

let secondaryScreen = new Layer ({
  image: 'images/Chat.png',
  parent: screen,
  width: 375, height: 812
});



let dragArea = new Layer ({
  width: 375, height: 812,
  backgroundColor: null,
  // backgroundColor: 'rgba(0, 0, 0, .4)',
  parent: screen
});

let backButton = new Layer({
  size: 60,
  x: 6, y: 46,
  backgroundColor: null,
  // backgroundColor: 'rgba(0, 0, 0, .4)',
  parent: dragArea
});



dragArea.draggable.enabled = true;

let dragStartPoint = {
  x: 0,
  y: 0
};

dragArea.onDragStart(function(dragStartEvent) {
  dragStartPoint.x = dragStartEvent.x;
  dragStartPoint.y = dragStartEvent.y;
});




dragArea.onDragMove(function(dragMoveEvent) {
  let offsetHorizont = dragMoveEvent.x - dragStartPoint.x;
  let offsetVertical = dragMoveEvent.y - dragStartPoint.y;
  let distance = Math.max(offsetHorizont, offsetVertical);

  secondaryScreen.x = offsetHorizont;
  secondaryScreen.y = offsetVertical;

  secondaryScreen.scale = Utils.modulate(distance,
    [0, screen.height],
    [1, 0.8]
  );

  secondaryScreen.borderRadius = Utils.modulate(distance,
    [0, 20],
    [1, 32],
    true // limited
  );

  primaryScreen.scale = Utils.modulate(distance,
    [0, screen.height],
    [primaryScreenStartScale, 1]
  );

  pattern.scale = Utils.modulate(distance,
    [0, screen.height],
    [1, 1.02]
  );

  blackout.opacity = Utils.modulate(distance,
    [0, screen.height],
    [1, 0]
  );
});



let endAnimationOptions = {
  curve: "spring(100, 28, 0)"
};

dragArea.onDragEnd(function(dragEndEvent) {
  pattern.animate({
    scale: 1.02,
    options: endAnimationOptions
  });

  primaryScreen.animate({
    scale: 1,
    options: endAnimationOptions
  });

  blackout.animate({
    opacity: 0,
    options: endAnimationOptions
  });

  let velocityX = Math.round(dragEndEvent.velocity.x * 100);

  if (velocityX < 10) {velocityX = 1};
  if (velocityX > 100) {velocityX = 100};

  let velocityY = Math.round(dragEndEvent.velocity.y * 100);

  if (velocityY < 10) {velocityY = 1};
  if (velocityY > 100) {velocityY = 100};

  dragArea.animate({
    x: 375,
    options: {
      curve: `spring(${velocityX}, 25, 0)`
    }
  });

  secondaryScreen.animate({
    x: 375,
    options: {
      curve: `spring(${velocityX}, 25, 0)`
    }
  });

  dragArea.animate({
    y: 812,
    options: {
      curve: `spring(${velocityY}, 25, 0)`
    }
  });

  secondaryScreen.animate({
    y: 812,
    options: {
      curve: `spring(${velocityY}, 25, 0)`
    }
  });
});



backButton.onTap(function() {
  pattern.animate({
    scale: 1.02,
    options: endAnimationOptions
  });

  primaryScreen.animate({
    scale: 1,
    options: endAnimationOptions
  });

  blackout.animate({
    opacity: 0,
    options: endAnimationOptions
  });

  secondaryScreen.animate({
    x: 0, y: 812,
    options: endAnimationOptions
  });

  dragArea.animate({
    x: 0, y: 812,
    options: endAnimationOptions
  });
});



primaryScreen.onTap(function() {
  pattern.animate({
    scale: 1,
    options: endAnimationOptions
  });

  primaryScreen.animate({
    scale: primaryScreenStartScale,
    options: endAnimationOptions
  });

  blackout.animate({
    opacity: 1,
    options: endAnimationOptions
  });

  secondaryScreen.point = {
    x: 0, y: 812
  };

  secondaryScreen.animate({
    x: 0, y: 0, scale: 1,
    options: endAnimationOptions
  });

  dragArea.animate({
    x: 0, y: 0
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
