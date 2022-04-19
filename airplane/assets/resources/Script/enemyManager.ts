import enemy from "./enemy";
import { Global } from "./Global";
import player from "./player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class enemyManeger extends cc.Component {
    // isPlay = this.getComponent(player).isPlay;

    @property(cc.Prefab)
    enemyPre: cc.Prefab = null;

    @property(cc.Prefab)
    enemy2Pre: cc.Prefab = null;

    @property(cc.Prefab)
    bossPre: cc.Prefab = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    // @property
    // score: number = 1;


    player_script: player;

    // enemy_script: enemy;

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
                // enemy.getComponent(enemyControl).addScoreCallBack = ()=>{}
            }

        }, 1);
    }

    enemy2Manager() {
        this.schedule(() => {
            if (this.player_script.isPlay == "playing") {
                //创建飞机
                let enemy2 = cc.instantiate(this.enemy2Pre);
                //创建父物体
                enemy2.setParent(cc.director.getScene());
                // 设置子弹位置
                enemy2.x = Math.random() * 640;
                enemy2.y = 970;
                // enemy.getComponent(enemyControl).addScoreCallBack = ()=>{}
            }

        }, 3);
    }

    // addScore() {
    //     this.scoreLabel.string = Global.score + "";
    // }

    onLoad() {
        this.player_script = this.player.getComponent(player);

    }

    start() {
        this.enemyManager();
        this.enemy2Manager();

    }

    update(dt) {


    }
}
