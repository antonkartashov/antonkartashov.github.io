let textStyle = {
  'font-size' : '12pt',
  'line-height' : '18pt',
  'margin-top' : '3px',
  'font-family' : 'Roboto Mono',
  'font-weight' : '400'
};

let pageColor = new BackgroundLayer ({
  backgroundColor: 'tomato',
  backgroundColor: '#0a0a0a',
  backgroundColor: '#000',
  // image: 'images/bg.jpg'
});

let screen = new Layer ({
  width: 375, height: 812,
  x: Align.center(), y: Align.center(),
  scale: Screen.height / 812 * 0.9,
  backgroundColor: 'white',
  clip: true,
  borderRadius: 20
});



class Toggle extends Layer {
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
      on: {
        x: 20,
        backgroundColor: this.randomColor,
        options: {time: .1}
      },
      off: {
        x: 0,
        backgroundColor: 'rgba(255, 255, 255, .1)',
        options: {time: .1}
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
      style: options.textStyle
    });

    this.states = {
      on: {options: {time: 0}},
      off: {options: {time: 0}}
    };

    this.onStateSwitchEnd(function() {
      if (this.states.current.name == 'off') {
        this.knob.animate('off');
        this.label.animate({
          color: 'rgba(255, 255, 255, .3)',
          options: {time: .1}
        });
      } else if (this.states.current.name == 'on') {
        this.knob.animate('on');
        this.label.animate({
          color: this.randomColor,
          options: {time: .1}
        });
      };
    });

    this.knob.animate('off');

    // this.onTap(function() {
    //   this.stateCycle('on', 'off');
    // });
  };
};



class Tip extends Layer {
  constructor(options) {
    super(_.defaults(options, {
      style: {
        'font-size' : '12pt',
        'line-height' : '18pt',
        'margin-top' : '3px',
        'font-family' : 'Roboto Mono',
        'font-weight' : '400'
      },
      color: '#555',
      backgroundColor: '',
      // backgroundColor: 'rgba(255, 0, 0, .15)',
      width: 300, height: 30
    }));

    if (!options.html) {this.html = `йо`;}

    if (!options.x) {this.x = 40;}
    if (!options.y) {this.y = 35;}

  };
};
