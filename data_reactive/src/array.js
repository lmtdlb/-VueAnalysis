import def from "../utils/def"

const arrayPrototype = Array.prototype

export const arrayMethods = Object.create(arrayPrototype)

console.log(arrayMethods,'arrayMethods')

const methodsNeedChange = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'reverse',
  'sort'
]

methodsNeedChange.forEach(methodName => {
  // 备份原来的方法
  const original = arrayMethods[methodName]
  // 定义新的方法
  def(arrayMethods,methodName,function(){
    const result = original.apply(this,arguments)

    const ob = this.__ob__

    // push/unshift/splice 三种方法可以插入新的项,因此需要将新插入的项也变成observe
    let inserted = []
    const argumentsArr = [...arguments]
    switch(methodName) {
      case 'push':
      case 'unshift':
        inserted = argumentsArr
        break
      case 'splice':
        inserted = argumentsArr.slice(2)
        break
    }

    // 如果数组有新插入的项,将新项也变成响应的
    if(inserted.length > 0) {
      ob.observeArray(inserted)
    }

    ob.dep.notify()

    return result
  },false)
})

