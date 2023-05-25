let layer = new Layer ({
  size: 200,
  x: Align.center(),
  y: 80,
  borderRadius: 32,
  backgroundColor: 'tomato'
});

let wrap = new Layer ({
  size: 1, y: 30, x: Align.center()
});

// wrap.opacity = 0;

let indicator = new Layer ({
  width: 10, height: 5,
  backgroundColor: 'gold',
  parent: wrap
})

layer.draggable.horizontal = false;

layer.onDrag(function() {
  indicator.width = Math.abs(Utils.round(event.velocityY, 3) * 200);

  if (event.velocityY > 0) {wrap.rotation = 0} else {wrap.rotation = 180};

  if (Math.abs(event.velocityY) > .8) {
    indicator.backgroundColor = 'blue';
    pick = true;
  } else {
    indicator.backgroundColor = 'gold';
  }
});

layer.onDragEnd(function(event) {
  if (Math.abs(event.velocityY) > .8) {
    layer.animate({
      y: 1000,
      options: {time: .6}
    });
  } else {
    layer.animate({
      y: 80,
      options: {
        curve: 'spring(100, 12, 0)'
      }
    });
  }
});

layer.onTouchStart(function(){
  layer.animate({
    scale: .9, options: {time: .15}
  })
});

layer.onTouchEnd(function(){
  layer.animate({
    scale: 1, options: {time: .15}
  })
});
