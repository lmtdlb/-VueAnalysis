/**
 * 扫描器类
 * 为模板字符串服务
 */

export default class Scanner {
  constructor(templateStr) {
    this.templateStr = templateStr
    //指针
    this.pos = 0
    //尾巴字符串
    this.tailStr = templateStr
  }

  /**
   * 跳过指定内容，无返回值
   */
  scan(tag) {
    if(this.tailStr.startsWith(tag)) {
      this.pos += tag.length

      this.tailStr = this.templateStr.slice(this.pos)
    }
  }

  /**
   * 指针开始扫描,直到指定内容,返回经过的内容
   */
  scanUtil(stopTag) {
    const startPos = this.pos
    while(!this.tailStr.startsWith(stopTag) && !this.eos()) {
      this.pos++
      this.tailStr = this.templateStr.slice(this.pos)
    }

    return this.templateStr.slice(startPos,this.pos)
  }
  /**
   * 指针是否到头
   */
  eos() {
    return this.pos >= this.templateStr.length
  }
}