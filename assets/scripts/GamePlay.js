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
    },



    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.car_control = this.car.getComponent('CarControl');
        var canvas = cc.find('Canvas');
        this.list_dir = this.map.getComponent('Map').list_dir;
        this.cur_idx = 0;
        canvas.on(cc.Node.EventType.TOUCH_END, function(event){

            let time_camera = 1.5;
            let time_car = 1.5;

            let next_dir = this.list_dir[this.cur_idx];
            this.cur_idx += 1;
            let car_dir = this.car_control.dir;

            cc.log('before ' + car_dir);

            if(next_dir == 'left'){
                car_dir = (car_dir + 3) % 4; 
            } else {
                car_dir = (car_dir + 1) % 4;
            }
            cc.log('after ' + car_dir);
            if(next_dir === 'left') {
                this.camera.runAction(cc.rotateBy(time_camera, 90).easing(cc.easeBackOut())); 
                this.car.runAction(cc.rotateBy(time_car, -90).easing(cc.easeBackOut()));
            } else {
                this.camera.runAction(cc.rotateBy(time_camera, -90).easing(cc.easeBackOut())); 
                this.car.runAction(cc.rotateBy(time_car, 90).easing(cc.easeBackOut()));
                
            }

           this.car_control.drifting(car_dir);

        }, this);


    },

    startGame(){

    },


    start () {

    },

    // update (dt) {},
});
