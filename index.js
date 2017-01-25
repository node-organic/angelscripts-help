var Table = require("cli-table")
var _ = require("underscore")

module.exports = function(angel){
  angel.on("help", function(angel, next){
    var $handlers = angel.reactor.$handlers
    var table = new Table({
      head: ['Command pattern', 'Example', 'Description']
    });
    for(var i = 0; i<$handlers.length; i++) {
      var helpText = {}
      var originalPattern = $handlers[i].originalPattern
      helpText[originalPattern] = [$handlers[i].example || "example missing", $handlers[i].description || "description missing"]
      table.push(helpText)
    }
    console.log(table.toString())
    next(null, table)
  })
  .example("$ angel help")
  .description("brings short hand help with examples")

  angel.on(/help (.*)$/, function(angel, next){
    var $handlers = angel.reactor.$handlers
    var table = new Table({
      head: ['Command pattern', 'Example', 'Description']
    });
    for(var i = 0; i<$handlers.length; i++)  {
      if($handlers[i].originalPattern.toString().match(angel.cmdData[1])) {
        var helpText = {}
        var originalPattern = $handlers[i].originalPattern
        helpText[originalPattern] = [$handlers[i].example || "example missing", $handlers[i].description || "description missing"]
        table.push(helpText)
      }
    }
    console.log(table.toString())
    next(null, table)
  })
  .example("$ angel help command")
  .description("brings description of given command pattern (.*)")

  angel.on("help.json", function(angel, next){
    var $handlers = angel.reactor.$handlers
    var table = []
    for(var i = 0; i<$handlers.length; i++) {
      var helpText = {}
      var originalPattern = $handlers[i].originalPattern
      helpText[originalPattern] = {
        example: $handlers[i].example || "example missing",
        description: $handlers[i].description || "description missing"
      }
      table.push(helpText)
    }
    console.log(JSON.stringify(table))
    next(null, table)
  })
  .example("$ angel help.json")
  .description("brings short hand help with examples in json")

  angel.addDefaultHandler(function (input, next) {
    if (input) {
      console.info('(!) "' + input + '" was not found in available commands, run $ angel help for more info')
    } else {
      console.info('(!) command is required')
    }
    next()
  })
}
