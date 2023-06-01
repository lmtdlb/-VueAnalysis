import Scanner from "./Scanner"
import nestTokens from "./nestTokens"

/**
 * 
 * 将模板字符串变为tokens数组
 */
export default function parseTemplateToTokens(templateStr) {
  const tokens = []

  const scanner = new Scanner(templateStr)
  let words
  while(!scanner.eos()) {
    words = scanner.scanUtil('{{')
    if(words) {
      tokens.push(['text',words])
    }
    scanner.scan('{{')
    words = scanner.scanUtil('}}')
    if(words) {
      // 判断{{}}首字符
      if(words[0] === '#') {
        tokens.push(['#',words.slice(1)])
      }else if(words[0] === '/') {
        tokens.push(['/',words.slice(1)])
      }else {
        tokens.push(['name',words])
      }
    }
    scanner.scan('}}')
  }

  return nestTokens(tokens) 
}