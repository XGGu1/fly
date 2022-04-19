import { Global } from "./Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class enemy2 extends cc.Component {

    @property(cc.Prefab)
    enemyBullet: cc.Prefab = null;

    enemy2_state: string = "live";

    enemy2_hp: number = 3;

    targetPos: cc.Vec2 = null;//目标位置


    move() {
        //设置目标位置
        this.targetPos = cc.v2(Math.random() * 640, -60);
        //移动
        let move: cc.Tween = cc.tween().to(5, { position: this.targetPos })
        move.target(this.node).start();
    }

    hurt() {
        this.enemy2_hp -= 1;
        if (this.enemy2_hp <= 0) {
            this.die();
        }
    }

    die() {
        this.node.getComponent(cc.Animation).play("enemy2_die");
        this.enemy2_state = "die";
        Global.score += 5;//击败加分
        setTimeout(() => {
            this.node.destroy();
        }, 300);
    }

    attack() {
        this.schedule(() => {
            if (this.enemy2_state = "live") {
                //创建子弹
                let enemyBullet = cc.instantiate(this.enemyBullet);
                //创建父物体
                enemyBullet.setParent(cc.director.getScene());
                // 设置子弹位置
                enemyBullet.x = this.node.x;
                enemyBullet.y = this.node.y - 50;
            }
        }, 1.5);
    }
    //玩家重复被子弹打中时会重复播放死亡动画

    // onCollisionEnter() {
    //     this.enemy2_hp -= 1;
    // }

    onLoad() { }

    start() {
        this.move();
        this.attack();
    }

    update(dt) {
        if (this.node.y < 0) {
            this.node.destroy();
        };
    }
}
