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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.curId = 0;        
    },
    startGame(){
        this.curId = 0;
    },

    nextDir(){
        this.curId += 1;
        return list_dir[this.curId];
    },
   
});
