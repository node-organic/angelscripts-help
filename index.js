var Table = require("cli-table2")
var _ = require("underscore")
var getWidthPercentage = function (percentage) {
  var terminalWidth = process.stdout.columns || 100
  return Math.floor(terminalWidth * percentage / 100) - 1
}
var tableOpts = {
  head: ['Command pattern', 'Example', 'Description'],
  style: {
    head: [], // disable colors in header cells
    border: [] // disable colors for the border
  },
  colWidths: [
    getWidthPercentage(30),
    getWidthPercentage(30),
    getWidthPercentage(40)
  ],
  wordWrap: true
}
var getTableRow = function (command, example, description) {
  return [
    { vAlign: 'center', content: command ? command.toString() : "missing command" },
    { vAlign: 'center', content: example ? example.toString() : "missing example" },
    { vAlign: 'top', content: description ? description.toString()  : "missing description" },
  ]
}

module.exports = function(angel){
  angel.on("help", function(angel, next){
    var $handlers = angel.reactor.$handlers
    var table = new Table(tableOpts);
    for(var i = 0; i<$handlers.length; i++) {
      var originalPattern = $handlers[i].originalPattern
      table.push(getTableRow(
        originalPattern,
        $handlers[i].example,
        $handlers[i].description
      ))
    }
    console.log(table.toString())
    next(null, table)
  })
  .example("$ angel help")
  .description("brings short hand help with examples")

  angel.on(/help (.*)$/, function(angel, next){
    var $handlers = angel.reactor.$handlers
    var table = new Table(tableOpts);
    for(var i = 0; i<$handlers.length; i++)  {
      if($handlers[i].originalPattern.toString().match(angel.cmdData[1])) {
        var originalPattern = $handlers[i].originalPattern
        table.push(getTableRow(
          originalPattern,
          $handlers[i].example,
          $handlers[i].description
        ))
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
