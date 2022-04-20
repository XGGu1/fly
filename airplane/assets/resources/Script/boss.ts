import { Global } from "./Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class boss extends cc.Component {

    @property(cc.Prefab)
    enemyBullet: cc.Prefab = null;

    boss_state: string = "live";

    boss_hp: number = 20;

    targetPos1: cc.Vec2 = cc.v2(320, 820);//目标位置
    targetPos2: cc.Vec2 = cc.v2(150, 650);
    targetPos3: cc.Vec2 = cc.v2(490, 650);

    move() {
        //设置目标位置
        //移动
        let move1: cc.Tween = cc.tween().to(5, { position: this.targetPos1 });
        let move2: cc.Tween = cc.tween().to(5, { position: this.targetPos2 });
        let move3: cc.Tween = cc.tween().to(5, { position: this.targetPos3 });
        let sequence = cc.tween().sequence(move1, move2, move3, move1);
        sequence.target(this.node).start();
        // sequence.target(this.node).repeatForever();
    }

    hurt() {
        this.boss_hp -= 1;
        if (this.boss_hp <= 0) {
            this.die();
        }
    }

    die() {
        this.node.getComponent(cc.Animation).play("boss_die");
        this.boss_state = "die";
        Global.score += 20;//击败加分
        this.node.stopAllActions();
        setTimeout(() => {
            this.node.destroy();
        }, 500);
    }

    dieBySelf() {
        //玩家死亡后boss自行销毁
        this.schedule(() => {
            if (Global.game_state == "die") {
                this.node.getComponent(cc.Animation).play("boss_die");
                this.boss_state = "die";
                this.node.stopAllActions();
                setTimeout(() => {
                    this.node.destroy();
                }, 500);
            }
        }, 1.5);
    }

    attack() {
        this.schedule(() => {
            if (this.boss_state == "live") {
                //创建子弹
                let enemyBullet = cc.instantiate(this.enemyBullet);
                //创建父物体
                enemyBullet.setParent(cc.director.getScene());
                // 设置子弹位置
                enemyBullet.x = this.node.x;
                enemyBullet.y = this.node.y - 130;
            }
        }, 1.5);
    }



    // onCollisionEnter() {
    //     this.boss_hp -= 1;
    //     if (this.boss_hp <= 0) {
    //         this.die();
    //     }
    // }

    onLoad() { }

    start() {
        this.move();
        this.attack();
        this.dieBySelf();
    }

    update(dt) {

    }
}
