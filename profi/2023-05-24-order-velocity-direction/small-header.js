let smallOrderStatus = new Layer({
  parent: order,
  x: 0, y: 76,
  height: 24, width: 375,
  backgroundColor: 'rgba(255, 255, 255, 0)',
  image: 'images/Small-OrderStatus.png',
  opacity: 1
});

smallOrderStatus.states = {
  on: {
    y: 76, opacity: 1,
    animationOptions: {time: .6, delay: .15}
  },
  off: {
    y: 66, opacity: 0,
    animationOptions: {time: .6}
  },
};


let smallOrderTitle = new Layer({
  parent: order,
  x: 0, y: 86,
  height: 24, width: 375,
  backgroundColor: 'rgba(255, 255, 255, 0)',
  image: 'images/Small-OrderTitle.png',
  opacity: 0
});

smallOrderTitle.states = {
  on: {
    y: 76, opacity: 1,
    animationOptions: {time: .6, delay: .15}
  },
  off: {
    y: 86, opacity: 0,
    animationOptions: {time: .6}
  },
};

smallOrderStatus.animate('on');
smallOrderTitle.animate('off');

scroll.content.onChange('y', function() {
  if (scroll.content.y <= -102) {
    if (smallOrderStatus.states.current.name == 'on') {
      smallOrderStatus.animate('off');
    };
    if (smallOrderTitle.states.current.name == 'off') {
      smallOrderTitle.animate('on');
    };
  } else {
    if (smallOrderStatus.states.current.name == 'off') {
      smallOrderStatus.animate('on');
    };
    if (smallOrderTitle.states.current.name == 'on') {
      smallOrderTitle.animate('off');
    };
  }
})
