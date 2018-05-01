// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const MOVE_DIR = require('Constant').MOVE_DIR; 

cc.Class({
    extends: cc.Component,

    properties: {
        car: cc.Node,
        map: cc.Node,
        camera: cc.Node,
        ui: cc.Node,
    },



    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {

        this.ui.active = false;
        this.car_control = this.car.getComponent('CarControl');
        var canvas = cc.find('Canvas');
        this.list_dir = this.map.getComponent('Map').list_dir;
        this.cur_idx = 0;

        this.node.on('car_death', function(event){
            this.car.stopAllActions();
            this.camera.stopAllActions();
            this.ui.active = true;
        }, this);

        canvas.on(cc.Node.EventType.TOUCH_END, function(event){

           this.car_control.stop_rotate();

        }, this);

        canvas.on(cc.Node.EventType.TOUCH_START, function(event){

            this.car_control.start_rotate();

        }, this);
        this.restart();

    },

    restart: function(){
        this.ui.active = false;
        this.car.position = cc.v2(0, - 200);
        this.car_control.start_drive();
    },

    onButtonRestart: function( event, customEventData) {
        this.restart();
    },



    start () {

    },

    // update (dt) {},
});
