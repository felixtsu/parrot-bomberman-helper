//%block="炸弹人Helpers"
//% weight=100 color=#E29E28 icon="\u24d1"
namespace bmhelper {

    //%block="丝般顺滑的移动 $sprite=variables_get(mySprite) ||速度 vx %vx vy %vy"
    //%expandableArgumentMode="toggle"
    //%vx.defl=100 vy.defl=100
    //%blockid=bmhelpermovesprite 
    export function moveSprite(sprite:Sprite, vx:number=50, vy:number=50) {
        smoothturn.moveSprite(sprite, vx, vy)
    }

    //%block="以速度 %velocity 随机移动 $sprite=variables_get(mySprite) "
    //%blockid=bmhelperrandomlymovesprite 
    export function randomlyMoveSprite(sprite:Sprite, velocity:number) {
        sprite_movement.randomlyMoveSprite(sprite, velocity)
    }

}