var Table = require("cli-table")
var _ = require("underscore")

module.exports = function(angel){
  angel.on("help", function(angel, next){
    var $handlers = angel.reactor.$handlers
    var table = new Table({
      head: ['Command pattern', 'Example']
    });
    for(var i = 0; i<$handlers.length; i++) {
      var helpText = {}
      var originalPattern = $handlers[i].originalPattern
      helpText[originalPattern] = $handlers[i].example || "example missing"
      table.push(helpText)
    }
    next(null, table.toString())
  })
  .example("$ angel help")
  .description("brings short hand help with examples")

  angel.on("help.json", function(angel, next){
    var $handlers = angel.reactor.$handlers
    var table = []
    for(var i = 0; i<$handlers.length; i++) {
      var helpText = {}
      var originalPattern = $handlers[i].originalPattern
      helpText[originalPattern] = $handlers[i].example || "example missing"
      table.push(helpText)
    }
    next(null, table)
  })
  .example("$ angel help.json")
  .description("brings short hand help with examples in json")

  angel.on(/help (.*)$/, function(angel, next){
    var $handlers = angel.reactor.$handlers
    var found_descriptions = []
    for(var i = 0; i<$handlers.length; i++) 
      if($handlers[i].originalPattern.toString().match(angel.cmdData[1])) {
        var description = {}
        description[$handlers[i].originalPattern] = ($handlers[i].description || "description missing")
        found_descriptions.push(description)
      }
    found_descriptions = _.uniq(found_descriptions)
    if(found_descriptions.length == 0)
      return next(new Error("not found description for "+angel.cmdData[1]))
    return next(null, found_descriptions)
  })
  .example("$ angel help command")
  .description("brings description of given command pattern (.*)")
}