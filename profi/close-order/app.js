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
  borderRadius: 52
});


/* Prototype Settings */

let description = new Layer({
  x: 30, y: 25,
  height: 50, width: 300,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  style: textStyle,
  color: 'rgba(255, 255, 255, .4)',
  html: '<b>Профи Икс</b><br>Анимация машинерии'
});

// let switcherGrid = new Toggle({
//   x: 30, y: 110,
//   caption: 'Сетка для анимации',
//   backgroundColor: 'rgba(255, 255, 255, 0.05)',
//   randomColor: 'tomato'
//
// });


/* Design Layout */

let home = new Layer ({
  backgroundColor: 'white',
  image: 'home.png',
  size: screen,
  parent: screen
});

let order = new Layer ({
  backgroundColor: '#40434D',
  size: screen,
  width: 375, height: 812,
  parent: screen
});

let grabber = new Layer ({
  parent: order,
  x: 167, y: 54,
  width: 41, height: 5,
  borderRadius: 10,
  backgroundColor: '#A4A6B2',
  opacity: .5
})

let sheet = new Layer ({
  parent: screen,
  size: screen,
  borderRadius: 32,
  y: 220,
  backgroundColor: 'white'
});




/* Phone */

let status = new Layer ({
  image: 'images/statusbar.png',
  width: 375, height: 56,
  parent: screen,
});

let displayShape = new Layer ({
  image: 'images/iphone-14-display-shape.png',
  width: screen.width + 84,
  height: screen.height + 84,
  scale: screen.scale,
  point: Align.center()
});
