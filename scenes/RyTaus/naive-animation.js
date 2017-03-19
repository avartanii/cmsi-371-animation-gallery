(() => {
    let canvas = $("#canvas")[0];
    let renderingContext = canvas.getContext("2d");

    // This is effectively a visual tester, so we just lay out our variables without much structure.

    let face = {x: 200, y: 200};
    let faceRot = 0;
    let mouthHeight = 0;
    let pupilOffset = {
        x: .2,
        y: -.1
    };

    let secondHand = 0;
    let minuteHand = 0;
    let hourHand = 0;

    let clockScale = 1;
    let dcs = -.01;

    let ds = 300 * Math.PI / 180;
    let dm = 5 * Math.PI / 180;
    let dh = (5 / 60) * Math.PI / 180;

    let dx = .1;
    let dy = -.2;

    const FRAME_DURATION = 30; // In milliseconds.

    let lastTimestamp = 0;
    let drawFrame = (timestamp) => {
        lastTimestamp = lastTimestamp || timestamp;
        if (timestamp - lastTimestamp < FRAME_DURATION) {
            window.requestAnimationFrame(drawFrame);
            return;
        }

        lastTimestamp = timestamp;

        renderingContext.clearRect(0, 0, canvas.width, canvas.height);

        renderingContext.save();
        renderingContext.translate(canvas.width / 2, 100);
        renderingContext.scale(clockScale, clockScale);
        SampleSpriteLibrary.clock({
            renderingContext,
            secondHand,
            minuteHand,
            hourHand
        });
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(face.x, face.y);
        renderingContext.rotate(faceRot);
        SampleSpriteLibrary.face({
            renderingContext,
            pupilOffset,
            mouthHeight
        });
        renderingContext.restore();

        renderingContext.save();

        SampleSpriteLibrary.keyboard({
            renderingContext,
            tl: secondHand % 30 / 30,
            tm: secondHand % 80 / 78,
            tr: secondHand % 77 / 18,
            ml: secondHand % 19 / 8,
            mm: secondHand % 99 / 8,
            mr: secondHand % 10 / 8,
            bl: secondHand % 44 / 28,
            bm: secondHand % 69 / 28,
            br: secondHand % 69 / 48
        });
        renderingContext.restore();


        secondHand += ds;
        minuteHand += dm;
        hourHand += dh;
        faceRot = faceRot + (Math.PI / 180);

        face.x += 1;
        if (face.x > canvas.width * .8) {
            face.x = canvas.width * .2;
        }


        pupilOffset.x += -dx;
        pupilOffset.y += dy;
        // mouthHeight += 1;
        if (pupilOffset.x < -.5 || pupilOffset.x > .5) {
            dx = -dx;
        }
        if (pupilOffset.y < -.5 || pupilOffset.y > .5) {
            dy = -dy;
        }

        clockScale += dcs;
        if (clockScale < .3) {
            dcs = .03;
        } else if (clockScale > 2) {
            dcs = -.01;
        }

        window.requestAnimationFrame(drawFrame);
    };

    window.requestAnimationFrame(drawFrame);
})();
