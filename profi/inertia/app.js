let textStyle = {
  'font-size' : '12pt',
  'line-height' : '18pt',
  'margin-top' : '3px',
  'font-family' : 'Roboto Mono'
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

// print(scroll.content.props);

scroll.content.clip = false;

let details = new Layer ({
  width: 375, height: 3117,
  image: 'images/Details.jpg',
  parent: scroll.content,
  y: 464 + 24,
  y: 60
});

let user = new Layer ({
  width: 375, height: 544,
  parent: scroll.content,
  image: 'images/User.png',
  y: 60
});

let dots = new Layer({
  size: 24,
  image: 'images/Dots.png',
  parent: scroll.content,
  y: 26, x: 331
});

let orderStatus = new Layer ({
  width: 375, height: 36,
  parent: scroll.content,
  image: 'images/Status.png',
  y: 24,
  x: -5,
  opacity: 0
});

orderStatus.states = {
  statusA: {
    opacity: 0,
    x: -5 - 10,
    animationOptions: {
      curve: 'spring(300, 20, 0)'
    }
  },
  statusB: {
    opacity: 1,
    x: 0,
    animationOptions: {
      curve: 'spring(300, 20, 0)',
      delay: 2
    }
  },
  statusC: {
    opacity: 0,
    x: 5 + 10,
    animationOptions: {
      curve: 'spring(300, 20, 0)',
      delay: 6
    }
  }
};

orderStatus.animate('statusA');

orderStatus.onStateSwitchEnd(function() {
  if (orderStatus.states.current.name == 'statusA') {
    orderStatus.animate('statusB');
  } else if (orderStatus.states.current.name == 'statusB') {
    orderStatus.animate('statusC');
  } else if (orderStatus.states.current.name == 'statusC') {
    orderStatus.animate('statusA');
  };
});

let loupe = new Layer ({
  size: 16,
  parent: orderStatus,
  image: 'images/Loupe.png',
  y: 4, x: 24,
  rotation: 7
});

loupe.states = {
  stateA: {
    x: 24 - 1, y: 4 - 0,
    rotation: 7,
    animationOptions: {curve: 'linear', time: .4}
  },
  stateB: {
    x: 24 - 0, y: 4 + 1,
    rotation: 0,
    animationOptions: {curve: 'linear', time: .2}
  },
  stateC: {
    x: 24 + 1, y: 4 + 0,
    rotation: 7,
    animationOptions: {time: .2}
  },
  stateD: {
    x: 24 + 0, y: 4 - 1,
    rotation: 0,
    animationOptions: {curve: 'linear', time: 0.3}
  }
};

loupe.animate('stateB');

loupe.onStateSwitchEnd(function() {
  if (loupe.states.current.name == 'stateA') {
    loupe.animate('stateB');
  } else if (loupe.states.current.name == 'stateB') {
    loupe.animate('stateC');
  } else if (loupe.states.current.name == 'stateC') {
    loupe.animate('stateD');
  } else if (loupe.states.current.name == 'stateD') {
    loupe.animate('stateA');
  }
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


/* Phone */

let statusBar = new Layer ({
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


/* Description */

let textDarkGrey = '#333'




let description = new Layer({
  x: 30, y: 25,
  height: 50, width: 300,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  style: textStyle,
  color: 'grey',
  html: `
    <b>Profi X</b>
    <p>Жесты.</p><br>
    <p>Scroll Y: 0</p>`
});

scroll.content.onChange('y', function() {
  description.html = `
    <b>Profi X</b>
    <p>Жесты.</p><br>
    <p>Scroll Y: ${-Math.round(scroll.content.y)}</p>
  `;

  // descSwipe.html = `
  // <p style='color: ${textBlue}'>Swipe to Close</p>
  // <p>Scroll Down</p>`
  // `;
});




let descScroll = new Layer({
  x: 30, y: 150,
  height: 50, width: 300,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  style: textStyle,
  color: textDarkGrey,
  html: `
    <p>Scroll Direction</p>`
});

let lastScrollY = scroll.content.y;

scroll.content.onDrag(function() {
  textGreen = '#27AE60';
  textRed = 'tomato'

  let textColor;

  let direction = '↑';

  if (scroll.content.y < lastScrollY) {
    direction = '↑';
    textColor = textGreen;
  } else if (scroll.content.y > lastScrollY) {
    direction = '↓';
    textGreen = textRed;
  } else {
    direction = '';
  }

  descScroll.html = `
    <p style='color: ${textGreen}'>Scroll Direction:</p>
    <p style='color: ${textGreen}; font-family: "Times New Roman";
    transform: scale(2.5) translate(158px, -11px)'>${direction}</div></p>`

  lastScrollY = scroll.content.y
});

scroll.content.onDragEnd(function() {
  descScroll.html = `
  <p>Scroll Direction</p>`
})




let descInertia = new Layer({
  x: 30, y: 200,
  height: 50, width: 300,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  style: textStyle,
  color: textDarkGrey,
  html: `
    <p>Scroll Inertia</p>`
});

scroll.onScrollAnimationDidStart(function() {
  let textYellow = 'gold';
  descInertia.html = `
    <p style='color: ${textYellow}'>Scroll Inertia</p>`
});

scroll.onScrollAnimationDidEnd(function() {
  descInertia.html = `
    <p style='color: ${textDarkGrey}'>Scroll Inertia</p>`
});


// let textBlue = '#3498DB';
// let descSwipe = new Layer({
//   x: 30, y: 340,
//   height: 50, width: 300,
//   backgroundColor: 'rgba(255, 255, 255, 0.05)',
//   backgroundColor: 'rgba(255, 255, 255, 0)',
//   style: textStyle,
//   color: textDarkGrey,
//   html: `
//     <p style='color: ${textBlue}'>Swipe to Close</p>
//     <p>Scroll Down</p>`
// });
