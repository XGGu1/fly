import enemy from "./enemy";
import { Global } from "./Global";
import player from "./player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class enemyManeger extends cc.Component {

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
            if (Global.game_state == "playing") {
                //创建飞机
                let enemy = cc.instantiate(this.enemyPre);
                //创建父物体
                enemy.setParent(cc.director.getScene());
                // 设置初始位置
                enemy.x = Math.random() * 640;
                enemy.y = 970;
            }

        }, 1);
    }

    enemy2Manager() {
        this.schedule(() => {
            if (Global.game_state == "playing") {
                //创建飞机
                let enemy2 = cc.instantiate(this.enemy2Pre);
                //创建父物体
                enemy2.setParent(cc.director.getScene());
                // 设置初始位置
                enemy2.x = Math.random() * 640;
                enemy2.y = 970;
            }

        }, 3);
    }

    bossManager() {
        this.schedule(() => {
            if (Global.game_state == "playing") {
                //创建飞机
                let boss = cc.instantiate(this.bossPre);
                //创建父物体
                boss.setParent(cc.director.getScene());
                // 设置初始位置
                boss.x = 320;
                boss.y = 1200;
            }
        }, 20);
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
        this.bossManager();

    }

    update(dt) {


    }
}
