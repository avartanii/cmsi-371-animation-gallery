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

        // Avoid having to go through settings to get to the
        // rendering context and sprites.
        let renderingContext = settings.renderingContext;
        let width = settings.width;
        let height = settings.height;
        let scene = settings.scene;

        // Data Structure for preprocessing keyframes.
        let spriteDict = {};
        for (let i = 0; i < scene.length; i += 1) {
            let currentSprite = scene[i]["sprite"];
            if (!(currentSprite in spriteDict)) {
                spriteDict[currentSprite] = {};
            }
            for (let j = 0; j < scene[i].keyframes.length; j += 1) {
                let currentKeyframe = scene[i].keyframes[j];
                for (let spriteProperty in currentKeyframe) {
                    if (currentKeyframe.hasOwnProperty(spriteProperty)) {
                        if (!(spriteProperty in spriteDict[currentSprite])) {
                            spriteDict[currentSprite][spriteProperty] = {};
                            spriteDict[currentSprite][spriteProperty][currentKeyframe.frame] = currentKeyframe[spriteProperty];
                        } else {
                            spriteDict[currentSprite][spriteProperty][currentKeyframe.frame] = currentKeyframe[spriteProperty];
                        }
                    }
                }
            }
        }

        // Determining the before and after keyframes for tweening.

        let getMostRecentPriorKeyframe = (sprite, spriteValue, defaultValue) => {
            if (spriteDict[sprite].hasOwnProperty(spriteValue)) {
                let source = spriteDict[sprite][spriteValue];
                let priorKeyframe = 0;
                for (let frameNumber in source) {
                    if (source.hasOwnProperty(frameNumber)) {
                        if (currentFrame < frameNumber) {
                            return {
                                value: source[priorKeyframe] || defaultValue,
                                frame: priorKeyframe
                            };
                        } else {
                            priorKeyframe = frameNumber;
                        }
                    }
                }
                return {
                    value: source[priorKeyframe],
                    frame: currentFrame
                };
            } else {
                return {
                    value: defaultValue,
                    frame: currentFrame
                };
            }
        };

        let getClosestFutureKeyframe = (sprite, spriteValue, defaultValue) => {
            if (spriteDict[sprite].hasOwnProperty(spriteValue)) {
                let source = spriteDict[sprite][spriteValue];
                let futureKeyframe = 0;
                for (let frameNumber in source) {
                    if (source.hasOwnProperty(frameNumber)) {
                        if (currentFrame < frameNumber) {
                            return {
                                value: source[frameNumber],
                                frame: frameNumber,
                            };
                        } else if (currentFrame > frameNumber) {
                            futureKeyframe = frameNumber;
                        }
                    }
                }
                return {
                    value: source[futureKeyframe],
                    frame: futureKeyframe
                };
            } else {
                return {
                    value: defaultValue,
                    frame: currentFrame
                };
            }
        };

        let previousTimestamp = null;
        let nextFrame = (timestamp) => {
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
                                                   getMostRecentPriorKeyframe(scene[i]["sprite"], "ease", "linear").value];

                        let prior = getMostRecentPriorKeyframe(scene[i]["sprite"], "tx", 0);
                        let future = getClosestFutureKeyframe(scene[i]["sprite"], "tx", 0);

                        let txStart = startKeyframe.tx || prior.value;
                        let txDistance = (endKeyframe.tx || future.value) - txStart;
                        let txTween = currentFrame - prior.frame;
                        let txDuration = future.frame - prior.frame + 1;

                        prior = getMostRecentPriorKeyframe(scene[i]["sprite"], "ty", 0);
                        future = getClosestFutureKeyframe(scene[i]["sprite"], "ty", 0);

                        let tyStart = startKeyframe.ty || prior.value;
                        let tyDistance = (endKeyframe.ty || future.value) - tyStart;
                        let tyTween = currentFrame - prior.frame;
                        let tyDuration = future.frame - prior.frame + 1;

                        prior = getMostRecentPriorKeyframe(scene[i]["sprite"], "sx", 1);
                        future = getClosestFutureKeyframe(scene[i]["sprite"], "sx", 1);

                        let sxStart = startKeyframe.sx || prior.value;
                        let sxDistance = (endKeyframe.sx || future.value) - sxStart;
                        let sxTween = currentFrame - prior.frame;
                        let sxDuration = future.frame - prior.frame + 1;

                        prior = getMostRecentPriorKeyframe(scene[i]["sprite"], "sy", 1);
                        future = getClosestFutureKeyframe(scene[i]["sprite"], "sy", 1);

                        let syStart = startKeyframe.sy || prior.value;
                        let syDistance = (endKeyframe.sy || future.value) - syStart;
                        let syTween = currentFrame - prior.frame;
                        let syDuration = future.frame - prior.frame + 1;

                        prior = getMostRecentPriorKeyframe(scene[i]["sprite"], "rotate", 0);
                        future = getClosestFutureKeyframe(scene[i]["sprite"], "rotate", 0);

                        let rotateStart = (startKeyframe.rotate || prior.value) * Math.PI / 180;
                        let rotateDistance = (endKeyframe.rotate || future.value) * Math.PI / 180 - rotateStart;
                        let rotateTween = currentFrame - prior.frame;
                        let rotateDuration = prior.frame - future.frame;

                        // Build our transform according to where we should be.
                        renderingContext.translate(
                            ease(txTween, txStart, txDistance, txDuration),
                            ease(tyTween, tyStart, tyDistance, tyDuration)
                        );

                        renderingContext.rotate(
                            ease(rotateTween, rotateStart, rotateDistance, rotateDuration)
                        );

                        renderingContext.scale(
                            ease(sxTween, sxStart, sxDistance, sxDuration),
                            ease(syTween, syStart, syDistance, syDuration)
                        );

                        let poseStage = getMostRecentPriorKeyframe(scene[i]["sprite"], "poseStage", 0).value;
                        let pointStage = getMostRecentPriorKeyframe(scene[i]["sprite"], "pointStage", 0).value;
                        let armStage = getMostRecentPriorKeyframe(scene[i]["sprite"], "armStage", 0).value;
                        let throwStage = getMostRecentPriorKeyframe(scene[i]["sprite"], "throwStage", 0).value;
                        let textBlock = getMostRecentPriorKeyframe(scene[i]["sprite"], "textBlock", 0).value;

                        // Draw the sprite.
                        SampleSpriteLibrary[scene[i].sprite]({
                            renderingContext,
                            poseStage,
                            pointStage,
                            armStage,
                            throwStage,
                            textBlock
                        });

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

        quinticEaseInAndOut: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / (duration / 2);
            if (percentComplete < 1) {
                return distance / 2 * percentComplete * percentComplete *
                       percentComplete * percentComplete * percentComplete + start;
            }
            return distance / 2 * ((percentComplete -= 2) * percentComplete *
                   percentComplete * percentComplete * percentComplete + 2) + start;
        },

        easeInExpo: (currentTime, start, distance, duration) => {
            let percentComplete = currentTime / duration;
            return (currentTime === 0) ? start : distance * Math.pow(2, 10 * (percentComplete - 1)) + start;
        },

        sin: function (currentTime, start, distance, duration) {
            return distance / 2 * (Math.cos(Math.PI * currentTime / duration) - 1) + start;
        },

        bounce: (currentTime, start, distance, duration) => {
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
