(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};
    SampleSpriteLibrary.cloud = (specs) => {

        let renderingContext = specs.renderingContext;

        let drawCloud = () => {
            renderingContext.beginPath();
            renderingContext.moveTo(0, 0);
            // Initial Bezier Curves modeled after: http://www.html5canvastutorials.com/
            // advanced/html5-canvas-save-drawing-as-an-image/
            renderingContext.bezierCurveTo(-40, 20, -40, 70, 60, 70);
            renderingContext.bezierCurveTo(80, 100, 150, 100, 170, 70);
            renderingContext.bezierCurveTo(250, 70, 250, 40, 220, 20);
            renderingContext.bezierCurveTo(260, -40, 200, -50, 170, -30);
            renderingContext.bezierCurveTo(150, -75, 80, -60, 80, -30);
            renderingContext.bezierCurveTo(30, -75, -20, -60, 0, 0);
            renderingContext.closePath();
            renderingContext.fillStyle = '#FFFFFF';
            renderingContext.fill();
        };
        drawCloud();
    };
})();
