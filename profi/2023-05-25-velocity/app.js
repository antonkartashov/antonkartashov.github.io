Framer.CurrentContext.backgroundColor = 'rgba(0, 0, 0, 0)';

let sheet = new Layer ({
  width: 300, height: 500,
  x: Align.center(),
  y: 120,
  borderRadius: 30,
  scale: 1.02,
  backgroundColor: 'white'
});

let wrap = new Layer ({
  size: 1,
  x: 30, y: Align.center(-50)
});

// wrap.opacity = 0;

let indicator = new Layer ({
  width: 2, height: 0,
  backgroundColor: 'white',
  parent: wrap
})



sheet.draggable.horizontal = false;
let breakpoint = false;



sheet.onDrag(function() {
  indicator.height = Math.abs(Utils.round(event.velocityY, 3) * 200);

  if (event.velocityY > 0) {wrap.rotation = 0} else {wrap.rotation = 180};

  if (Math.abs(event.velocityY) > .8) {
    indicator.backgroundColor = 'tomato';
    tipVelocity.color = 'tomato';
    pick = true;
  } else {
    indicator.backgroundColor = 'white';
    tipVelocity.color = 'white';
  }

  if (sheet.y + (sheet.height / 2) > 600) {
    sheet.backgroundColor = 'rgba(240, 200, 200, 1)';
    breakpoint = true;
    breakpointLayer.opacity = 1;
  } else {
    sheet.backgroundColor = 'white';
    breakpoint = false;
    breakpointLayer.opacity = .4;
  };

  tipVelocity.html = `
    drag.event.velocityY: ${Utils.round(event.velocityY, 3)}
  `;
});

sheet.onDragEnd(function(event) {
  if (Math.abs(event.velocityY) > .8 || breakpoint) {
    sheet.animate({
      y: 1000,
      options: {time: .6}
    });
  } else {
    sheet.animate({
      y: 120,
      options: {
        curve: 'spring(100, 12, 0)'
      }
    });
  }
});

sheet.onTouchStart(function(){
  sheet.animate({
    scale: 1, options: {time: .15}
  })
});

sheet.onTouchEnd(function(){
  sheet.animate({
    scale: 1.02,
    options: {
      curve: 'spring(100, 12, 0)'
    }
  })
});



let breakpointLayer = new Layer ({
    width: 1000,
    height: 2,
    backgroundColor: 'rgba(255, 0, 0, .8)',
    x: Align.center(),
    y: 600,
    opacity: .4
});

let tipVelocity = new Tip ({
  x: 50, y: Align.center(-50),
  color: 'white',
  html: `
    drag.event.velocityY: 0
  `
});
