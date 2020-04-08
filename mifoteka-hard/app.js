bg = new BackgroundLayer ({backgroundColor: '111'})

let iPhoneX = {
    width: 375,
    height: 812
};

let phone = new Layer ({
    size: iPhoneX,
    point: Align.center(),
    scale: Screen.height / 812 * 0.9,
    backgroundColor: 'white',
    clip: true
});
let phoneBg = new Layer ({
    parent: phone,
    size: iPhoneX,
    image: 'images/Screen.png'
});
let overlay = new Layer ({
    parent: phone,
    size: iPhoneX,
    backgroundColor: 'black',
    scale: 1.5,
    opacity: 0
})
let player = new Layer ({
    parent: phone,
    width: iPhoneX.width,
    height: 56 + iPhoneX.height,
    // image: 'images/player bg.png',
    backgroundColor: 'white',
    shadowY: -1,
    shadowBlur: 1,
    shadowColor: 'rgba(0, 0, 0, .15)',
    y: 674,
    clip: true
});
let fullscreen = new Layer ({
    parent: player,
    size: iPhoneX,
    image: 'images/PlayerFullscreen.png',
    // backgroundColor: 'aquamarine',
    y: 56,
    opacity: 0
});
let closeButton = new Layer ({
    parent: fullscreen,
    size: 56,
    y: 36,
    backgroundColor: null
});
let white = new Layer ({
    parent: fullscreen,
    size: iPhoneX,
    y: fullscreen.height - 2,
    backgroundColor: 'white'
});
let mini = new Layer ({
    parent: player,
    image: 'images/PlayerMini.png',
    // backgroundColor: 'tomato',
    width: iPhoneX.width,
    height: 56
});
let tabBar = new Layer ({
    parent: phone,
    image: 'images/TabBar.png',
    // backgroundColor: 'gold',
    width: iPhoneX.width,
    height: 84,
    y: 728
});

player.draggable.horizontal = false;

player.draggable.constraints = {
    width: iPhoneX.width,
    height: iPhoneX.height - (tabBar.height - 1) + player.height,
    y: -56
};

let bibliotekaAnimation = {
    time: 3,
    curve: 'ease-out',
    curve: 'spring(250, 25, 10)'
}

mini.onTap(()=> {
    player.y = 673;
    player.animate({y: -56, options: bibliotekaAnimation});
})

player.onDragEnd(()=> {
    if (player.draggable.direction == 'up') {
        player.animate({y: -56, options: bibliotekaAnimation});
    } else if (player.draggable.direction = 'down') {
        player.animate({y: 674, options: bibliotekaAnimation});
    }
});

let cover = new Layer ({
    parent: player,
    width: 243, height: 344,
    scale: 1 / 9,
    image: 'images/Cover.png',
    x: -92, y: -144,
    shadowY: 15,
    shadowBlur: 40,
    shadowColor: 'rgba(0, 0, 0, .2)'
});

player.onChange('y', ()=> {
    mini.opacity = Utils.modulate(
        player.y, [674 - 56, 400],
                  [1,   0]);

    fullscreen.opacity = Utils.modulate(
        player.y, [674 - 56, 400],
                  [0,        1]);

    tabBar.y = Utils.modulate(
        player.y, [674, 0],
                  [728, 728 + tabBar.height],
                  true);


    // cover.x = Utils.modulate(
    //     player.y, [674, 200],
    //               [-92, 66],
    //               true);
    //
    // cover.y = Utils.modulate(
    //     player.y, [674,   0],
    //               [-144, 66 + 56],
    //               true);


    kx = Utils.modulate(
        player.y, [674, -56],
                  [1, 0],
                  true);

    cover.x = -92 + 158 * (1 - kx * kx * kx * kx);

    ky = Utils.modulate(
        player.y, [674, -56],
                  [0, 1],
                  true);

    cover.y = -144 + 266 * ky * ky

    cover.scale = 1/9 + (1 - 1/9) * (1 - kx * kx * kx * kx);

    cover.scale = Utils.modulate(
        player.y, [674, -56],
                  [1/9, 1],
                  true);

    fullscreen.y = Utils.modulate(
        player.y, [674 + 40, -56],
                  [-444, 56],
                  true);

    mini.y = Utils.modulate(
        player.y, [674, -56 - 40],
                  [0, 500],
                  true);

    mini.scale = Utils.modulate(
        player.y, [674, -56 - 40],
                  [1, 1.3],
                  true);


    cover.scale = Utils.modulate(
        player.y, [674, -56],
                  [1/9, 1],
                  true);

    phoneBg.scale = Utils.modulate(
        player.y, [674, -56],
                  [1,   0.95],
                  true);
    overlay.opacity = Utils.modulate(
        player.y, [674, -56],
                  [0,   0.15],
                  true);

});

closeButton.onTap(()=> {
    player.animate({y: 674, options: bibliotekaAnimation});
});

let status = new Layer ({
    image: 'StatusBar.png',
    width: iPhoneX.width,
    height: 44,
    parent: phone,
});

let displayShape = new Layer ({
    image: 'DisplayShape.png',
    width: iPhoneX.width + 80,
    height: iPhoneX.height + 80,
    scale: phone.scale,
    // opacity: .8,
    point: Align.center()
});
