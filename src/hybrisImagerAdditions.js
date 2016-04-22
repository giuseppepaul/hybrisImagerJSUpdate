Imager.prototype.init = function(){
    if (!$('html').hasClass('low-res-images-only')){
        var self = this;
        this.availablePixelRatios = [2,3];
    	this.devicePixelRatio = this.getDevicePixelRatio();
        var removeString = this.createPixelMediaRemoveString(this.availablePixelRatios);

        // If the device pixel density is higher than the default of 1
        if (this.devicePixelRatio > 1){
            // replace the data-media value with that from the appropriate pixel density attribute
            $(this.eles).each(function(){
                self.replaceWithPixelDensitySrc(this, self.devicePixelRatio);
            });
        }
        // Remove any pixel density attributes no longer needed
        $(this.eles).each(function(){
            self.removePixelMediaAttr(this, removeString);
        });
    }

    // Original calls from hybris imager to do the setup
    this.checkImagesNeedReplacing(this.eles);
    if(this.onResize){this.registerResizeEvent();}
};

Imager.prototype.replaceImagesBasedOnScreenDimensions = function (image) {
    var src,availableWidths = [],srcARRAY;
    var $image = $(image);

    if ($image.attr("data-media") !== undefined){

        var type = "img";
        if (image.nodeName !== "IMG") type = "bgImg";
        var eMedia = $image.attr('data-media');
        $image.removeAttr('data-media');
        eMedia = $.parseJSON(eMedia)

        $.each(eMedia, function(key, value) {
            availableWidths.push(parseInt(key));
        });

        $image.data({
            width: availableWidths,
            media: eMedia,
            type: type
        });
    }

    srcARRAY = $image.data("media");

    // Get width of parent for images or viewport for bg images
    if ($image.data("type") === "img"){
        var cwidth = Imager.getClosestValue($image.parent().width(), $.extend([],$(image).data("width")));
        if (image.src == srcARRAY[cwidth]) return;
        image.src = srcARRAY[cwidth];
    } else {
        var cwidth = Imager.getClosestValue($(window).width(), $.extend([],$(image).data("width")));
        // Get the bg image src
        var bgSrc = $image.css('background-image');
        bgSrc = bgSrc.replace('url(','').replace(')','');
        if (bgSrc === srcARRAY[cwidth]) return;
        $image.css('background-image', 'url(' + srcARRAY[cwidth] + ')');
    }
};

Imager.prototype.removePixelMediaAttr = function (img, attr){
    $(img).removeAttr(attr);
};

Imager.prototype.createPixelMediaRemoveString = function (pixelList){
    var removeString = "";
    for (var i = 0; i < pixelList.length; i++) {
        removeString += 'data-media-x' + pixelList[i];
        if (i + 1 != pixelList.length){ removeString += ' '; }
    }
    return removeString;
};

Imager.prototype.replaceWithPixelDensitySrc = function (img, pixelRatio){
    if ($(img).attr('data-media-x' + pixelRatio)){
        $(img).attr('data-media', $(img).attr('data-media-x' + pixelRatio));
    }
};

Imager.prototype.getPixelRatio = function () {
    return (window.devicePixelRatio || 1);
};

Imager.prototype.getDevicePixelRatio = function (){
    return (this.getClosestPixelRatio(this.getPixelRatio(), this.availablePixelRatios));
};

Imager.prototype.getClosestPixelRatio = function (base, available){
    var ratio = 1; // default
    base = parseFloat(base);
    for (var i = 0; i < available.length; i++) {
        if (base >= available[i] && available[i] > ratio){
            ratio = available[i];
        }
    }
    return ratio;
};