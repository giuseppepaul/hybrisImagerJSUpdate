describe("Create data media string: ", function (){
    var hybrisImgr;
    beforeEach(function (){ hybrisImgr = new Imager; });
    afterEach(function (){ hybrisImgr = null; });
    it("should return a string with an attribute name for each value in the array it is passed", function (){
        expect(hybrisImgr.createPixelMediaRemoveString([2])).toEqual("data-media-x2");
        expect(hybrisImgr.createPixelMediaRemoveString([2,3,5])).toEqual("data-media-x2 data-media-x3 data-media-x5");
        expect(hybrisImgr.createPixelMediaRemoveString([2,5,3])).toEqual("data-media-x2 data-media-x5 data-media-x3");
    });
});

describe("Closest pixel match: ", function (){
    var hybrisImgr;
    beforeEach(function (){ hybrisImgr = new Imager; });
    afterEach(function (){ hybrisImgr = null; });
    it("should return the appropriate pixel value", function (){
        expect(hybrisImgr.getClosestPixelRatio(2, [1,2,3,4,5])).toEqual(2);
        expect(hybrisImgr.getClosestPixelRatio(1, [2])).toEqual(2);
        expect(hybrisImgr.getClosestPixelRatio(1, [1])).toEqual(1);
        expect(hybrisImgr.getClosestPixelRatio(3, [1,2,3,3])).toEqual(3);
        expect(hybrisImgr.getClosestPixelRatio(3, [1,2])).toEqual(2);
        expect(hybrisImgr.getClosestPixelRatio(2, [2,1,4,3])).toEqual(2);
        expect(hybrisImgr.getClosestPixelRatio(3, [2,1,4,3,4])).toEqual(3);
    });
});

describe("Closest pixel match NaN: ", function (){
    var hybrisImgr;
    beforeEach(function (){ hybrisImgr = new Imager; });
    afterEach(function (){ hybrisImgr = null; });
    it("should return 2 and not blow up", function (){
        expect(hybrisImgr.getClosestPixelRatio("2", [1,2,3,4,5])).toEqual(2);
        expect(hybrisImgr.getClosestPixelRatio("1", [2])).toEqual(2);
        expect(hybrisImgr.getClosestPixelRatio(false, [2])).toEqual(2);
    });
});

describe("Return actual device pixel ratio", function (){
    var hybrisImgr;
    beforeEach(function (){ hybrisImgr = new Imager; });
    afterEach(function (){ hybrisImgr = null; });
    it("should return a number", function (){
        expect(hybrisImgr.getPixelRatio()).toEqual(jasmine.any(Number));
    });
});