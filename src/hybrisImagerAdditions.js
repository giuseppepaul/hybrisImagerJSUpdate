Imager.prototype.init = function(){
    var self = this;
    this.availablePixelRatios = [2,3,5];
	this.devicePixelRatio = this.getDevicePixelRatio();
    var removeString = this.createPixelMediaRemoveString(this.availablePixelRatios);

    // If the device pixel density is higher than the default of 1
    if (this.devicePixelRatio > 1){
        // replace the data-media value with that from the appropriate pixel density attribute
        $(this.eles).each(function(){
            self.replaceWithPixelDensitySrc(this, self.devicePixelRatio);
            self.removePixelMediaAttr(this, removeString);
        });
    }

    // Original calls from hybris imager to do the setup
    this.checkImagesNeedReplacing(this.eles);
    if(this.onResize){this.registerResizeEvent();}
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
    return window.devicePixelRatio;
};

Imager.prototype.getDevicePixelRatio = function (){
    return (this.getClosestPixelRatio(this.getPixelRatio(), this.availablePixelRatios));
};

Imager.prototype.getClosestPixelRatio = function (base, available){
    var ratio = available[0];
    base = parseFloat(base);
    for (var i = 0; i < available.length; i++) {
        if (base >= available[i] && available[i] > ratio){
            ratio = available[i];
        }
    }
    return ratio;
};