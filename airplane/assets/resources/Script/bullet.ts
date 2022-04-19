import enemy from "./enemy";
import enemy2 from "./enemy2";
import { Global } from "./Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class bullet extends cc.Component {

    @property
    speed: number = 800;//子弹速度


    onCollisionEnter(other: cc.BoxCollider) {
        if (other.tag == 1) {
            let script = other.node.getComponent(enemy)
            script.die();
            this.node.destroy();
            Global.nodePool.put(this.node);
        }
        if (other.tag == 2) {
            let script = other.node.getComponent(enemy2)
            script.hurt();
            this.node.destroy();
            Global.nodePool.put(this.node);
        }
    }


    onLoad() {


    }

    start() {

    }

    update(dt) {
        if (this.node.y > 1000) {
            this.node.destroy();
        }
        this.node.y += this.speed * dt;
    }
}
