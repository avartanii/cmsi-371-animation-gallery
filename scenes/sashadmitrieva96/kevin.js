(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const kevinWidth = 840;
    const kevinHeight = 195;
    const frameTotal = 4;
    let kevinReady = false;

    let kevinImage = new Image();
    kevinImage.addEventListener('load', () => {
        kevinReady = true;
    });
    kevinImage.src = "kevin.png";


    SampleSpriteLibrary.kevinSprite = (kevinDetails) => {
        let renderingContext = kevinDetails.renderingContext;
        let pointStage = kevinDetails.pointStage || 0;
        renderingContext.save();
        if (kevinReady) {
            renderingContext.drawImage(
                kevinImage,
                pointStage * kevinWidth / frameTotal,
                0,
                kevinWidth / frameTotal,
                kevinHeight,
                0,
                0,
                kevinWidth / frameTotal,
                kevinHeight
            );
        }
        renderingContext.restore();
    };
})();
