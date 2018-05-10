

function _isFacebookInstant(){
    return window.facebookInstant !== undefined && window.facebookInstant === true;
}

module.exports = {
    isFacebookInstant : _isFacebookInstant
}