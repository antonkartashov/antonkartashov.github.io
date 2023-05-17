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

let screen = new Layer ({
  width: 375, height: 812,
  point: Align.center(),
  scale: Screen.height / 812 * 0.9,
  // scale: 1,
  backgroundColor: 'white',
  clip: true,
  borderRadius: 50
});


/* Prototype Settings */

let description = new Layer({
  x: 30, y: 25,
  height: 50, width: 300,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  style: textStyle,
  color: 'rgba(255, 255, 255, .4)',
  html: `
    <b>Profi X</b>
    <p>Схлопывание шапки на&nbsp;экране заказа.</p><br>
    <p>Scroll Y: 0</p>`
});

// let switcherGrid = new Toggle({
//   x: 30, y: 110,
//   caption: 'Сетка для анимации',
//   // backgroundColor: 'rgba(255, 255, 255, 0.05)',
//   randomColor: 'tomato'
//
// });


/* Design Layout */

let background = new Layer ({
  image: 'images/Background@3x.png',
  width: 375, height: 812,
  parent: screen
});

let blackout = new Layer ({
  backgroundColor: 'black',
  width: 375, height: 812,
  parent: screen,
  opacity: 0
});

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

// Design

let orderTitle = new Layer ({
  image: 'images/TitleBig@3x.png',
  width: 375, height: 80,
  parent: screen,
  y: 124
});

// let scrollBack = new Layer ({
//   size: screen.size,
//   parent: screen,
//   borderRadius: 32,
//   y: marginTop1 + marginTop2,
//   backgroundColor: 'white'
// });

let scroll = new ScrollComponent ({
  parent: screen,
  width: 375, height: 696,
  y: 116,
  scrollHorizontal: false,
  borderRadius: 32,
  clip: true
});

scroll.content.clip = false;

let scrollContent = new Layer ({
  width: scroll.width,
  height: scroll.height,
  parent: scroll.content,
  y: 112,
  backgroundColor: 'rgba(200, 0, 0, .5)',
  backgroundColor: 'rgba(0,0,0,0)',
  clip: false
});

let scrollContentBack = new Layer ({
  width: scroll.width,
  height: 5000,
  clip: true,
  borderRadius: 32,
  parent: scrollContent,
  backgroundColor: 'white'
});

let list = new Layer ({
  width: 375, height: 590,
  parent: scrollContent,
  image: 'images/List.png',
  borderRadius: 32,
  clip: true
});


let statusStatus = new Layer ({
  width: 375, height: 24,
  parent: screen,
  image: 'images/Status-Status@3x.png',
  y: 75
});

statusStatus.states = {
  off: {
    y: 75 - 10,
    opacity: 0,
    animationOptions: {
      curve: 'spring(150, 25, 0)'
    }
  },
  on: {
    y: 75,
    opacity: 1,
    animationOptions: {
      curve: 'spring(150, 25, 0)',
      delay: .15
    }
  }
};

let statusTitle = new Layer ({
  width: 375, height: 24,
  parent: screen,
  image: 'images/Status-Title@3x.png',
  y: 75 + 10,
  opacity: 0
});

statusTitle.states = {
  off: {
    y: 75 + 10,
    opacity: 0,
    animationOptions: {
      curve: 'spring(150, 25, 0)',
    }
  },
  on: {
    y: 75,
    opacity: 1,
    animationOptions: {
      curve: 'spring(150, 25, 0)',
      delay: .15
    }
  }
};

scroll.content.onMove(function() {
  let textColor;

  if (scroll.content.y < (-112 + 10)) {
    textColor = 'gold';
    if (statusStatus.states.current.name != 'off') {
      statusStatus.animate('off');
    };
    if (statusTitle.states.current.name != 'on') {
      statusTitle.animate('on');
    };
  } else {
    textColor = 'rgba(255, 255, 255, .4)';
    if (statusStatus.states.current.name != 'on') {
      statusStatus.animate('on');
    };
    if (statusTitle.states.current.name != 'off') {
      statusTitle.animate('off');
    };

    blackout.opacity = -1 * scroll.content.y / 200;
  };

  orderTitle.y = 124 + scroll.content.y / 4;
  orderTitle.opacity = 1 + scroll.content.y * .01 * 1;

  description.html = `
    <b>Profi X</b>
    <p>Схлопывание шапки на&nbsp;экране заказа.</p><br>
    <p style='color: ${textColor}'>Scroll Y: ${-Math.round(scroll.content.y)}</p>`
});


let tsup = new Layer ({
  image: 'images/Tsup@3x.png',
  width: 112, height: 120,
  parent: screen,
  x: Align.right(),
  y: Align.bottom()
});

tsup.onTap(function() {
  statusStatus.stateCycle('on', 'off');
  statusTitle.stateCycle('off', 'on');
});

/* Phone */

let status = new Layer ({
  image: 'images/statusbar.png',
  width: 375, height: 56,
  parent: screen,
});

let displayShape = new Layer ({
  image: 'images/iphone-14-display-shape.png',
  width: screen.width + 84 - 4,
  height: screen.height + 84 - 4,
  scale: screen.scale,
  // opacity: .2,
  x: Align.center(),
  y: Align.center(-2)
});

let homeIndicator = new Layer ({
  parent: screen,
  width: 135, height: 5,
  backgroundColor: 'black',
  borderRadius: 100,
  x: Align.center(),
  y: 812 - 5 - 10
});

let phoneStatusBar = new Layer ({
  parent: screen,
  width: 375, height: 56,
  image: 'images/StatusBar-iPhone@3x.png'
});
