(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const sashaWidth = 495;
    const sashaHeight = 238;
    const frameTotal = 3;
    let sashaReady = false;

    let sashaImage = new Image();
    sashaImage.addEventListener('load', () => {
        sashaReady = true;
    });
    sashaImage.src = "sasha.png";

    SampleSpriteLibrary.sashaSprite = (sashaDetails) => {
        let renderingContext = sashaDetails.renderingContext;
        let poseStage = sashaDetails.poseStage || 0;
        renderingContext.save();
        if (sashaReady) {
            renderingContext.drawImage(
                sashaImage,
                poseStage * sashaWidth / frameTotal,
                0,
                sashaWidth / frameTotal,
                sashaHeight,
                0,
                0,
                sashaWidth / frameTotal,
                sashaHeight
            );
        }
        renderingContext.restore();
    };
})();
