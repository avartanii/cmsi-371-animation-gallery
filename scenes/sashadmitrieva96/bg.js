(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    let bgReady = false;
    let bgImage = new Image();
    bgImage.addEventListener('load', () => {
        bgReady = true;
    });
    bgImage.src = "bg.png";

    SampleSpriteLibrary.bg = (bgDetails) => {
        let renderingContext = bgDetails.renderingContext;
        renderingContext.save();
        if (bgReady) {
            renderingContext.drawImage(bgImage, 0, 0);
        }
        renderingContext.restore();
    };
})();
