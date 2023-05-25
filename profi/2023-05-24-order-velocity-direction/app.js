let opp = 1;
// opp = 0;

let pullDown = true;

scroll.content.onChange('y', function() {

  /* Если Scroll Y не равен нулю, т.е. проскролено вниз */
  /* Свай */
  if (Math.round(scroll.content.y) < 0) {
    pullDown = false;
  };

  /* Анимация большого заголовка заказа */
  if (-scroll.content.y <= 112) {
    orderTitle.y = 124 + Math.round(scroll.content.y) / 5;
  };
  orderTitle.opacity = 1.2 + Math.round(scroll.content.y) * .011;


  /* Описания, которые слева */
  if (Math.round(scroll.content.y) < 0) {

    tipScroll.html = `
      <p style='color: ${txtColors.red}'>scrollY:</p>
      <p style='color: ${txtColors.red}'>${-Math.round(scroll.content.y)}</p>
    `;

    tipPulldown.html = `
      <p>orderSheet.y:</p>
      <p>0</p>
    `;

    blockPulldown.animate('on');
    blockPulldownLabel.color = txtColors.red;
  };

});


// scroll.onScrollAnimationDidStart(function() {
  // let textYellow = 'gold';
  // descInertia.html = `
  //   <p style='color: ${textYellow}'>Scroll Inertia</p>`
// });

scroll.onScrollAnimationDidEnd(function() {
  if (Math.round(scroll.content.y) == 0) {
    pullDown = true;
    scroll.scrollVertical = true;

    /* Описания, которые слева */
    blockPulldown.animate('off');
    blockPulldownLabel.color = txtColors.dark;

    tipScroll.props = {html: `
      <p>scrollY:</p>
      <p>0</p>
    `};

    tipVelocity.props = {
      color: txtColors.dark,
      html: `
        <p>drag.event.velocityY:</p>
        <p>0</p>
    `};
  };
});



scroll.content.onDrag(function(event) {

  /* Если drag.event.velocityY направлена вниз, юзер пытается смахнуть шторку */
  /* Блокируем скролл */
  if (event.velocityY > 0 && pullDown) {
    scroll.scrollVertical = false;
  }

  /* Логика смахивания вниз */
  if (pullDown) {

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

  /* Описания, которые слева */
  let dir = '▲';

  if (pullDown) {

    blockScroll.animate('on');
    blockScrollLabel.color = txtColors.blue;

    tipPulldown.props = {
      color: txtColors.blue,
      html: `
        <p>orderSheet.y:</p>
        <p>${order.y}</p>
    `};

    tipVelocity.color = txtColors.blue;

    if (event.velocityY > 0) {dir = `▼`}
    else if (event.velocityY < 0) {dir = `▲`}
    else if (event.velocityY == 0) {dir = ``};

  } else {
    tipVelocity.color = txtColors.red;

    if (event.velocityY > 0) {dir = `▲`}
    else if (event.velocityY < 0) {dir = `▼`}
    else if (event.velocityY == 0) {dir = ``};
  }

  tipVelocity.html = `
    <p'>drag.event.velocityY:</p>
    <p'>${dir} ${Math.abs(Utils.round(event.velocityY, 3))}</p>
  `;
});



scroll.content.onDragEnd(function() {

  if (pullDown == true) {
    order.animate({y: 0, options: {time: .5}});
    scroll.animate({y: 126, options: {time: .5}});
    scroll.scrollToTop();

    orderTitle.animate({
      y: 124,
      opacity: 1,
      options: {time: .5}
    });

    pullDown = true;
    scroll.scrollVertical = true;
  };

  /* Описания, которые слева */
  tipVelocity.props = {
    color: txtColors.dark,
    html: `
      <p>drag.event.velocityY:</p>
      <p>0</p>
  `};
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

    tipPulldown.html = `
      <p>orderSheet.y:</p>
      <p>${Math.round(order.y)}</p>
    `;

  } else {

    blockScroll.animate('off');
    blockScrollLabel.color = txtColors.dark;

    tipPulldown.props = {
      color: txtColors.dark,
      html: `
        <p>orderSheet.y:</p>
        <p>${Math.round(order.y)}</p>
    `};
  }
});





/* Описания, которые слева */

let txtColors = {
  dark:   '#333',
  dark:   '#888',
  red:    'tomato',
  green:  '#27AE60',
  blue:   '#3498DB'
};

let tipScroll = new Tip ({
  y: 40,
  opacity: opp,
  color: txtColors.dark,
  html: `
    <p>scrollY:</p>
    <p>0</p>
  `
});

let tipPulldown = new Tip ({
  y: 110,
  opacity: opp,
  color: txtColors.dark,
  html: `
    <p>orderSheet.y:</p>
    <p>0</p>
  `
});

let tipVelocity = new Tip ({
  y: 180,
  opacity: opp,
  color: txtColors.dark,
  html: `
    <p'>drag.event.velocityY:</p>
    <p'>0</p>
  `
});




let blockScroll = new Toggle ({
  x: 36, y: 300,
  opacity: opp
});

blockScroll.knob.states.on.backgroundColor = txtColors.blue;
blockScroll.knob.stateSwitch('off');

let blockScrollLabel = new Tip ({
  x: 100, y: 300,
  opacity: opp,
  color: txtColors.dark,
  html: `<p>Scroll is blocked</p>`
});




let blockPulldown = new Toggle ({
  x: 36, y: 350,
  opacity: opp
});

blockPulldown.knob.states.on.backgroundColor = txtColors.red;
blockPulldown.knob.stateSwitch('off');

let blockPulldownLabel = new Tip ({
  x: 100, y: 350,
  opacity: opp,
  color: txtColors.dark,
  html: `<p>Pull-down is blocked</p>`
});
