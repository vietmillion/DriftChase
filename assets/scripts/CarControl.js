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
        accelerationX: 100,
        accelerationY: 100,
        max_speed: 200,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speed = 0;
        this.death = false;
        this.rotating = false;
        this.body = this.getComponent(cc.RigidBody);
        cc.log('ccccccc ' + MOVE_DIR);
    },
    
    start_drive(){
        this.dir = MOVE_DIR.top;
        this.rotating = false;
        this.death = false;
    },

    start_rotate(){
        this.rotating = true;
    },

    stop_rotate(){
        this.rotating = false;
    },



    updateAccel(speed, dt, next_dir){
        if(next_dir === MOVE_DIR.top) {
            speed.y += this.acceleration * dt;
        } else if(next_dir === MOVE_DIR.down) {
            speed.y -= this.acceleration * dt;
        } else if(next_dir === MOVE_DIR.left){
            speed.x -= this.acceleration * dt;
        } else if(next_dir === MOVE_DIR.right){
            speed.x += this.acceleration * dt;
        }
        return speed;
    },

    onBeginContact: function(contact, selfCollider, otherCollider){
        this.body.linearVelocity = cc.v2(0, 0);
        this.death = true;
        cc.log('detect collision');
        this.node.dispatchEvent(new cc.Event.EventCustom('car_death', true));
    },


    update (dt) {
        var speed = this.body.linearVelocity;
        // cc.log(speed);
        if(!this.death) {
            
            speed.y += this.accelerationY * dt;
            if (!this.rotating){
                speed.x += this.accelerationX * dt;
            }else{
                speed.x -= this.accelerationX * dt;
            }
            
            if(speed.y >= this.max_speed){
                speed.y = this.max_speed;
            }

            if(speed.x > this.max_speed){
                speed.x = this.max_speed;
            } else if(speed.x < -this.max_speed){
                speed.x = -this.max_speed;
            }

            this.node.rotation = cc.radiansToDegrees(cc.pAngleSigned(speed, cc.v2(0, 1)));

            cc.log(speed.toString() +  ' ' + this.node.rotation);
             
            this.body.linearVelocity = speed;

        }
    },
});
