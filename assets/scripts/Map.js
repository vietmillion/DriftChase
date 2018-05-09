// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Queue = require('Queue.src');

cc.Class({
    extends: cc.Component,

    properties: {
        leftTriangle:
        {
            default: null,
            type: cc.Prefab,
        },

        rightTriangle: cc.Prefab,
        list_dir:[cc.String],
        collision:cc.Node,

        previousLeftPos: cc.v2,
        previousRightPos: cc.v2,

    },
    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.elements = new Queue();
        this.reset();

    },
    startGame(){
    },

    nextDir(){
        this.curId += 1;
        return list_dir[this.curId];
    },

    generateNewPoint(rootPos, dirAngle, hypotenuseAngle, distance, slideLenght)
    {
        let sign = 1;

        //rotate vector distance to create direction vector
        let v2Direction = cc.v2(distance,0);
        v2Direction.rotateSelf( dirAngle * Math.PI / 180);
        cc.log("v2Direction : ", v2Direction);
        
        // get H point
        let v2Hpoint = cc.v2( rootPos.add (v2Direction));
        cc.log("v2Hpoint begin : ", v2Hpoint);

    
        // slide direction
        let v2SlideDir = cc.v2(slideLenght,0);
        cc.log("v2SlideDir 0 : ", v2SlideDir);
        
        v2SlideDir.rotateSelf( hypotenuseAngle * Math.PI / 180);
        if(Math.random() < 0.5)
        {
            sign = -1;
        }
        v2SlideDir = v2SlideDir.mul( sign);

        cc.log("v2 Slide dir : ", v2SlideDir);
        
        // add slide distance to H point 
        let v2RightPoint = cc.v2(v2Hpoint.add(v2SlideDir));

         cc.log("v2RightPoint : ", v2RightPoint);
        return v2RightPoint;
    },
   

    generateNewPairPoints()
    {
        let distance = 0;         
        let distanceSlide = 0;        
        let sign = 1;

        //left
        let objLeftTriangle = cc.instantiate(this.leftTriangle);
        sign = 1;
        if(Math.random() < 0.5)
        {
            sign *= -1;
        }

        distance = Math.random() * 100 + 150;

        distanceSlide  = Math.random() * 100 + 30;
        distanceSlide *= sign;            
        
        let leftPos = this.generateNewPoint(this.previousRightPos, 135, 45, distance, distanceSlide);

        if( leftPos.x > 200)
        {
            leftPos.x = 200;
        }
        objLeftTriangle.setPosition( leftPos);
        this.addElement(objLeftTriangle);

        this.previousLeftPos = objLeftTriangle.getPosition();

        //right
        let objRightTriangle = cc.instantiate(this.rightTriangle);
        sign = 1;
        if(Math.random() < 0.5)
        {
            sign *= -1;
        }

        distance = Math.random() * 100 + 150;

        distanceSlide  = Math.random() * 100 + 30;
        distanceSlide *= sign;

        let rightPos = this.generateNewPoint(this.previousLeftPos, 45, 135, distance, distanceSlide);
        if( rightPos.x < 100)
        {
            rightPos.x = 100;
        }
        objRightTriangle.setPosition( rightPos);
        this.addElement(objRightTriangle);

        this.previousRightPos = objRightTriangle.getPosition();
    },


    update(v2CarPos){
        if( ! this.elements.isEmpty())
        {
            let element = this.elements.peek();
            if(v2CarPos.y - element.y > 1000 )
            {
                this.removeFirstElement();
                this.removeFirstElement();

                this.generateNewPairPoints();
            }
        }

    },

    addElement(element)
    {
        this.node.addChild(element);
        this.elements.enqueue(element);

        let collider = element.getComponent(cc.PolygonCollider);
    },

    removeFirstElement()
    {        
        this.node.removeChild(this.elements.dequeue());
    },

    reset()
    {
        //clear old elements
        while(this.elements.getLength() != 0)
        {
            this.removeFirstElement();
        }


        // renew
        let distance = 0;         
        
        let distanceSlide = 0;        
        
        // create 2 first triangles
        let objLeftTriangle = cc.instantiate(this.leftTriangle);
        let sign = 1;
        
        objLeftTriangle.setPosition( cc.v2(0, 0 ));
        this.addElement(objLeftTriangle);        


        this.previousLeftPos = objLeftTriangle.getPosition();

        //right        
        distance = 200;
        distanceSlide = 10;

        let v2RightPoint = this.generateNewPoint(objLeftTriangle.getPosition(), 45, 135, distance, distanceSlide);

        let objRightTriangle = cc.instantiate(this.rightTriangle);

        objRightTriangle.setPosition(cc.v2(v2RightPoint.x, v2RightPoint.y));
        this.addElement(objRightTriangle);

        this.previousRightPos = objRightTriangle.getPosition();

        


        for(let i = 1; i < 10; i++){
            this.generateNewPairPoints();

            // let collider = this.collision.addComponent(cc.PhysicsPolygonCollider);
            // let points = [];
            // points.push(cc.v2(0, 320 + offset));
            // points.push(cc.v2(-320, 0 + offset));
            // points.push(cc.v2(-320, 640 + offset));
            // collider.points = points;

            // collider = this.collision.addComponent(cc.PhysicsPolygonCollider);
            // points = [];
            // points.push(cc.v2(0, 320 + offset + 320));
            // points.push(cc.v2(320, 0 + offset + 320));
            // points.push(cc.v2(320, 640 + offset + 320));
            // collider.points = points;


            //offset += 640;

        }
        
    },

});
