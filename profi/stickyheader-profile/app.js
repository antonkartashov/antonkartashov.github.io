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
  html: '<b>Profi X</b><br>Слопывание шапки'
});

let switcherGrid = new Toggle({
  x: 30, y: 110,
  caption: 'Сетка для анимации',
  // backgroundColor: 'rgba(255, 255, 255, 0.05)',
  randomColor: 'tomato'

});


/* Design Layout */

let background = new Layer ({
  image: 'images/Background.png',
  width: 375, height: 812,
  parent: screen
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

let marginTop1 = 116;
let marginTop2 = 112;

let scroll = new ScrollComponent ({
  parent: screen, y: 128,
  width: 375, height: screen.height - 128,
  borderRadius: 32,
  clip: true,
  backgroundColor: 'white',
  scrollHorizontal: false,
});

scroll.content.clip = false;

let group = new Layer ({
  width: 375, height: 464,
  backgroundColor: 'rgba(0,0,0,0)',
  parent: scroll.content
});

let greyblock = new Layer ({
  width: 375, height: 464 + 1000,
  backgroundColor: '#F4F5F8',
  parent: group,
  y: -1000
});

let userpic = new Layer ({
  width: 102, height: 136,
  borderRadius: 18,
  clip: true,
  image: 'images/Userpic.png',
  parent: group,
  y: 40, x: 375/2 - 102/2
});

let nameBig = new Layer ({
  width: 180, height: 48,
  image: 'images/yo.png',
  parent: group,
  y: 200, x: 375/2 - 180/2
});

let badges = new Layer ({
  width: 412, height: 84,
  image: 'images/Badges.png',
  parent: group,
  y: 272, x: 24
});

let button = new Layer ({
  width: 327, height: 60,
  image: 'images/Button.png',
  parent: group,
  y: 380, x: 24
});

let Details = new Layer ({
  width: 375, height: 938,
  image: 'images/Details.png',
  parent: scroll.content,
  y: 464 + 24
});

new Layer ({
  width: 375, height: 1,
  backgroundColor: 'rgba(0,0,0,0)',
  parent: scroll.content,
  y: 1500
});

let header = new Layer ({
  width: 375, height: 90,
  backgroundColor: 'white',
  shadowX: 0,
  shadowY: .5,
  shadowBlur: 0,
  shadowColor: 'rgba(0,0,0,.1)',
  parent: scroll
});

new Layer ({
  width: 253, height: 46,
  image: 'images/NameSmall.png',
  parent: header,
  x: 62, y: 40
});

new Layer ({
  width: 30, height: 40,
  image: 'images/Userpic.png',
  parent: header,
  x: 24, y: 40,
  borderRadius: 8
});

header.y -= header.height + 4;
// -94

header.states = {
  off: {
    y: -94,
    animationOptions: {
      curve: 'spring(150, 25, 0)'
    }
  },
  on: {
    y: 0,
    animationOptions: {
      curve: 'spring(150, 25, 0)'
    }
  }
};

scroll.content.onMove(function() {
  if (scroll.content.y < -160) {
    if (header.states.current.name != 'on') {
      header.animate('on');
    };
  } else {
    if (header.states.current.name != 'off') {
      header.animate('off');
    };

  };
  //
  // orderTitle.y = 124 + scroll.content.y / 4;
  // orderTitle.opacity = 1 + scroll.content.y * .01 * 1
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

// switcherGrid.animate('on');
