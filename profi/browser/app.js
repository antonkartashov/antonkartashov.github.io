let bg = new BackgroundLayer ({
  backgroundColor: '#e5e5e5',
  backgroundColor: '#3C3F49',
});

let screen = new Layer({
  backgroundColor: '#3C3F49',
  size: Screen.size,
  clip: true
});

let white = new ScrollComponent({
  parent: screen,
  width: Screen.width,
  height: Screen.height - 228 * 2,
  y: 228 * 2,
  backgroundColor: 'white',
  borderRadius: 32 * 2,
  scrollHorizontal: false,
});

for (let i = 0; i < 20; i++) {
  let item = new Layer({
    parent: white.content,
    width: Screen.width - 32 * 2,
    x: 16 * 2,
    y: 32 + i * 220,
    opacity: 20,
    borderRadius: 40,
    opacity: .5
  });
}
