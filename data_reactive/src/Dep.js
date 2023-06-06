let uid = 0
export default class Dep {
  constructor() {
    console.log('Dep类')
    this.id = uid++
    // 存储自己的订阅者即Watcher实例
    this.subs = []
  }

  // 添加订阅
  addSub(sub) {
    this.subs.push(sub)
  }

  // 添加依赖
  depend() {
    if(Dep.target) {
      this.addSub(Dep.target)
    }
  }

  // 通知更新
  notify() {
    // 浅克隆一份
    const subs = [...this.subs]
    // 遍历Watcher实例
    for(let i = 0,l = subs.length;i < l;i++){
      subs.update()
    }
  }

}