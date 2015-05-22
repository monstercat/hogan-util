fs   = require('fs')
path = require('path')
util = require('../index')

text = String(fs.readFileSync(path.join(__dirname, 'sample.md')))
tree = util.tree(text)
obj = util.treeToObject(tree)

if (process.env.DEBUG) console.log(obj)
console.log('valid: ' + String(!util.validate(tree, obj)))
