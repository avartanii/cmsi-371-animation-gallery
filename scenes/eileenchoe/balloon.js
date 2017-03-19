
// Bezier Curve Calculation source: http://www.loganfranken.com/blog/64/html5-canvas-balloon/

(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};
    SampleSpriteLibrary.balloon = (specs) => {

        const KAPPA = (4 * (Math.sqrt(2) - 1)) / 3;
        const WIDTH_FACTOR = 0.0333;
        const HEIGHT_FACTOR = 0.4;
        const TIE_WIDTH_FACTOR = 0.12;
        const TIE_HEIGHT_FACTOR = 0.10;
        const TIE_CURVE_FACTOR = 0.13;
        const RADIUS = 40;

        let handleLength = KAPPA * RADIUS;
        let widthDiff = (RADIUS * WIDTH_FACTOR);
        let heightDiff = (RADIUS * HEIGHT_FACTOR);
        let balloonBottomY = RADIUS + heightDiff;

        let rgbToString = (number) => {
            let arr = number.toString().match(/.{1,3}/g);
            return 'rgb(' + arr[0] + ', ' + arr[1] + ', ' + arr[2] + ')';
        };

        let renderingContext = specs.renderingContext;
        let color = rgbToString(specs.color) || "rgb(255,179,71)";
        let angle = specs.angle || 0.0;
        let stringLength = specs.stringLength || RADIUS;

        let drawBalloon = () => {

            renderingContext.save();
            renderingContext.beginPath();

            // Top Left Curve
            var topLeftCurveStartX = -RADIUS;
            var topLeftCurveStartY = 0;

            var topLeftCurveEndX = 0;
            var topLeftCurveEndY = -RADIUS;

            renderingContext.moveTo(topLeftCurveStartX, topLeftCurveStartY);
            renderingContext.bezierCurveTo(topLeftCurveStartX, topLeftCurveStartY - handleLength - widthDiff,
                                    topLeftCurveEndX - handleLength, topLeftCurveEndY,
                                    topLeftCurveEndX, topLeftCurveEndY);

            // Top Right Curve
            var topRightCurveStartX = 0;
            var topRightCurveStartY = -RADIUS;

            var topRightCurveEndX = RADIUS;
            var topRightCurveEndY = 0;

            renderingContext.bezierCurveTo(topRightCurveStartX + handleLength + widthDiff, topRightCurveStartY,
                                    topRightCurveEndX, topRightCurveEndY - handleLength,
                                    topRightCurveEndX, topRightCurveEndY);

            // Bottom Right Curve
            var bottomRightCurveStartX = RADIUS;
            var bottomRightCurveStartY = 0;

            var bottomRightCurveEndX = 0;
            var bottomRightCurveEndY = balloonBottomY;

            renderingContext.bezierCurveTo(bottomRightCurveStartX, bottomRightCurveStartY + handleLength,
                                    bottomRightCurveEndX + handleLength, bottomRightCurveEndY,
                                    bottomRightCurveEndX, bottomRightCurveEndY);

            // Bottom Left Curve
            var bottomLeftCurveStartX = 0;
            var bottomLeftCurveStartY = balloonBottomY;

            var bottomLeftCurveEndX = -RADIUS;
            var bottomLeftCurveEndY = 0;

            renderingContext.bezierCurveTo(bottomLeftCurveStartX - handleLength, bottomLeftCurveStartY,
                                    bottomLeftCurveEndX, bottomLeftCurveEndY + handleLength,
                                    bottomLeftCurveEndX, bottomLeftCurveEndY);

            renderingContext.fillStyle = color;
            renderingContext.fill();

            // Create balloon tie
            var halfTieWidth = (RADIUS * TIE_WIDTH_FACTOR) / 2;
            var tieHeight = (RADIUS * TIE_HEIGHT_FACTOR);
            var tieCurveHeight = (RADIUS * TIE_CURVE_FACTOR);

            renderingContext.beginPath();
            renderingContext.moveTo(-1, balloonBottomY);
            renderingContext.lineTo(-halfTieWidth, balloonBottomY + tieHeight);
            renderingContext.quadraticCurveTo(0, balloonBottomY + tieCurveHeight,
                                        halfTieWidth, balloonBottomY + tieHeight);
            renderingContext.lineTo(1, balloonBottomY);
            renderingContext.fill();

            renderingContext.restore();

        };

        let drawString = () => {
            renderingContext.save();
            // Create string
            renderingContext.beginPath();
            renderingContext.moveTo(0, 0);
            renderingContext.lineTo(0, -stringLength / Math.cos(angle * Math.PI / 180));
            renderingContext.strokeStyle = "#FFFFFF";
            renderingContext.stroke();
            renderingContext.restore();
        };

        let render = () => {
            renderingContext.save();
            renderingContext.translate(Math.tan(angle * Math.PI / 180) * (stringLength), -(stringLength + balloonBottomY));
            drawBalloon();
            renderingContext.restore();
            renderingContext.save();
            renderingContext.rotate(angle * Math.PI / 180);
            drawString();
            renderingContext.restore();
        };
        render();
    };
})();
