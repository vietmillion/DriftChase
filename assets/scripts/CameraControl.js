// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,
        map: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.camera = this.getComponent(cc.Camera);
    },

    onEnable: function(){
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
    },   

    onDisable: function(){
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
    },

    lateUpdate: function(dt){
        let targetPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        this.node.position = targetPos;
    }

    // update (dt) {},
});
