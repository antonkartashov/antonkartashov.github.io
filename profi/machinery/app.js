let textStyle = {
  'font-size' : '12pt',
  'line-height' : '18pt',
  'margin-top' : '3px'
};

class Toggle extends Layer{
  constructor(options) {
    super(_.defaults(options, {
      width: 300,
      height: 30,
      backgroundColor: ''
    }));

    this.toggle = new Layer({
      parent: this,
      width: 50,
      height: 30,
      borderRadius: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    });

    this.knob = new Layer({
      parent: this,
      width: 30, height: 30,
      borderRadius: 100,
      scale: .9,
      backgroundColor: 'rgba(255, 255, 255, .5)'
    });

    if (!options.randomColor) {
      switch(Utils.round(Utils.randomNumber(1, 7))) {
        case 1: this.randomColor = 'salmon'; break;
        case 2: this.randomColor = 'tomato'; break;
        case 3: this.randomColor = 'gold'; break;
        case 4: this.randomColor = 'mediumseagreen'; break;
        case 5: this.randomColor = 'turquoise'; break;
        case 6: this.randomColor = 'skyblue'; break;
        case 7: this.randomColor = 'orchid'; break;
      };
    } else {
      this.randomColor = options.randomColor;
    };

    this.knob.states = {
      knobOn: {
        x: 20,
        backgroundColor: this.randomColor,
        options: {curve: 'spring(200, 10, 0)'}
      },
      knobOff: {
        x: 0,
        backgroundColor: 'rgba(255, 255, 255, .5)',
        options: {curve: 'spring(200, 10, 0)'}
      }
    };

    this.caption = options.caption ?? '';

    this.label = new Layer({
      parent: this,
      width: 300,
      height: 30,
      x: 60,
      html: this.caption,
      backgroundColor: '',
      color: 'rgba(255, 255, 255, .3)',
      style: textStyle
    });

    this.states = {
      on: {options: {time: 0}},
      off: {options: {time: 0}}
    };

    this.onStateSwitchEnd(function() {
      if (this.states.current.name == 'off') {
        this.knob.animate('knobOff');
        this.label.animate({
          color: 'rgba(255, 255, 255, .3)',
          options: {time: .1}
        });
      } else if (this.states.current.name == 'on') {
        this.knob.animate('knobOn');
        this.label.animate({
          color: this.randomColor,
          options: {time: .1}
        });
      };
    });

    this.knob.animate('knobOff');

    this.onTap(function() {
      this.stateCycle('on', 'off');
    });
  };
};

/* iPhone 14 */

let pageColor = new BackgroundLayer ({
  backgroundColor: '#0a0a0a'
});

let device = {
  width: 375, height: 812
};

let screen = new Layer ({
  size: device,
  x: Align.center(),
  y: Align.center(-2),
  scale: Screen.height / 812 * 0.9,
  backgroundColor: 'white',
  clip: true
});


/* Prototype Settings */

let description = new Layer({
  x: 20, y: 20,
  height: 50, width: 300,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  style: textStyle,
  color: 'rgba(255, 255, 255, .4)',
  html: 'Чтобы запустить анимацию, кликните на&nbsp;экран телефона.'
});

let switcherGrid = new Toggle({
  x: 20, y: 100,
  caption: 'Сетка для анимации',
  // backgroundColor: 'rgba(255, 255, 255, 0.05)',
  randomColor: 'tomato'

});


/* Design Layout */

let bg = new Layer ({
  image: 'images/order-header.png',
  width: 375, height: 812,
  parent: screen
});

let sheet1 = new Layer ({
  parent: screen,
  width: 375, height: 732,
  borderRadius: 32,
  y: 220,
  backgroundColor: 'white',
  image: 'images/sendings.png'
});

let sheet2 = new Layer ({
  parent: screen,
  width: 375 - (80 * 2), height: 0,
  borderRadius: 32,
  x: 80, y: 220 - 3,
  backgroundColor: 'white',
});

let waitingForOffers = new Layer({
  parent: sheet2,
  image: 'images/waiting-for-offers.png',
  width: 375, height: 90,
  x: -80, y: 3,
  opacity: 0
});

waitingForOffers.threeDotsLoading = new Layer({
  parent: waitingForOffers,
  width: 40, height: 40,
  x: 235, y: 24,
  backgroundColor: 'rgba(255, 0, 0, 0)'
});

let threeDotsLoadingArray = [];

for (let i = 0; i < 3; i++) {
  threeDotsLoadingArray[i] = new Layer({
    parent: waitingForOffers.threeDotsLoading,
    backgroundColor: '#181818',
    size: 3,
    borderRadius: 100,
    x: i * 6, y: 25.5
  });

  threeDotsLoadingArray[i].states = {
    disappearance: {
      scale: 0,
      // y: 27.5,
      options: {
        curve: 'spring(50, 7, 0)',
        delay: (2 - i) * .25
      }
    },
    appearance: {
      scale: 1,
      // y: 25.5,
      options: {
        curve: 'spring(50, 7, 0)',
        delay: i * .25
      }
    }
  };
};

Utils.interval(1, function() {
  for (let dot of threeDotsLoadingArray) {
    dot.stateCycle('appearance', 'disappearance');
  }
})



let userpics = [
  'images/userpic1.png',
  'images/userpic2.png',
  'images/userpic3.png',
  'images/userpic4.png',
  'images/userpic5.png',
  'images/userpic6.png'
];

let circles = [];
let columns = [];

for (let i = 0; i < 6; i++) {
  circles[i] = new Layer ({
    parent: screen,
    size: 36,
    borderRadius: 1000,
    x: Align.center(),
    y: 820,
    backgroundColor: 'rgba(0, 0, 0, .15)',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  });

  circles[i].userpic = new Layer ({
    parent: circles[i],
    size: 36,
    borderRadius: 1000,
    backgroundColor: Utils.randomColor(),
    image: userpics[i]
  });

  columns.push(i + 1);
};



let orderStatusWrap = new Layer({
  parent: screen,
  x: 303 - 10, y: 720 - 10,
  width: 72, height: 72,
  backgroundColor: 'rgba(0, 0, 0, 0)',
  borderRadius: 100
});

let orderStatus = new Layer({
  parent: orderStatusWrap,
  x: 10, y: 10,
  width: 52, height: 52,
  backgroundColor: '#181818',
  borderRadius: 100
});

orderStatus.eyeWrap = new Layer({
  parent: orderStatus,
  x: 14, y: 14, width: 24, height: 24,
  backgroundColor: ''
});

orderStatus.eye = new Layer({
  parent: orderStatus.eyeWrap,
  x: 0, y: 0, width: 24, height: 24,
  image: 'images/eye.png'
});

orderStatus.views = new Layer({
  parent: orderStatus,
  point: Align.center(),
  backgroundColor: '',
  opacity: 0,
  width: 20, height: 22,
  x: 24,
  html: '14',
  style: {
    'font-size': '15px',
    'font-family': 'SF Pro Text',
    'font-weight': '500',
    'color': 'white',
    'line-height': '22px',
    'letter-spacing': '0.02em',
    'text-align': 'center'
  }
});



let random = function(start, end) {
  return Utils.round(Utils.randomNumber(start, end));
};

Utils.delay(2, function() {
  sheet1.animate({
    y: 812 + 3,
    options: {
      curve: 'ease-out', time: 1.2
    }
  });

  sheet2.animate({
    x: 0, y: 220, width: 375,
    options: {
      curve: 'ease-out', time: .3,
    }
  });

  sheet2.animate({
    height: 592,
    options: {
      curve: 'ease-out', time: 1.2
    }
  });

  waitingForOffers.animate({
    x: 0, y: 0,
    options: {
      curve: 'ease-out', time: .3
    }
  });

  waitingForOffers.animate({
    opacity: 1,
    options: {
      curve: 'ease-out', time: .3,
      delay: .15
    }
  });

  orderStatusWrap.animate({
    x: 151,
    options: {
      curve: 'ease-out', time: .6,
      delay: .6
    }
  });
  orderStatusWrap.animate({
    y: orderStatusWrap.y - 10,
    options: {
      curve: 'ease-out', time: 1,
      delay: .6
    }
  });

  orderStatus.animate({
    width: 72, height: 72, x: 0, y: 0,
    options: {
      curve: 'ease-out', time: .6,
      delay: .8
    }
  });

  orderStatus.eyeWrap.animate({
    x: 23, y: 24,
    options: {
      curve: 'ease-out', time: .6,
      delay: 0.8
    }
  });

  orderStatus.eye.animate({
    x: -10,
    options: {
      curve: 'spring(50, 8, 0)',
      delay: 1.3
    }
  });

  orderStatus.views.animate({
    y: 24.5,
    options: {
      curve: 'ease-out', time: .6,
      delay: 0.8
    }
  });

  orderStatus.views.animate({
    x: 38,
    opacity: 1,
    options: {
      curve: 'spring(50, 8, 0)',
      delay: 1.3
    }
  });

  for (let circle of circles) {
    let index = circles.indexOf(circle);

    /* X */
    let randomNum = random(0, circles.length - index - 1);
    let randomColumn = columns[randomNum];
    columns.splice(randomNum, 1);

    let randomColumnX;
    switch (randomColumn) {
      case 1: randomColumnX =  20; break;
      case 2: randomColumnX =  67; break;
      case 3: randomColumnX = 114; break;
      case 4: randomColumnX = 225; break;
      case 5: randomColumnX = 272; break;
      case 6: randomColumnX = 319; break;
    };

    let randomDelay = random(20, 35) * .1;

    circle.animate({
      x: randomColumnX,
      options: {
        curve: 'spring(20, 4, 0)',
        delay: randomDelay * index + 1.7
      }
    });

    /* Y */
    let areaMarginTop = 537 - 20; /* Отступ сверху экрана */
    let areaHeight = 200; /* Высота области */

    let randomStartY = (areaMarginTop + areaHeight) - random(0, 7) * 10;
    let randomEndY = areaMarginTop - random(6, 7) * 10;
    let randomSpeed = random(8, 12);

    circle.animate({
      y: randomStartY,
      options: {
        time: 2,
        delay: randomDelay * index + 1.7
      }
    });

    /* Linear Animation */

    circle.userpic.states = {
      linearAnimation: {
        y: -1 * random(8, 12) * 10,
        options: {
          curve: 'linear',
          time: randomSpeed,
          delay: randomDelay * index + 1.7
        }
      },
      disappearance: {
        scale: 0,
        options: {
          time: 1
        }
      }
    };

    circle.userpic.onStateSwitchEnd(function() {
        if (this.states.current.name == 'linearAnimation') {
          this.animate('disappearance');
        }
    });

    circle.userpic.animate('linearAnimation');
  };
})


// Lighters

let light = function() {
  let light1 = new Layer ({
    parent: screen,
    width: 10, height: 10,
    x: 31, y: 83,
    backgroundColor: '#2EB518',
    borderRadius: 100,
    opacity: .5,
    scale: 1
  })

  light1.states = {
    stateA: {
      opacity: .5,
      scale: .8,
      options: {time: 3}
    },
    stateB: {
      opacity: 1,
      scale: 1,
      options: {time: .5}
    }
  };

  let light2 = new Layer ({
    parent: screen,
    width: 14, height: 14,
    x: 29, y: 81,
    backgroundColor: 'rbga(0, 0, 0, 0)',
    borderWidth: 2,
    borderColor: '#2EB518',
    borderRadius: 100,
    opacity: .5,
    scale: 1
  })

  light2.states = {
    stateA: {
      opacity: 1,
      scale: .5,
      options: {time: 0}
    },
    stateB: {
      opacity: 0,
      scale: 1.5,
      options: {time: 3.5}
    }
  };

  light1.onStateSwitchEnd(function(event, state) {
    if (state == 'stateB') {
      light1.animate('stateA');
    } else if (state == 'stateA') {
      light1.animate('stateB');
    }
  });

  light2.onStateSwitchEnd(function(event, state) {
    if (state == 'stateB') {
      light2.animate('stateA');
    } else if (state == 'stateA') {
      light2.animate('stateB');
    }
  });

  light1.animate('stateB');
  light2.animate('stateB');
}();


/* Phone */

let status = new Layer ({
  image: 'statusbar.png',
  width: device.width,
  height: 141/3.12,
  parent: screen,
});

let displayShape = new Layer ({
  image: 'DisplayShape.png',
  width: device.width + 84,
  height: device.height + 84,
  scale: screen.scale,
  // opacity: .2,
  x: Align.center(),
  y: Align.center(-2)
});


/* Grid */

let grid = new Layer({
  parent: screen,
  image: 'images/axis.png',
  width: 375, height: 285,
  y: Align.bottom(10),
  scale: 1.05,
  opacity: 0
});

grid.states.visible = {
  opacity: 1,
  scale: 1,
  y: Align.bottom()
};

grid.states.animationOptions = {
  curve: 'spring(150, 15, 0)'
}

switcherGrid.onStateSwitchEnd(function() {
  if (this.states.current.name == 'on') {
    grid.animate('visible');
  } else if (this.states.current.name == 'off') {
    grid.animate('default');
  };
});

switcherGrid.animate('on');
