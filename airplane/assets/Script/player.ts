import enemy from "./enemy";
import { Global } from "./Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class player extends cc.Component {

    @property(cc.Prefab)
    bulletPre: cc.Prefab = null;

    isPlay: string = "standby";

    // nodePool: cc.NodePool;//对象池
    bullet: cc.Node;//子弹

    onCollisionEnter(other) {
        if (other.tag == 1) {
            this.node.getComponent(cc.Animation).play("player_die");
            other.getComponent(enemy).die();
            this.isPlay = "die";
        };
    }

    bulletManager() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            this.node.setPosition(event.getLocation());
        })

        //创建对象池
        Global.nodePool = new cc.NodePool();
        for (let i = 0; i <= 5; i++) {
            this.bullet = cc.instantiate(this.bulletPre);
            //将子弹存入对象池
            Global.nodePool.put(this.bullet);
        }
        this.schedule(() => {
            //this.isPlay = true
            if (this.isPlay == "playing") {
                //创建子弹
                let bullet: cc.Node = null;
                // 通过 size 接口判断对象池中是否有空闲的对象
                if (Global.nodePool.size() > 0) {
                    bullet = Global.nodePool.get();
                } else {
                    //如果没有子弹，就初始化一个子弹，将预制体初始化为一个node节点
                    bullet = cc.instantiate(this.bulletPre);
                }
                this.node.parent.addChild(bullet);
                // bullet.parent = this.node.parent;//canvas
                // let bullet = cc.instantiate(this.bulletPre);
                //创建父物体
                // bullet.setParent(cc.director.getScene());//canvas
                // 设置子弹位置
                bullet.x = this.node.
                    x;
                bullet.y = this.node.y + 64;
            }

        }, 0.5);
        this.schedule(() => {
            if (this.isPlay == "die") {
                this.node.active = false;
            }
        }, 1);

    }

    onLoad() {
        //开启碰撞
        cc.director.getCollisionManager().enabled = true;
    }

    start() {
        this.bulletManager();

    }

    update(dt) { }
}
