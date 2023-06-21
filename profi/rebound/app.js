Framer.CurrentContext.backgroundColor = 'rgba(0, 0, 0, 0)';

// let pageColor = new BackgroundLayer ({
//   backgroundColor: '#0a0a0a'
// });

let opasno = .25;
// opasno = 0;

let background = new Layer({
  size: Screen.size,
  backgroundColor: 'black'
});


let x0 = Screen.width / 2 - 150;
let y0 = 50;

// print(x0, y0);

let layer;

for (let i0 = 0; i0 < 20; i0++) {
  layer = new Layer ({
    x: x0 + i0 * 15,
    y: y0 + i0 * 20,
    rotation: i0 * 10,
    size: 300,
    borderWidth: 2,
    borderColor: `hsl(${i0 * 6}, 220, 50)`,
    backgroundColor: '',
    borderRadius: 32,
    scale: .5,
    opacity: opasno
  });
};

let x1 = layer.x;
let y1 = layer.y;

for (let i1 = 0; i1 < 20; i1++) {
  layer = new Layer ({
    x: x1 - i1 * 30,
    y: y1 - i1 * 2,
    // rotation: 200 - i1 * 10,
    size: 300,
    borderWidth: 2,
    borderColor: `hsl(${120 + i1 * 6}, 220, 50)`,
    backgroundColor: '',
    borderRadius: 32 + i1 * 10,
    scale: .5,
    opacity: opasno
  });
};

let x2 = layer.x;
let y2 = layer.y;

for (let i2 = 0; i2 < 20; i2++) {
  layer = new Layer ({
    x: x2 + i2 * 15,
    y: y2 - i2 * 18,
    borderRadius: 232 - i2 * 10,
    size: 300,
    borderWidth: 2,
    borderColor: `hsl(${240 + i2 * 6}, 220, 50)`,
    backgroundColor: '',
    scale: .5,
    opacity: opasno
  });
};

// print(layer.x, layer.y);

let rect = new Layer ({
  x: x0,
  y: y0,
  size: 300,
  backgroundColor: 'gold',
  borderRadius: 32,
  scale: .5,
  clip: true
});

// print(rect.x);

rect.states = {
  state1: {x: x1, y: y1, rotation: 190, borderRadius: 32},
  state2: {x: x2, y: y2, rotation: 0, borderRadius: 232},
  state0: {x: x0, y: y0, rotation: 0, borderRadius: 32}
};

background.onTap(function() {
  rect.stateCycle('state1', 'state2', 'state0');
});

background.onMouseDown(function() {
  let blink = new Layer ({
    size: 300,
    backgroundColor: 'rgba(170, 255, 150, 1)',
    parent: rect,
    opacity: .8
  });

  blink.animate({
    opacity: .2,
    options: {time: .15}
  });

  blink.onAnimationDidEnd(function() {
    this.destroy();
  })
});

// rect.onAnimationEnd(function() {
//   print(rect.x);
// })


// div.style = {'margin-left': '100px'}
