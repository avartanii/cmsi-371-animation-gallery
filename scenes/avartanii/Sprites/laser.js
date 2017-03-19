(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const LASER_HEIGHT = 200;
    const LASER_WIDTH = LASER_HEIGHT;


    // Hold off on drawing
    let readyLaser = false;

    // Import and prime images for drawing
    var laser = new Image();
    laser.onload = () => {
        readyLaser = true;
    };
    laser.src = "Images/shots/laser.svg";

    let drawLaser = (renderingContext) => {
        renderingContext.save();
        if (readyLaser) {
            renderingContext.drawImage(laser, -LASER_WIDTH / 2, -LASER_HEIGHT / 2, LASER_WIDTH, LASER_HEIGHT);
        }
        renderingContext.restore();
    };

    SampleSpriteLibrary.laser = (pew) => {
        let renderingContext = pew.renderingContext;

        renderingContext.save();
        drawLaser(renderingContext);
        renderingContext.restore();
    };
})();
