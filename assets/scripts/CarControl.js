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
        acceleration: 100,
        drag: 100,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.dir = MOVE_DIR.top;
        this.next_dir = MOVE_DIR.left;
        this.drift = false;
        this.death = false;
        this.body = this.getComponent(cc.RigidBody);
        cc.log('ccccccc ' + MOVE_DIR);
    },
    
    start_drive(){
        this.dir = MOVE_DIR.top;
        this.drift = false;
        this.death = false;
    },

    drifting(next_dir){
        cc.log('start drifting ' + next_dir);
        this.drift = true;
        this.next_dir = next_dir;
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
        const speed_drift = 100;
        // cc.log(speed);
        if(!this.death) {
            if(this.drift === false) 
            {
                speed = this.updateAccel(speed, dt, this.dir);
            }
            else
            {
                // cc.log(this.node.rotation);
                if(this.dir === MOVE_DIR.top) {
                    speed.y -= this.drag * dt;
                    if(speed.y < 0)
                    {
                        speed.y = 0;
                        this.dir = this.next_dir;
                        this.drift = false;
                    }
                    if(Math.abs(speed.y) < speed_drift){
                        speed = this.updateAccel(speed, dt, this.next_dir);
                    }
                } else if(this.dir === MOVE_DIR.down) {
                    speed.y += this.drag * dt;
                    if(speed.y > 0)
                    {
                        speed.y = 0;
                        this.dir = this.next_dir;
                        this.drift = false;
                    }
                    if(Math.abs(speed.y) < speed_drift){
                        speed = this.updateAccel(speed, dt, this.next_dir);
                    }
    
                } else if(this.dir === MOVE_DIR.left){
                    speed.x += this.drag * dt;
                    if(speed.x > 0)
                    {
                        speed.x = 0;
                        this.dir = this.next_dir;
                        this.drift = false;
                    }
                    if(Math.abs(speed.x) < speed_drift){
                        speed = this.updateAccel(speed, dt, this.next_dir);
                    }
    

                } else if(this.dir === MOVE_DIR.right){
                    speed.x -= this.drag * dt;
                    if(speed.x < 0)
                    {
                        speed.x = 0;
                        this.dir = this.next_dir;
                        this.drift = false;
                    }
                    if(Math.abs(speed.x) < speed_drift){
                        speed = this.updateAccel(speed, dt, this.next_dir);
                    }

                }

            }

            // cc.log(speed.toString());

            this.body.linearVelocity = speed;

        }
    },
});
