(() => {

    let initializeAnimation = (settings) => {
        let currentFrame = 0;

        let renderingContext = settings.renderingContext;
        let width = settings.width;
        let height = settings.height;
        let scene = settings.scene;


        let def = (val) => {
            return {
                value: val,
                time: 0
            };
        };

        let parseFrame = (frame, id) => {
            return {
                value: frame[id],
                time: frame.frame
            };
        };

        let actors = [];
        let nextCache = [];
        for (let i = 0, maxI = scene.length; i < maxI; i += 1) {
            actors[i] = {};
            for (let j = 0, maxJ = scene[i].keyframes.length - 1; j < maxJ; j += 1) {
                for (let prop in scene[i].keyframes[j]) {
                    if (prop !== "frame" && prop !== "ease") {
                        actors[i][prop] = {
                            value: 0,
                            time: 0
                        };
                    }
                }
            }
            actors[i] = Object.assign(actors[i], {
                tx: def(0),
                ty: def(0),
                sx: def(1),
                sy: def(1),
                rot: def(0)
            });
            nextCache[i] = {};
        }


        let findNext = (frames, prop, minF, actIndex) => {
            if (nextCache[actIndex][prop] !== undefined && currentFrame < nextCache[actIndex][prop].time) {
                // console.log("got " + prop + " from cache");
                return nextCache[actIndex][prop];
            }

            for (let i = minF + 1; i < frames.length; i += 1) {
                if (frames[i][prop] !== undefined) {
                    // console.log("calculated "  + prop);
                    nextCache[actIndex][prop] = parseFrame(frames[i], prop);
                    return parseFrame(frames[i], prop);
                }
            }

            // console.log(prop + " wont be seen again...");
            nextCache[actIndex][prop] = {
                value: actors[actIndex][prop].value,
                time: Infinity
            };
            return actors[actIndex][prop];
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
            if (timestamp - previousTimestamp < (1000 / (settings.frameRate || 120))) {
                window.requestAnimationFrame(nextFrame);
                return;
            }

            // Clear the canvas.
            renderingContext.clearRect(0, 0, width, height);

            // For every sprite, go to the current pair of keyframes.
            // Then, draw the sprite based on the current frame.

            for (let i = 0, maxI = scene.length; i < maxI; i += 1) {
                for (let j = 0, maxJ = scene[i].keyframes.length - 1; j < maxJ; j += 1) {

                    if ((scene[i].keyframes[j].frame <= currentFrame) &&
                            (currentFrame <= scene[i].keyframes[j + 1].frame)) {
                        let startKeyframe = scene[i].keyframes[j];
                        // console.log(startKeyframe);

                        renderingContext.save();
                        if (currentFrame === startKeyframe.frame) {
                            for (let p in startKeyframe) {
                                if (p !== "ease" && p !== "frame") {
                                    actors[i][p] = {
                                        value: startKeyframe[p],
                                        time: startKeyframe.frame
                                    };
                                }
                            }
                        }

                        let ease = KeyframeTweener[startKeyframe.ease || "linear"];
                        let easyEase = (prop) => {
                            let begin = actors[i][prop];
                            let end = findNext(scene[i].keyframes, prop, j, i);
                            let newVal = ease(currentFrame - begin.time, begin.value,
                                end.value - begin.value, end.time - begin.time);

                            if (begin.time === end.time) {
                                return end.value;
                            }
                            return newVal;
                        };

                        // Build our transform according to where we should be.
                        renderingContext.translate(
                            easyEase("tx"),
                            easyEase("ty")
                        );

                        renderingContext.rotate(
                            easyEase("rot") * Math.PI / 180
                        );
                        renderingContext.scale(
                            easyEase("sx"),
                            easyEase("sy")
                        );

                        // Draw the sprite.
                        let specs = {renderingContext};
                        let allProps = Object.assign({}, actors[i]);
                        for (let prop in allProps) {
                            specs[prop] = easyEase(prop);
                        }
                        SampleSpriteLibrary[scene[i].sprite](
                            specs
                        );

                        // Clean up.
                        renderingContext.restore();
                    }
                }
            }

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

        sine: (currentTime, start, distance, duration) => {
            let t = (currentTime) / (duration);
            t = 1.5 * t;
            return distance * (((currentTime) / (duration) * .2 + .8) * Math.sin(Math.PI * (t - 1))) + start;
        },

        quarticEaseIn: (currentTime, start, distance, duration) => {
            let pc = currentTime / duration;
            return pc * pc * pc * pc * distance + start;
        },

        initialize: initializeAnimation
    };

})();
