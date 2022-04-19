import { Global } from "./Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class enemy extends cc.Component {

    enemy_state: string = "live";

    // addScoreCallBack: Function;

    die() {
        this.node.getComponent(cc.Animation).play("enemy_die");
        this.enemy_state = "die";
        Global.score += 1;
        // this.addScoreCallBack();
        setTimeout(() => {
            this.node.destroy();
        }, 300);
    }

    onLoad() {

    }

    start() {

    }

    update(dt) {
        if (this.enemy_state == "live") {
            this.node.y -= 300 * dt;
        };
        if (this.node.y < 0) {
            this.node.destroy();
        };

    }
}
