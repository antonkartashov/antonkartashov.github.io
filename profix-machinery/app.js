let bg = new BackgroundLayer ({
  backgroundColor: '#e5e5e5',
  backgroundColor: '#111',
})
let device = {
  width: 375, height: 812
};
let phone = new Layer ({
  size: device,
  x: Align.center(),
  y: Align.center(-2),
  scale: Screen.height / 812 * 0.9,
  backgroundColor: 'white',
  clip: true
});

let background = new Layer ({
  parent: phone,
  size: device,
  backgroundColor: '#444751'
});
let pattern = new Layer ({
  image: 'images/pattern.png',
  width: 434, height: 434,
  x: -30,
  parent: phone,
  opacity: .2
});
let header = new Layer ({
  parent: phone,
  width: 375, height: 152,
  image: 'images/header.png',
  y: 44
});

let sheet1 = new Layer ({
  parent: phone,
  width: 375, height: 732,
  borderRadius: 32,
  y: 220,
  backgroundColor: 'white',
  image: 'images/sendings.png'
});
let sheet2 = new Layer ({
  parent: phone,
  width: 375 - (80 * 2), height: 0,
  borderRadius: 32,
  x: 80, y: 220 - 3,
  backgroundColor: 'white',
});
let headline = new Layer ({
  parent: sheet2,
  image: 'images/headline.png',
  width: 375, height: 90,
  x: -80, y: 3,
  opacity: 0
})

let orderStatusWrap = new Layer ({
  parent: phone,
  x: 303 - 10, y: 720 - 10,
  width: 72, height: 72,
  backgroundColor: 'rgba(0, 0, 0, 0)',
  borderRadius: 100
});
let orderStatus = new Layer ({
  parent: orderStatusWrap,
  x: 10, y: 10,
  width: 52, height: 52,
  backgroundColor: '#25272D',
  borderRadius: 100
});

let circles = [];
let yo = 5;

let userpics = [
  'images/userpic1.png',
  'images/userpic2.png',
  'images/userpic3.png',
  'images/userpic4.png',
  'images/userpic5.png',
  'images/userpic6.png'
];

for (let i = 0; i < yo; i++) {
  circles[i] = new Layer ({
    parent: phone,
    size: 44,
    borderRadius: 1000,
    x: Align.center(),
    y: 1000,
    backgroundColor: 'rgba(0, 0, 0, .15)',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  });

  new Layer ({
    parent: circles[i],
    size: 44,
    borderRadius: 1000,
    backgroundColor: Utils.randomColor(),
    image: userpics[i]
    // scale: .8
  });
};

let profixAnimation = {
    time: 1,
    curve: 'ease-out'
    // curve: 'spring(250, 25, 10)'
}

let time = 1;
let curve = 'spring(250, 100, 0)';
curve = 'ease-in';

sheet1.onTap(()=> {
  sheet2.animate({
    width: 375,
    x: 0,
    y: 220,
    options: {
      time: .3,
      curve: 'ease-out',
    }
  });
  headline.animate({
    x: 0, y: 0,
    options: {
      time: .3,
      curve: 'ease-out',
    }
  });
  sheet1.animate({
    y: 812 + 3,
    options: {
      curve: curve,
      time: 1.2
    }
  });

  sheet2.animate({
    height: 592,
    options: {
      curve: curve,
      time: 1.2
    }
  });
  headline.animate({
    opacity: 1,
    options: {
      curve: curve,
      time: .3,
      delay: .15
    }
  });

  orderStatusWrap.animate({
    x: 151,
    options: {
      curve: 'ease-out',
      time: .6,
      delay: .6
    }
  });
  orderStatusWrap.animate({
    y: orderStatusWrap.y - 10,
    options: {
      curve: 'ease-out',
      time: .6,
      delay: .6
    }
  });

  orderStatus.animate({
    width: 72, height: 72,
    x: 0, y: 0,
    options: {
      curve: 'ease-out',
      time: .6,
      delay: .8
    }
  });

  let randomX = 0;
  let plusminus = 1;
  let randomY = 0;
  let randomTime = 0;
  let randomTime2 = 0;


  for (let i = 0; i < yo; i++) {

    randomX = Utils.randomNumber(3, 6) * 24;
    randomY = Utils.randomNumber(0, 50) * 5;
    randomTime = Utils.randomNumber(1.5, 3);
    randomTime2 = Utils.randomNumber(10, 30);

    if (i % 2 == 0) {
      plusminus = -1;
    } else {
      plusminus = 1;
    }

    // print (random * plusminus);

    circles[i].animate({
      y: randomY + 600,
      options: {
        time: 2,
        delay: i * randomTime
      }
    })

    circles[i].animate({
      x: randomX * plusminus + 375 / 2 - 22,
      // x: (i + 2) * 25 *  plusminus + 375 / 2 - 33,
      options: {
        // time: 1.5,
        curve: 'spring(200, 20, 0)',
        delay: i * randomTime + .2
      }
    });

    circles[i].children[0].animate({
      y: - randomTime * 5 - 240,
      options: {
        time: 2 * randomTime2,
        curve: 'linear'
      }
    })
  };
})

// Yo



// Lighters

let light1 = new Layer ({
  parent: phone,
  width: 8, height: 8,
  x: 24, y: 76,
  backgroundColor: '#5ECA75',
  borderRadius: 100,
  opacity: .5,
  scale: 1
})
light1.states.stateA = {
  opacity: .5, scale: .8, options: {time: 3}
};
light1.states.stateB = {
  opacity: 1, scale: 1, options: {time: .5}
};
light1.animate('stateB');
light1.onStateSwitchEnd((q, state) => {
  if (state == 'stateB') {
    light1.animate('stateA');
  } else if (state == 'stateA') {
    light1.animate('stateB');
  }
});

let light2 = new Layer ({
  parent: phone,
  width: 12, height: 12,
  x: 22, y: 74,
  backgroundColor: 'rbga(0, 0, 0, 0)',
  borderWidth: 2,
  borderColor: '#5ECA75',
  borderRadius: 100,
  opacity: .5,
  scale: 1
})
light2.states.stateA = {
  opacity: 1, scale: .5, options: {time: 0}
};
light2.states.stateB = {
  opacity: 0, scale: 1.5, options: {time: 3.5}
};
light2.animate('stateB');
light2.onStateSwitchEnd((q, state) => {
  if (state == 'stateB') {
    light2.animate('stateA');
  } else if (state == 'stateA') {
    light2.animate('stateB');
  }
});

let status = new Layer ({
  image: 'statusbar.png',
  width: device.width,
  height: 141/3.12,
  parent: phone,
});
let displayShape = new Layer ({
  image: 'DisplayShape.png',
  width: device.width + 84,
  height: device.height + 84,
  scale: phone.scale,
  // opacity: .2,
  x: Align.center(),
  y: Align.center(-2)
});
