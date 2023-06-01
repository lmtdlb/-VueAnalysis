import parseTemplateToTokens from "./parseTemplateToTokens"
import renderTemplate from "./renderTemplate"

window.templateEngine = {
  render(templateStr,data) {
    // 调用parseTemplateToTokens,使模板字符串转为tokens
    const tokens = parseTemplateToTokens(templateStr)
    // 调用renderTemplate,使tokens转为dom字符串
    const domStr = renderTemplate(tokens,data)
    
    return domStr
  }
}