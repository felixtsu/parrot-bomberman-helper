namespace bmhelper {

    //%block="move %sprite with smooth alignment||vx %vx vy %vy"
    //% vx.defl=100 vy.defl=100
    //%blockid=bmhelpermovesprite 
    export function moveSprite(sprite:Sprite, vx:number=50, vy:number=50) {
        smoothturn.moveSprite(sprite, vx, vy)
    }

}