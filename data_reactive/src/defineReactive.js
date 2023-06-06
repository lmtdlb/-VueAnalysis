import Dep from "./Dep"
import observe from "./observe"

export default function defineReactive(obj,key,value) {
  const dep = new Dep()

  if(arguments.length === 2) {
    value = obj[key]
  }

  let childOb = observe(value)

  Object.defineProperty(obj,key,{
    enumerable: true,
    configurable: true,
    // 搜集依赖
    get() {
      console.log('你试图访问',key)
      // 如果现在处于依赖收集阶段
      if(Dep.target) {
        dep.depend()
        if(childOb){
          childOb.dep.depend()
        }
      }
      return value
    },
    // 通知依赖
    set(newValue) {
      if(value === newValue) {
        return
      }
      value = newValue

      childOb = observe(value)
      console.log('你试图改变',key,'为',value)

      // 发布订阅模式,通知依赖
      dep.notify()
    }
  })
}