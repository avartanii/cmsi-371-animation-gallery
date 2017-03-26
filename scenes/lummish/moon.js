(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const WIDTH = 400,
        HEIGHT = 400;

    // initialize moon image
    let moon = new Image(),
        moonLoaded = false;

    // load image source (from http://www.clipartsfree.net/clipart/17782-moon-in-comic-style-clipart.html)
    moon.src = "Images/moon.svg";

    // when moon is loaded, allow drawing
    moon.onload = () => {
        moonLoaded = true;
    };

    let drawMoon = (renderingContext) => {
        if (moonLoaded) {
            renderingContext.drawImage(moon, -WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);
        }
    };

    SampleSpriteLibrary.moon = (moonSpec) => {
        let renderingContext = moonSpec.renderingContext;

        renderingContext.save();
        drawMoon(renderingContext);
        renderingContext.restore();
    };
})();
