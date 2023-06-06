import def from "../utils/def";
import Dep from "./Dep";
import { arrayMethods } from "./array";
import defineReactive from "./defineReactive";
import observe from "./observe";

/**
 * 
 * 将一个正常的object转换为每个层级的属性都是响应式（可以被侦测的）的object
 */
export default class Observer {
  constructor(obj) {
    // 每一个observer实例身上都有一个dep实例
    this.dep = new Dep()
    
    def(obj,'__ob__',this,false)

    // 检查是数组还是对象
    if(Array.isArray(obj)) {
      // 如果是数组将数组原型指向arrayMethods
      Object.setPrototypeOf(obj,arrayMethods)
      // 数组的遍历
      this.observeArray(obj)
    }else {
      // 对象的遍历
      this.walk(obj)
    }
  }

  walk(obj) {
    for (let k in obj) {
      defineReactive(obj,k)
    }
  }

  observeArray(arr) {
    for(let i = 0,l = arr.length;i < l;i++){
      // 数组中没想都进行observe
      observe(arr[i])
    }
  }
}