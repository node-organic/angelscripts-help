describe("angelscripts help", function(){

  var Angel = require("organic-angel")

  it("helps", function(next){
    var instance = new Angel()
    instance.scripts.loadScript(__dirname+"/../index.js", function (err) {
      instance.do("help.json", function(err, result){
        expect(err).toBe(null)
        expect(JSON.stringify(result)).toContain("$ angel help")
        next()
      })
    })
  })

  it("suggests available commands", function(next){
    var instance = new Angel()
    instance.scripts.loadScript(__dirname+"/../index.js", function (err) {
      instance.do("non existing", function(err, result){
        expect(err).toBe(null)
        next()
      })
    })
  })

})
