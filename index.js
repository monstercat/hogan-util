var hogan = require('hogan.js')

var util = {
  validate: function validate (tree, variables, root) {
    if (!(variables instanceof Array)) variables = [variables]

    for (var n=0; n<variables.length; n++) {
      var vars = variables[n]
      for (var i=0; i<tree.length; i++) {
        var branch = tree[i]

        if (branch.tag == '_v' && !vars[branch.n]) {
          return Error('The "' + (root || "root") +
            '" branch is missing variable named "' +
            branch.n + '" in an item.')
        }

        if (branch.tag == "#" && vars[branch.n]) {
          var err = util.validate(branch.nodes, vars[branch.n], branch.n)
          if (err) return err
        }
      }
    }
  },
  tree: function tree (text) {
    return hogan.parse(hogan.scan(text))
  },
  isRenderable: function isRenderable (text, variables) {
    return util.validate(util.tree(text), variables)
  },
  render: function render (text, variables) {
    return hogan.compile(text).render(variables)
  },
  hogan: hogan
}

module.exports = util