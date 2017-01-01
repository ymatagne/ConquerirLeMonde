var Y = (function () {
        "use strict";

    function Y() {
        console.log("tata");
    }
    
    Y.prototype.toto = function () {
        console.log("toto");
    };
    return Y;
}());
//exports.Y = Y;