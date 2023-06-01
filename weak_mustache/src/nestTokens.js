/**
 * 
 * 折叠tokens 将#和/之间的tokens整合,作为第三项
 */

export default function nestTokens(tokens) {
  //结果数组
  const nestedTokens = []
  // 收集器  巧妙地利用了js引用值特性
  let collector = nestedTokens
  //栈
  const stack = []

  for(let i = 0;i < tokens.length;i++){
      const token = tokens[i]
      switch(token[0]) {
        case '#':
          collector.push(token)
          stack.push(token)
          collector = token[2] = []
          break
        case '/':
          stack.pop()
          collector = stack.length === 0 ? nestedTokens : stack[stack.length - 1][2]
          break
        default:
          collector.push(token)
      }
  }
  return nestedTokens
}