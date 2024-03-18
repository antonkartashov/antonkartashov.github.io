
let filterScreen = new Layer ({
  size: Screen.size,
  backgroundColor: '#EBE3D6',
});


/* Scroll */

let scroll = new ScrollComponent ({
  parent: filterScreen,
  width: Screen.width,
  height: Screen.height,
  y: 68 * 2,
  backgroundColor: '#F4F5F8',
  borderRadius: 32 * 2,
  scrollHorizontal: false
});

let a = new Layer({
  parent: scroll.content,
  backgroundColor: 'white'
});

scroll.updateContent();

/* Scroll Header */

let header = new Layer({
  parent: filterScreen,
  height: (292 + 68) * 2,
  width: Screen.width,
  backgroundColor: filterScreen.backgroundColor
});

let title = new Layer({
  parent: header,
  image: 'images/title-1.png',
  width: 375 * 2, height: 44 * 2,
  y: 68 * 2
});

let catalog = new ScrollComponent({
  parent: header,
  width: Screen.width,
  height: 168 * 2,
  y: 112 * 2,
  scrollVertical: false
})

for (let i = 0; i < 7; i++) {
  let page = new Layer({
    width: 136 * 2,
    height: 160 * 2,
    image: `images/Catalog/m${i + 1}.png`,
    parent: catalog.content,
    y: 8 * 2,
    x: 20 * 2 + i * 148 * 2
  });
}


/* Chrome */

let layerA = new Layer ({
  parent: filterScreen,
  width: Screen.width,
  height: 58 * 2,
  backgroundColor: filterScreen.backgroundColor
});

let grabber = new Layer ({
  parent: filterScreen,
  width: 41 * 2,
  height: 5 * 2,
  x: Align.center(),
  y: 50 * 2,
  borderRadius: 20,
  backgroundColor: 'rgba(0, 0, 0, .2)'
});

let blackout = new Layer({
  parent: filterScreen,
  size: Screen.size,
  backgroundColor: 'black',
  opacity: 0
});
