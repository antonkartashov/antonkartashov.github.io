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

let descriptionTextColorGrey = 'rgba(255, 255, 255, .4)';
let descriptionTextColorRed = 'tomato';

let description = new Layer({
  x: 30, y: 25,
  height: 50, width: 300,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  style: textStyle,
  color: descriptionTextColorGrey,
  html: `
    <b>Profi X</b>
    <p>Схлопывание шапки на&nbsp;экране профиля.</p><br>
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
  backgroundColor: '#818187',
  width: 375, height: 812,
  parent: screen
});


let scroll = new ScrollComponent ({
  parent: screen, y: 59,
  width: 375, height: screen.height - 59,
  borderRadius: 32,
  clip: true,
  backgroundColor: 'white',
  scrollHorizontal: false,
});

scroll.content.clip = false;


let details = new Layer ({
  width: 375, height: 3117,
  image: 'images/Details.jpg',
  parent: scroll.content,
  y: 464 + 24,
  y: 40
});

let user = new Layer ({
  width: 375, height: 544,
  parent: scroll.content,
  image: 'images/User.png',
  y: 40
});

let header = new Layer ({
  width: 375, height: 90,
  backgroundColor: 'white',
  shadowX: 0,
  shadowY: .5,
  shadowBlur: 0,
  shadowColor: 'rgba(31, 44, 71, .1)',
  image: 'images/Header.png',
  parent: scroll
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
  let textColor;

  if (scroll.content.y <= -166) {
    if (header.states.current.name != 'on') {
      header.animate('on');
    };
    textColor = descriptionTextColorRed;
  } else {
    if (header.states.current.name != 'off') {
      header.animate('off');
    };
    textColor = descriptionTextColorGrey;
  };

  description.html = `
    <b>Profi X</b>
    <p>Схлопывание шапки на&nbsp;экране профиля.</p><br>
    <p style='color: ${textColor}'>Scroll Y: ${-Math.round(scroll.content.y)}</p>`
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

let grabber = new Layer ({
  width: 41, height: 5,
  opacity: .5, backgroundColor: '#D0D3DD',
  parent: screen,
  borderRadius: 20,
  y: 54 + 15, x: Align.center()
});
