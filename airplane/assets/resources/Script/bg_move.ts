import player from "./player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class bg_move extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    @property
    speed: number = 4;

    player_script: player;


    bgMove() {
        if (this.player_script.isPlay != "playing") {
            return;
        }
        for (let bgNode of this.node.children) {
            bgNode.y -= this.speed;
            if (bgNode.y < -480) {
                bgNode.y = 1440;
            }
        }
    }



    onLoad() {
        this.player_script = this.player.getComponent(player);
    }

    start() {

    }

    update(dt) {
        this.bgMove();

    }
}
