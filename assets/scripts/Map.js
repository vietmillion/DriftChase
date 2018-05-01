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
        list_dir:[cc.String],
        collision:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let offset = 0;
        for(let i = 0; i < 10; i++){
            let collider = this.collision.addComponent(cc.PhysicsPolygonCollider);
            let points = [];
            points.push(cc.v2(0, 320 + offset));
            points.push(cc.v2(-320, 0 + offset));
            points.push(cc.v2(-320, 640 + offset));
            collider.points = points;

            collider = this.collision.addComponent(cc.PhysicsPolygonCollider);
            points = [];
            points.push(cc.v2(0, 320 + offset + 320));
            points.push(cc.v2(320, 0 + offset + 320));
            points.push(cc.v2(320, 640 + offset + 320));
            collider.points = points;


            offset += 640;

        }
        

    },
    startGame(){
    },

    nextDir(){
        this.curId += 1;
        return list_dir[this.curId];
    },
   
});
