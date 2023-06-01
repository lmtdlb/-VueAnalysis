/**
 * 可以在对象中查找连续使用keyName的值
 * 
 * 例如： const obj = {a:{b:{c:100}}}
 * 
 *  lookup(obj,'a.b.c')  100
 * 
 */

export default function lookup(obj,keyName) {
  let temp = obj

  if(keyName.includes('.') && keyName !== '.') {
    const arr = keyName.split('.')
    for(let i = 0;i < arr.length;i++){
      temp = temp[arr[i]]
    }
  }else {
    temp = temp[keyName]
  }
  return temp
}