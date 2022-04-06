import player from "./player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    start_gmae: cc.Node = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Node)
    btn_start: cc.Node = null;

    player_script: player;

    onLoad() {
        this.player_script = this.player.getComponent(player);
    }

    start() {
        this.start_gmae.on(cc.Node.EventType.TOUCH_START, () => {
            this.player_script.isPlay = "playing";
            this.btn_start.active = false;
        })
        // this.schedule(() => {
        //     console.log("开启了");
        //     if (this.player_script.isPlay == "die") {
        //         this.node.active = true;
        //         console.log("进来了");
        //     }
        // }, 3);

    }

    update(dt) {
        if (this.player_script.isPlay == "die") {
            this.btn_start.active = true;
            this.player.setPosition(1, 2)
            console.log("进来了");
        }
    }
}
