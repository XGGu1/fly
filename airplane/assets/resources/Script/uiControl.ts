import { Global } from "./Global";
import player from "./player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class uiControl extends cc.Component {

    @property(cc.Node)
    start_gmae: cc.Node = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Node)
    btn_start: cc.Node = null;

    @property(cc.Node)
    stop_Bg: cc.Node = null;
    @property(cc.Label)
    lbl_score: cc.Label = null;

    player_script: player;

    onLoad() {
        this.player_script = this.player.getComponent(player);
    }
    addScore() {
        // this.lbl_score +=;
    }
    start() {
        this.start_gmae.on(cc.Node.EventType.TOUCH_START, () => {
            Global.game_state = "playing";
            this.btn_start.active = false;
            this.player.x = 320;
            this.player.y = 200;
            this.player.active = true;
            this.stop_Bg.active = false;
            Global.score = 0;

        })

    }

    update(dt) {
        this.lbl_score.string = Global.score + ""
    }
}
