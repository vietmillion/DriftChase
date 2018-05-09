

var physicsManager = cc.director.getPhysicsManager();
physicsManager.enabled = !0;

physicsManager.debugDrawFlags = 
    // 0;
    // cc.PhysicsManager.DrawBits.e_aabbBit |
    cc.PhysicsManager.DrawBits.e_jointBit |
    cc.PhysicsManager.DrawBits.e_shapeBit
    ;
