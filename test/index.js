fs   = require('fs')
path = require('path')
util = require('../index')

text = String(fs.readFileSync(path.join(__dirname, 'sample.md')))
tree = util.tree(text)
obj = util.treeToObject(tree)
obj.date = new Date()

if (process.env.DEBUG) {
  //console.log(tree)
  //console.log(obj)
  //console.log(util.highlight(text, '👉', '👈'))
  //console.log(util.render(text, obj, { transforms: { dateFormat: 'F j, Y' }}))
  console.log(util.render(text, obj))
}
console.log('valid: ' + String(!util.validate(tree, obj)))