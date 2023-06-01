import lookup from "./lookup"


/**
 * 
 * 使tokens转变为dom字符串
 */
export default function renderTemplate(tokens,data) {
  // 结果字符串
  let resultStr = ""
  // 遍历tokens
  for(let i = 0;i < tokens.length;i++){
    let token = tokens[i]
    switch(token[0]) {
      case 'text':
        resultStr += token[1]
        break;
      case 'name':
        resultStr += lookup(data,token[1])
        break;
      default:
        resultStr += parseArray(token,data)

    }
  }
  return resultStr
}

/**
 * 
 * 处理数组,结合renderTemplate实现递归
 * 
 * 该函数要递归调用renderTemplate,data长度是多少就调用几次
 */
function parseArray(token,data) {
  let resultStr = ''

  const v = lookup(data,token[1])

  for(let i = 0;i < v.length;i++){
    resultStr += renderTemplate(token[2],{
      ...v[i],
      '.': v[i]
    })
  }

  return resultStr
}