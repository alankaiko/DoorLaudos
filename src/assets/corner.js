cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

    cornerstoneWADOImageLoader.configure({
        beforeSend: function(xhr) {
            // Add custom headers here (e.g. auth tokens)
            //xhr.setRequestHeader('APIKEY', 'my auth token');
        }
    });

    var loaded = false;

    function loadAndViewImage(imageId) {
        var element = document.getElementById('dicomImage');

        try {
            var start = new Date().getTime();
            cornerstone.loadAndCacheImage(imageId).then(function(image) {
                console.log(image);
                var viewport = cornerstone.getDefaultViewportForImage(element, image);
                document.getElementById('toggleModalityLUT').checked = (viewport.modalityLUT !== undefined);
                document.getElementById('toggleVOILUT').checked = (viewport.voiLUT !== undefined);
                cornerstone.displayImage(element, image, viewport);
                if(loaded === false) {
                    cornerstoneTools.mouseInput.enable(element);
                    cornerstoneTools.mouseWheelInput.enable(element);
                    cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
                    cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
                    cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
                    cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
                    loaded = true;
                }

                function getTransferSyntax() {
                    const value = image.data.string('x00020010');
                    return value + ' [' + uids[value] + ']';
                }

                function getSopClass() {
                    const value = image.data.string('x00080016');
                    return value + ' [' + uids[value] + ']';
                }

                function getPixelRepresentation() {
                    const value = image.data.uint16('x00280103');
                    if(value === undefined) {
                        return;
                    }
                    return value + (value === 0 ? ' (unsigned)' : ' (signed)');
                }

                function getPlanarConfiguration() {
                    const value = image.data.uint16('x00280006');
                    if(value === undefined) {
                        return;
                    }
                    return value + (value === 0 ? ' (pixel)' : ' (plane)');
                }


                document.getElementById('transferSyntax').textContent = getTransferSyntax();
                document.getElementById('sopClass').textContent = getSopClass();
                document.getElementById('samplesPerPixel').textContent = image.data.uint16('x00280002');
                document.getElementById('photometricInterpretation').textContent = image.data.string('x00280004');
                document.getElementById('numberOfFrames').textContent = image.data.string('x00280008');
                document.getElementById('planarConfiguration').textContent = getPlanarConfiguration();
                document.getElementById('rows').textContent = image.data.uint16('x00280010');
                document.getElementById('columns').textContent = image.data.uint16('x00280011');
                document.getElementById('pixelSpacing').textContent = image.data.string('x00280030');
                document.getElementById('rowPixelSpacing').textContent = image.rowPixelSpacing;
                document.getElementById('columnPixelSpacing').textContent = image.columnPixelSpacing;
                document.getElementById('bitsAllocated').textContent = image.data.uint16('x00280100');
                document.getElementById('bitsStored').textContent = image.data.uint16('x00280101');
                document.getElementById('highBit').textContent = image.data.uint16('x00280102');
                document.getElementById('pixelRepresentation').textContent = getPixelRepresentation();
                document.getElementById('windowCenter').textContent = image.data.string('x00281050');
                document.getElementById('windowWidth').textContent = image.data.string('x00281051');
                document.getElementById('rescaleIntercept').textContent = image.data.string('x00281052');
                document.getElementById('rescaleSlope').textContent = image.data.string('x00281053');
                document.getElementById('basicOffsetTable').textContent = image.data.elements.x7fe00010.basicOffsetTable ? image.data.elements.x7fe00010.basicOffsetTable.length : '';
                document.getElementById('fragments').textContent = image.data.elements.x7fe00010.fragments ? image.data.elements.x7fe00010.fragments.length : '';
                document.getElementById('minStoredPixelValue').textContent = image.minPixelValue;
                document.getElementById('maxStoredPixelValue').textContent = image.maxPixelValue;
                var end = new Date().getTime();
                var time = end - start;
                document.getElementById('totalTime').textContent = time + "ms";
                document.getElementById('loadTime').textContent = image.loadTimeInMS + "ms";
                document.getElementById('decodeTime').textContent = image.decodeTimeInMS + "ms";

            }, function(err) {
                alert(err);
            });
        }
        catch(err) {
            alert(err);
        }
    }

    function downloadAndView() {
        let url = document.getElementById('wadoURL').value;

        // prefix the url with wadouri: so cornerstone can find the image loader
        url = "wadouri:" + url;

        // image enable the dicomImage element and activate a few tools
        loadAndViewImage(url);
    }

    cornerstone.events.addEventListener('cornerstoneimageloadprogress', function(event) {
        const eventData = event.detail;
        const loadProgress = document.getElementById('loadProgress');
        loadProgress.textContent = `Image Load Progress: ${eventData.percentComplete}%`;
    });

    function getUrlWithoutFrame() {
        var url = document.getElementById('wadoURL').value;
        var frameIndex = url.indexOf('frame=');
        if(frameIndex !== -1) {
            url = url.substr(0, frameIndex-1);
        }
        return url;
    }

    var element = document.getElementById('dicomImage');
    cornerstone.enable(element);

    document.getElementById('downloadAndView').addEventListener('click', function(e) {
        downloadAndView();
    });
    document.getElementById('load').addEventListener('click', function(e) {
        var url = getUrlWithoutFrame();
        cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.load(url);
    });
    document.getElementById('unload').addEventListener('click', function(e) {
        var url = getUrlWithoutFrame();
        cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.unload(url);
    });

    document.getElementById('purge').addEventListener('click', function(e) {
        cornerstone.imageCache.purgeCache();
    });

    const form = document.getElementById('form');
    form.addEventListener('submit', function() {
        downloadAndView();
        return false;
    });

    document.getElementById('toggleModalityLUT').addEventListener('click', function() {
        var applyModalityLUT = document.getElementById('toggleModalityLUT').checked;
        console.log('applyModalityLUT=', applyModalityLUT);
        var image = cornerstone.getImage(element);
        var viewport = cornerstone.getViewport(element);
        if(applyModalityLUT) {
            viewport.modalityLUT = image.modalityLUT;
        } else {
            viewport.modalityLUT = undefined;
        }
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('toggleVOILUT').addEventListener('click', function() {
        var applyVOILUT = document.getElementById('toggleVOILUT').checked;
        console.log('applyVOILUT=', applyVOILUT);
        var image = cornerstone.getImage(element);
        var viewport = cornerstone.getViewport(element);
        if(applyVOILUT) {
            viewport.voiLUT = image.voiLUT;
        } else {
            viewport.voiLUT = undefined;
        }
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('toggleCollapseInfo').addEventListener('click', function() {
        if (document.getElementById('collapseInfo').style.display === 'none') {
            document.getElementById('collapseInfo').style.display = 'block';
        } else {
            document.getElementById('collapseInfo').style.display = 'none';
        }
    });