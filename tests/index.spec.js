describe("angelscripts help", function(){

  var Angel = require("organic-angel")
  
  it("helps", function(next){
    var instance = new Angel({scripts:[__dirname+"/../index.js"]})
    instance.plasma.on("ready", function(){
      instance.do("help", function(err, result){
        expect(err).toBe(null)
        expect(result).toContain("$ angel help")
        next()
      })  
    })
  })

})