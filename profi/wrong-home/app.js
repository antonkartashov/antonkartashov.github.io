let pullDown = true;

order.draggable.horizontal = false;
scroll.scrollVertical = false;

order.onDrag(function(event) {
  if (order.y >= 0) {
    order.y = event.point.y - event.start.y;
    order.y = 126;
    order.height = screen.height - 126;
    orderTitle.y = 124;
  } else {
    scroll.y = 126 + (event.point.y - event.start.y) / 4;
    scroll.height = 696 - (event.point.y - event.start.y) / 4;
    orderTitle.y = 124 + (event.point.y - event.start.y) / 8;
    orderTitle.opacity = 1 + (event.point.y - event.start.y) * 0.004;
  };
});


order.onDragEnd(function() {
  order.animate({y: 0, options: {time: .5}});

  });
});

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
