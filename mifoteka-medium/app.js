bg = new BackgroundLayer ({backgroundColor: '#999'})

let iPhoneX = {width: 375, height: 812}

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

// let player = new PageComponent({
//     size: phone.size,
//     parent: phone,
//     scrollHorizontal: false
// });
//
// for (let i of [0, 1]) {
//     new Layer({
//         parent: player.content,
//         y: i * player.height,
//         size: player.size,
//         backgroundColor: Utils.randomColor()
//     })
// };

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
    height: 57
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

player.onChange('y', ()=> {
    mini.opacity = Utils.modulate(
        player.y, [674, 0],
                  [1,   0]
    );

    fullscreen.opacity = Utils.modulate(
        player.y, [674 - 56, 0],
                  [0,   1]
    );

    tabBar.y = Utils.modulate(
        player.y, [674, 0],
                  [728, 728 + tabBar.height],
                  true
    );

    // phoneBg.scale = Utils.modulate(
    //     player.y, [674, -56],
    //               [1,   0.95],
    //               true
    // );
    // overlay.opacity = Utils.modulate(
    //     player.y, [674, -56],
    //               [0,   0.15],
    //               true
    // );

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
