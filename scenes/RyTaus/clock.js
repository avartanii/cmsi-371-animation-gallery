window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

SampleSpriteLibrary.clock = ((specs) => {

    const rc = specs.renderingContext;

    let frameColor = "blue";
    let secondHand = specs.secondHand || 0;
    let minuteHand = specs.minuteHand || 0;
    let hourHand = specs.hourHand || 0;

    let render = () => {
        rc.save();
        drawFrame();
        rc.fillStyle = "black";

        drawHand(hourHand, 25, 2);
        drawHand(minuteHand, 40, 1);
        rc.fillStyle = "red";
        drawHand(secondHand, 25, 1);
        rc.restore();
    };

    let drawHand = (angle, length, width) => {
        rc.save();
        rc.rotate((angle - 180) * Math.PI / 180);
        rc.fillRect(0, 0, width, length);
        rc.restore();
    };

    let drawFrame = () => {
        rc.beginPath();
        rc.arc(0, 0, 50, 0, 2 * Math.PI, false);
        rc.fillStyle = frameColor;
        rc.fill();
        rc.beginPath();
        rc.arc(0, 0, 45, 0, 2 * Math.PI, false);
        rc.fillStyle = "white";
        rc.fill();
    };



    render();

});
