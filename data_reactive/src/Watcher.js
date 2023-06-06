import Dep from "./Dep"
let uid = 0
export default class Watcher {
  constructor(target,expression,cb) {
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    this.cb = cb
    this.value = this.get()
  }

  update() {
    this.run
  }

  run() {
    this.getAndInvoke(this.cb)
  }

  getAndInvoke(cb){
    let value = this.get()

    if(value !== this.value || typeof value === 'object') {
      const oldValue = this.value
      this.value = value
      cb.call(this.target,value,oldValue)
    }
  }

  get() {
    // 进入依赖收集阶段
    Dep.target = this

    const obj = this.target

    let value

    try {
      value = this.getter(obj)
    } catch (error) {
      
    } finally {
      Dep.target = null
    }

    return value
  }
  
}

function parsePath(str) {
  let strArr =  str.split(',')

  return (obj) => {
    for(let i = 0;i < strArr.length;i++){
      if(!obj) return 
      obj = obj[strArr[i]]
    }
    return obj
  }
  
}