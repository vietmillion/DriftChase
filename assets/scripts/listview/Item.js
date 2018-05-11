
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        itemID: 0
    },
    
    onLoad: function () {
        this.node.on('touchend', function () {
            console.log("Item " + this.itemID + ' clicked');
        }, this);
    },

    updateItem: function(tmplId, itemId) {
        this.itemID = itemId;
    },
});
