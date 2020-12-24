//%block="炸弹人Helpers"
//% weight=100 color=#E29E28 icon="\u24d1"
namespace bmhelper {

    //%block="move %sprite with smooth alignment||vx %vx vy %vy"
    //% vx.defl=100 vy.defl=100
    //%blockid=bmhelpermovesprite 
    export function moveSprite(sprite:Sprite, vx:number=50, vy:number=50) {
        smoothturn.moveSprite(sprite, vx, vy)
    }

    let _managingSprites :Sprite[] = []

    function velocityOf(sprite:Sprite) :number{
        return Math.sqrt(Math.pow(sprite.vx, 2) + Math.pow(sprite.vy, 2))
    }

    //%block="以速度 $veloctiy 随机移动 $sprite "
    //%blockid=bmhelperrandomlymovesprite 
    export function randomlyMoveSprite(sprite:Sprite, velocity:number) {
        sprite.vx = velocity
        _managingSprites.push(sprite)
    } 

    function oppositeOf(direction:CollisionDirection) :CollisionDirection{
        if (direction == CollisionDirection.Top) {
            return CollisionDirection.Bottom
        } else if (direction == CollisionDirection.Bottom) {
            return CollisionDirection.Top
        } else if (direction == CollisionDirection.Left) {
            return CollisionDirection.Right
        } else {
            return CollisionDirection.Left
        } 
    }
    
    function movingDirectionOfSprite(sprite:Sprite) :CollisionDirection {
        if (sprite.vx > 0) {
            return CollisionDirection.Right
        } else if (sprite.vx < 0) {
            return CollisionDirection.Left
        } else if (sprite.vy > 0) {
            return CollisionDirection.Bottom
        } else {
            return CollisionDirection.Top
        }  
        
    }
    function turnSprite(sprite:Sprite, direction:CollisionDirection) {
        let v = velocityOf(sprite)

        if (direction == CollisionDirection.Top) {
            sprite.vx = 0
            sprite.vy = -v
        } else if (direction == CollisionDirection.Bottom) {
            sprite.vx = 0
            sprite.vy = v
        } else if (direction == CollisionDirection.Left) {
            sprite.vx = -v
            sprite.vy = 0
        } else {
            sprite.vx = v
            sprite.vy = 0
        } 
    }

    const FOUR_DIRECTION  = [CollisionDirection.Top, CollisionDirection.Right, 
    CollisionDirection.Bottom, CollisionDirection.Left]

    game.onUpdate(function() {
        for (let sprite of _managingSprites) {
            let loc = tiles.locationOfSprite(sprite)
            // only turn when
            let deltaX = loc.x - sprite.x
            let deltaY = loc.y - sprite.y

            // 60Hz
            let interval = (deltaX + deltaY) / (sprite.vx + sprite.vy)

            if (interval >= 0 && interval < 0.016) {
                // close enough
                let candidateList : CollisionDirection[] = []
                let movingDirection = movingDirectionOfSprite(sprite)
                for (let direction of FOUR_DIRECTION) {
                    if (direction == oppositeOf(movingDirection)) {
                        continue;
                    }
                    if (!smoothturn.isWall(sprite, direction)) {
                        candidateList.push(direction)
                    }
                }
                console.log("moving direction:" + movingDirectionOfSprite(sprite))
                console.log(candidateList)
                smoothturn.alignToTileCenter(sprite)
                turnSprite(sprite, Math.pickRandom(candidateList))
            }
        }
    })  


}