/*
* A simple keyframe-tweening animation module for 2D
* canvas elements.
*/
(() => {
    // The big one: animation initialization.  The settings parameter
    // is expected to be a JavaScript object with the following
    // properties:
    //
    // - renderingContext: the 2D canvas rendering context to use
    // - width: the width of the canvas element
    // - height: the height of the canvas element
    // - scene: the array of sprites to animate
    // - frameRate: number of frames per second (default 24)
    //
    // In turn, each sprite is a JavaScript object with the following
    // properties:
    //
    // - draw: the function that draws the sprite
    // - keyframes: the array of keyframes that the sprite should follow
    //
    // Finally, each keyframe is a JavaScript object with the following
    // properties.  Unlike the other objects, defaults are provided in
    // case a property is not present:
    //
    // - frame: the global animation frame number in which this keyframe
    //          is to appear
    // - ease: the easing function to use (default is KeyframeTweener.linear)
    // - tx, ty: the location of the sprite (default is 0, 0)
    // - sx, sy: the scale factor of the sprite (default is 1, 1)
    // - rotate: the rotation angle of the sprite (default is 0)
    let initializeAnimation = (settings) => {
        // We need to keep track of the current frame.
        let currentFrame = 0;

        let keyframeData = {};

        // Avoid having to go through settings to get to the
        // rendering context and sprites.
        let renderingContext = settings.renderingContext;
        let width = settings.width;
        let height = settings.height;
        let scene = settings.scene;

        let previousTimestamp = null;

        let nextFrame = (timestamp) => {

            let checkPastFrames = (sprite, value, defaultVal) => {
                if (keyframeData[sprite].hasOwnProperty(value)) {
                    let reference = keyframeData[sprite][value];
                    let previousFrame = 0;
                    for (let frameNumber in reference) {
                        if (reference.hasOwnProperty(frameNumber)) {
                            if (frameNumber > currentFrame) {
                                return {val: (reference[previousFrame] || defaultVal), frame: previousFrame};
                            } else {
                                previousFrame = frameNumber;
                            }
                        }
                    }
                    return {val: reference[previousFrame], frame: currentFrame};
                } else {
                    return {val: defaultVal, frame: currentFrame};
                }
            };

            let checkFutureFrames = (sprite, value, defaultVal) => {
                if (keyframeData[sprite].hasOwnProperty(value)) {
                    let reference = keyframeData[sprite][value];
                    let lastFrame = 0;
                    for (let frameNumber in reference) {
                        if (reference.hasOwnProperty(frameNumber)) {
                            if (frameNumber > currentFrame) {
                                return {val: reference[frameNumber], frame: frameNumber};
                            } else if (frameNumber < currentFrame) {
                                lastFrame = frameNumber;
                            }
                        }
                    }
                    return {val: reference[lastFrame], frame: lastFrame};
                } else {
                    return {val: defaultVal, frame: currentFrame};
                }
            };

            // Bail-out #1: We just started.
            if (!previousTimestamp) {
                previousTimestamp = timestamp;
                window.requestAnimationFrame(nextFrame);
                return;
            }

            // Bail-out #2: Too soon.
            if (timestamp - previousTimestamp < (1000 / (settings.frameRate || 24))) {
                window.requestAnimationFrame(nextFrame);
                return;
            }

            // Clear the canvas.
            renderingContext.clearRect(0, 0, width, height);

            // For every sprite, go to the current pair of keyframes.
            // Then, draw the sprite based on the current frame.
            for (let i = 0, maxI = scene.length; i < maxI; i += 1) {
                for (let j = 0, maxJ = scene[i].keyframes.length - 1; j < maxJ; j += 1) {
                    // We look for keyframe pairs such that the current
                    // frame is between their frame numbers.
                    if ((scene[i].keyframes[j].frame <= currentFrame) &&
                    (currentFrame < scene[i].keyframes[j + 1].frame)) {
                        // Point to the start and end keyframes.
                        let startKeyframe = scene[i].keyframes[j];
                        let endKeyframe = scene[i].keyframes[j + 1];

                        // Save the rendering context state.
                        renderingContext.save();

                        // Set up our start and distance values, using defaults
                        // if necessary.
                        let ease = KeyframeTweener[startKeyframe.ease ||
                            checkPastFrames(scene[i]["sprite"], "ease", "linear").val];

                        // ************************************************************
                        let val = "tx";
                        let past = checkPastFrames(scene[i]["sprite"], val, 0);
                        let future = checkFutureFrames(scene[i]["sprite"], val, 0);
                        // ************************************************************

                        let txStart = startKeyframe.tx || past.val;
                        let txDistance = (endKeyframe.tx || future.val) - txStart;

                        let txCurrentTweenFrame = currentFrame - past.frame;
                        let txDuration = future.frame - past.frame;

                        // ************************************************************
                        val = "ty";
                        past = checkPastFrames(scene[i]["sprite"], val, 0);
                        future = checkFutureFrames(scene[i]["sprite"], val, 0);
                        // ************************************************************

                        let tyStart = startKeyframe.ty || past.val;
                        let tyDistance = (endKeyframe.ty || future.val) - tyStart;

                        let tyCurrentTweenFrame = currentFrame - past.frame;
                        let tyDuration = future.frame - past.frame + 1;

                        // ************************************************************
                        val = "sx";
                        past = checkPastFrames(scene[i]["sprite"], val, 1);
                        future = checkFutureFrames(scene[i]["sprite"], val, 1);
                        // ************************************************************

                        let sxStart = startKeyframe.sx || past.val;
                        let sxDistance = (endKeyframe.sx || future.val) - sxStart;

                        let sxCurrentTweenFrame = currentFrame - past.frame;
                        let sxDuration = future.frame - past.frame;

                        // ************************************************************
                        val = "sy";
                        past = checkPastFrames(scene[i]["sprite"], val, 1);
                        future = checkFutureFrames(scene[i]["sprite"], val, 1);
                        // ************************************************************

                        let syStart = startKeyframe.sy || past.val;
                        let syDistance = (endKeyframe.sy || future.val) - syStart;

                        let syCurrentTweenFrame = currentFrame - past.frame;
                        let syDuration = future.frame - past.frame;

                        // ************************************************************
                        val = "rotate";
                        past = checkPastFrames(scene[i]["sprite"], val, 0);
                        future = checkFutureFrames(scene[i]["sprite"], val, 0);
                        // ************************************************************

                        let rotateStart = (startKeyframe.rotate || past.val) * -1 * Math.PI / 180;
                        let rotateDistance = (endKeyframe.rotate || future.val) * -1 * Math.PI / 180 - rotateStart;

                        let rotCurrentTweenFrame = currentFrame - past.frame;
                        let rotDuration = future.frame - past.frame;

                        // ************************************************************
                        val = "opacity";
                        past = checkPastFrames(scene[i]["sprite"], val, 1.0);
                        future = checkFutureFrames(scene[i]["sprite"], val, 1.0);
                        // ************************************************************

                        let opacityStart = (startKeyframe.opacity || past.val);
                        let opacityDistance = (endKeyframe.opacity || future.val) - opacityStart;

                        let opacityCurrentTweenFrame = currentFrame - past.frame;
                        let opacityDuration = future.frame - past.frame;

                        // ************************************************************
                        val = "wingOpenAmount";
                        past = checkPastFrames(scene[i]["sprite"], val, 0.0);
                        future = checkFutureFrames(scene[i]["sprite"], val, 0.0);
                        // ************************************************************

                        let wingStart = (startKeyframe.wingOpenAmount || past.val);
                        let wingDistance = (endKeyframe.wingOpenAmount || future.val) - wingStart;

                        let wingCurrentTweenFrame = currentFrame - past.frame;
                        let wingDuration = future.frame - past.frame;

                        // ************************************************************
                        val = "aimAmount";
                        past = checkPastFrames(scene[i]["sprite"], val, 0.0);
                        future = checkFutureFrames(scene[i]["sprite"], val, 0.0);
                        // ************************************************************

                        let aimStart = (startKeyframe.aimAmount || past.val);
                        let aimDistance = (endKeyframe.aimAmount || future.val) - aimStart;

                        let aimCurrentTweenFrame = currentFrame - past.frame;
                        let aimDuration = future.frame - past.frame;

                        // ************************************************************
                        val = "howReady";
                        past = checkPastFrames(scene[i]["sprite"], val, 0.0);
                        future = checkFutureFrames(scene[i]["sprite"], val, 0.0);
                        // ************************************************************

                        let howReadyStart = (startKeyframe.howReady || past.val);
                        let howReadyDistance = (endKeyframe.howReady || future.val) - howReadyStart;

                        let howReadyCurrentTweenFrame = currentFrame - past.frame;
                        let howReadyDuration = future.frame - past.frame;


                        // Build our transform according to where we should be.
                        renderingContext.translate(
                            ease(txCurrentTweenFrame, txStart, txDistance, txDuration),
                            ease(tyCurrentTweenFrame, tyStart, tyDistance, tyDuration)
                        );

                        renderingContext.rotate(
                            ease(rotCurrentTweenFrame, rotateStart, rotateDistance, rotDuration)
                        );

                        renderingContext.scale(
                            ease(sxCurrentTweenFrame, sxStart, sxDistance, sxDuration),
                            ease(syCurrentTweenFrame, syStart, syDistance, syDuration)
                        );

                        renderingContext.scale(
                            ease(sxCurrentTweenFrame, sxStart, sxDistance, sxDuration),
                            ease(syCurrentTweenFrame, syStart, syDistance, syDuration)
                        );

                        renderingContext.globalAlpha =
                            ease(opacityCurrentTweenFrame, opacityStart, opacityDistance, opacityDuration);

                        let wingOpenAmount = ease(wingCurrentTweenFrame, wingStart, wingDistance, wingDuration);
                        let aimAmount = ease(aimCurrentTweenFrame, aimStart, aimDistance, aimDuration);
                        let howReady = ease(howReadyCurrentTweenFrame, howReadyStart, howReadyDistance, howReadyDuration);

                        past = checkPastFrames(scene[i]["sprite"], "showing", false);
                        let showing = (startKeyframe.showing || past.val);

                        past = checkPastFrames(scene[i]["sprite"], "direction", 1.0);
                        let direction = (startKeyframe.direction || past.val);

                        // Draw the sprite.
                        if (showing === true) {
                            SampleSpriteLibrary[scene[i].sprite]({
                                renderingContext,
                                direction,
                                wingOpenAmount,
                                aimAmount,
                                howReady
                            });
                        }

                        // Clean up.
                        renderingContext.restore();
                    }
                }
            }

            // Move to the next frame.
            currentFrame += 1;
            previousTimestamp = timestamp;
            window.requestAnimationFrame(nextFrame);
        };

        for (let i = 0, maxI = scene.length; i < maxI; i++) {
            let currentSprite = scene[i]["sprite"];
            if (!(currentSprite in keyframeData)) {
                keyframeData[currentSprite] = {};
            }
            for (let j = 0, maxJ = scene[i].keyframes.length; j < maxJ; j += 1) {
                let currentKey = scene[i].keyframes[j];
                for (let property in currentKey) {
                    if (currentKey.hasOwnProperty(property)) {
                        if (!(property in keyframeData[currentSprite])) {
                            keyframeData[currentSprite][property] = {};
                            keyframeData[currentSprite][property][currentKey.frame] = currentKey[property];
                        } else {
                            keyframeData[currentSprite][property][currentKey.frame] = currentKey[property];
                        }
                    }
                }
            }
        }

        window.requestAnimationFrame(nextFrame);
    };

    window.KeyframeTweener = {
        // The module comes with a library of common easing functions.
        linear: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return distance * percentComplete + start;
        },

        quadEaseIn: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return distance * percentComplete * percentComplete + start;
        },

        quadEaseOut: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return -distance * percentComplete * (percentComplete - 2) + start;
        },

        quadEaseInAndOut: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / (duration / 2);
            return (percentComplete < 1) ?
            (distance / 2) * percentComplete * percentComplete + start :
            (-distance / 2) * ((percentComplete - 1) * (percentComplete - 3) - 1) + start;
        },

        easeInOutCirc: function (currentTime, start, distance, duration) {
            if ((currentTime /= duration / 2) < 1) {
                return -distance / 2 * (Math.sqrt(1 - currentTime * currentTime) - 1) + start;
            }
            return distance / 2 * (Math.sqrt(1 - (currentTime -= 2) * currentTime) + 1) + start;
        },

        easeOutBounce: function (currentTime, start, distance, duration) {
            if ((currentTime /= duration) < (1 / 2.75)) {
                return distance * (7.5625 * currentTime * currentTime) + start;
            } else if (currentTime < (2 / 2.75)) {
                return distance * (7.5625 * (currentTime -= (1.5 / 2.75)) * currentTime + .75) + start;
            } else if (currentTime < (2.5 / 2.75)) {
                return distance * (7.5625 * (currentTime -= (2.25 / 2.75)) * currentTime + .9375) + start;
            } else {
                return distance * (7.5625 * (currentTime -= (2.625 / 2.75)) * currentTime + .984375) + start;
            }
        },

        initialize: initializeAnimation
    };
})();
