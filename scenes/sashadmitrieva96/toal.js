(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const toalWidth = 900;
    const toalHeight = 270;
    const frameTotal = 5;
    let toalReady = false;

    let toalImage = new Image();
    toalImage.addEventListener('load', () => {
        toalReady = true;
    });
    toalImage.src = "toal.png";

    SampleSpriteLibrary.toalSprite = (toalDetails) => {
        let renderingContext = toalDetails.renderingContext;
        let armStage = toalDetails.armStage || 0;
        renderingContext.save();
        if (toalReady) {
            renderingContext.drawImage(
                toalImage,
                armStage * toalWidth / frameTotal,
                0,
                toalWidth / frameTotal,
                toalHeight,
                0,
                0,
                toalWidth / frameTotal,
                toalHeight
            );
        }
        renderingContext.restore();
    };
})();
