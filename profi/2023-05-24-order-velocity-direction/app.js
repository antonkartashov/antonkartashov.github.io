let swipeToClose = true;



scroll.content.onChange('y', function() {

  /* Если Scroll Y не равен нулю */
  if (Math.round(scroll.content.y) < 0) {
    swipeToClose = false;
  };

  /* Анимация большого заголовка заказа */
  if (-scroll.content.y <= 112) {
    orderTitle.y = 124 + Math.round(scroll.content.y) / 5;
  };
  orderTitle.opacity = 1.2 + Math.round(scroll.content.y) * .011;


  /* Описания, которые слева */
  if (Math.round(scroll.content.y) < 0) {
    toggle.animate('on');

    tipTop.props = {html: `
      <p style='color: ${txtColors.blue}'>Скролл:</p>
      <p style='color: ${txtColors.blue}'>${-Math.round(scroll.content.y)}</p>
    `};

    tipDrag.html= `<p style='color: ${txtColors.blue}'>Scroll</p>`;
  };

  // print(`scroll.content.y: ${Math.round(scroll.content.y)}`);
  // print(`atTheTop: ${atTheTop}, swipeToClose: ${swipeToClose}, scrollVertical: ${scroll.scrollVertical}`);

});


scroll.onScrollAnimationDidStart(function() {
  // let textYellow = 'gold';
  // descInertia.html = `
  //   <p style='color: ${textYellow}'>Scroll Inertia</p>`
});

scroll.onScrollAnimationDidEnd(function() {
  if (Math.round(scroll.content.y) == 0) {
    swipeToClose = true;
    scroll.scrollVertical = true;

    /* Описания, которые слева */
    toggle.animate('off');

    tipTop.props = {html: `
      <p style='color: ${txtColors.red}'>Скролл:</p>
      <p style='color: ${txtColors.red}'>0</p>
    `};

    tipDrag.html = `<p style='color: ${txtColors.red}'>Pull-down</p>`;
  };
});

scroll.content.onDrag(function(event) {

  if (event.velocityY > 0 && swipeToClose) {
    scroll.scrollVertical = false;
  }

  /* Логика смахивания вниз */
  if (swipeToClose) {

    if (order.y >= 0) {
      order.y = event.point.y - event.start.y;
      scroll.y = 126;
      scroll.height = screen.height - 126;
      orderTitle.y = 124;
    } else {
      scroll.y = 126 + (event.point.y - event.start.y) / 4;
      scroll.height = 696 - (event.point.y - event.start.y) / 4;
      orderTitle.y = 124 + (event.point.y - event.start.y) / 8;
      orderTitle.opacity = 1 + (event.point.y - event.start.y) * 0.004;
    }

  };
});

scroll.content.onDragEnd(function() {
  if (swipeToClose == true) {
    order.animate({y: 0, options: {time: .5}});
    scroll.animate({y: 126, options: {time: .5}});
    scroll.scrollToTop();

    orderTitle.animate({
      y: 124,
      opacity: 1,
      options: {time: .5}
    });

    swipeToClose = true;
    scroll.scrollVertical = true;
  };
});


/* Скругления у шторки всего заказа */
order.onChange('y', function() {
  if (order.y > 30) {
    order.animate({
      borderRadius: 32,
      options: {time: .15}
    });
  } else {
    order.animate({
      borderRadius: 0,
      options: {time: .15}
    });
  };

  order.scale = 1 - order.y * 0.0002

  /* Описания, которые слева */
  if (order.y > 0) {
    tipTop.props = {html: `
      <p'>Скролл:</p>
      <p'>заблокирован</p>
    `};

    tipOrder.props = {html: `
      <p style='color: ${txtColors.green}'>Шторка заказа:</p>
      <p style='color: ${txtColors.green}'>${Math.round(order.y)}</p>
    `};

  } else {
    tipTop.props = {html: `
      <p style='color: ${txtColors.red}'>Скролл:</p>
      <p style='color: ${txtColors.red}'>0</p>
    `};

    tipOrder.props = {html: `
      <p>Шторка заказа:</p>
      <p>${Math.round(order.y)}</p>
    `};


  }
});





/* Описания, которые слева */

let txtColors = {
  dark:   '#333',
  red:    'tomato',
  green:  '#27AE60',
  blue:   '#3498DB'
};


let tipScroll = new Tip ({
  color: txtColors.dark,
  html: `
    <p style='color: ${txtColors.red}'>scrollY:</p>
    <p style='color: ${txtColors.red}'>0</p>
  `
});

let tipVelocity = new Tip ({
  y: 120,
  color: txtColors.dark,
  html: `
    <p'>drag.event.velocity.y:</p>
    <p'>0</p>
  `
});

let tipPullDown = new Tip ({
  y: 205,
  color: txtColors.dark,
  html: `
    <p'>orderSheet.y:</p>
    <p'>0</p>
  `
});



let toggle = new Toggle ({
  x: 36, y: 335
});

toggle.knob.states.off.backgroundColor = txtColors.red;
toggle.knob.states.on.backgroundColor = txtColors.blue;
toggle.knob.stateSwitch('off');

let tipFlag = new Tip ({
  y: 335, x: 100,
  color: txtColors.dark,
  html: `<p style='color: ${txtColors.red}'>Pull-down</p>`
});
