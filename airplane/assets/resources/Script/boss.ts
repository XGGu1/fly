
const { ccclass, property } = cc._decorator;

@ccclass
export default class boss extends cc.Component {

    boss_state: string = "live";

    boss_hp: number = 10;

    die() {
        this.node.getComponent(cc.Animation).play("boss_die");
        this.boss_state = "die";
        setTimeout(() => {
            this.node.destroy();
        }, 300);
    }

    onCollisionEnter() {
        this.boss_hp -= 1;
        if (this.boss_hp <= 0) {
            this.die();
        }
    }

    onLoad() { }

    start() {

    }

    update(dt) { }
}
