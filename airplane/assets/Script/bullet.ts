import enemy from "./enemy";
import { Global } from "./Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class bullet extends cc.Component {

    @property
    speed: number = 800;


    onCollisionEnter(other) {
        if (other.tag == 1) {
            other.getComponent(enemy).die();
            this.node.destroy();
            Global.nodePool.put(this.node);
        }
    }


    onLoad() {


    }

    start() {
        //有问题
        // if (this.node.y > 1000) {
        //     this.node.destroy();
        // }

    }

    update(dt) {
        if (this.node.y > 1000) {
            this.node.destroy();
        }
        this.node.y += this.speed * dt;
    }
}
