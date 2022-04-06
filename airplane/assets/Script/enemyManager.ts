import player from "./player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class enemyManeger extends cc.Component {
    // isPlay = this.getComponent(player).isPlay;

    @property(cc.Prefab)
    enemyPre: cc.Prefab = null;

    @property(cc.Node)
    player: cc.Node = null;

    player_script: player;

    enemyManager() {
        this.schedule(() => {
            if (this.player_script.isPlay == "playing") {
                //创建飞机
                let enemy = cc.instantiate(this.enemyPre);
                //创建父物体
                enemy.setParent(cc.director.getScene());
                // 设置子弹位置
                enemy.x = Math.random() * 640;
                enemy.y = 970;
            }

        }, 1);
    }


    onLoad() {
        this.player_script = this.player.getComponent(player);
    }

    start() {
        this.enemyManager();

    }

    update(dt) {


    }
}
