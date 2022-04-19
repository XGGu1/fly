
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    speed: number = 800;//子弹速度

    onLoad() { }

    start() {

    }

    update(dt) {
        if (this.node.y < 0) {
            this.node.destroy();
        }
        this.node.y -= this.speed * dt;
    }
}
