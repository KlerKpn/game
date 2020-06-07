const canvas = document.getElementById("game")
const context = canvas.getContext("2d")

const fon = new Image()
fon.src = "konoha.jpg"

const sasuke = new Image()
sasuke.src = "uchiha-sasuke.png"

const chidori = new Image()
chidori.src = "chidori.png"

const vrag = new Image()
vrag.src = "naruto.png"

let x = 0
let enemy = []
let bullet = []

fon.onload = () => { 
    game()  
}

let p
let w
 let chidoriX
 let chidoriY
    canvas.addEventListener("mousemove", (event)=>{
       p = event.offsetX
       w = event.offsetY
       
    })
   

setInterval(() => {
    enemy.push({
         x: Math.random()*600,
         y: -150,
         dx: Math.random()*2-1,
         dy: Math.random()*2+2
    })
}, 700)

setInterval(() => {
    bullet.push({
       x: p+10,
       y: w,
       dx: 0,
       dy: -7
    })
}, 600)
let count = 1
const render = () => {
    
context.drawImage(fon, 0, 0, 600, 600)
context.drawImage(sasuke, p, w, 100, 100)
for(let i in bullet){ 
    context.drawImage(chidori, bullet[i].x, bullet[i].y, 100,100)
}

for(let i in enemy){ 
    context.drawImage(vrag, enemy[i].x , enemy[i].y, 100, 100)
}
}

const update = () => {
    for( let i in enemy){
        enemy[i].x += enemy[i].dx
        enemy[i].y += enemy[i].dy

        if(enemy[i].x >= 500 || enemy[i].x <0)  enemy[i].dx=-enemy[i].dx
        if(enemy[i].y >= 600)  enemy.splice(i, 1)

        for ( let j in bullet) {
            if (Math.abs(enemy[i].x+25-bullet[j].x-15)<50 && Math.abs(enemy[i].y-bullet[j].y)<25) {
            enemy.splice(i,1)
            bullet.splice(j,1)
            
            console.log('target hit counter: ' + count++ )
            }
        }
    }

    for(let i in bullet){
        bullet[i].x += bullet[i].dx
        bullet[i].y += bullet[i].dy

        if(bullet[i].x >= 500 || bullet[i].x <0)  bullet[i].dx=-bullet[i].dx
        if(bullet[i].y <= -10)  bullet.splice(i, 1)
    }
}
const game = () =>{
    update()
    render()
    requestAnimFrame(game)
}

let requestAnimFrame = (()=>{
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 20)
        }
})()