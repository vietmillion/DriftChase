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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let tilemap = this.node.getComponent(cc.TiledMap);
        let obj_collision = tilemap.getObjectGroup('collision');
        let objects = obj_collision.getObjects();
        let block_size = obj_collision.node.getContentSize(); 
        for(let i = 0; i < objects.length; i++){
            let points = objects[i].getProperty('points');
            let collider = this.node.addComponent(cc.PhysicsPolygonCollider);
            let offset = cc.v2(objects[i].offset.x, block_size.height - objects[i].offset.y);
            // collider.points = points;
            let physic_points = [];
            for(let j = 0; j < points.length; j++){
                physic_points.push(cc.v2(points[j].x + offset.x, offset.y - points[j].y));
            }
            collider.points = physic_points;
            cc.log(physic_points);
        }
    },


    // update (dt) {},
});
