import observe from "./observe"
import array from "./array"
import Watcher from "./Watcher"



const obj = {
  a:{
    m:{
      n:10
    }
  },
  b:5,
  c:[11,22,33]
}

observe(obj)

new Watcher(obj,'a.m.n',(val) => {
  console.log('&&&&',val)
})
console.log(obj)






