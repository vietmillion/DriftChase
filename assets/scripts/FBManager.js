var Utils = require('Utils');


class FBManager {
    static getFriendLeaderboard(){
        if( !Utils.isFacebookInstant()){
            return Promise.all(function(resolve, reject){
                var fake = [];
                for(let i = 0; i < 10; i++){
                    var fake_friend = {};
                    fake_friend.rank = i + 1;
                    fake_friend.name = 'fake-friend ' + i;
                    fake_friend.score = i + 100;
                } 
                
                resolve(fake);
            });

        }
    }
}


module.exports = FBManager;