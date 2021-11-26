const Angel = require("organic-angel")
describe("angelscripts help", function(){
  it("helps", async function() {
    var instance = new Angel()
    await instance.loadScript(__dirname+"/../index.js")
    const result = await instance.do("help.json")
    expect(JSON.stringify(result)).toContain("$ angel help")
  })

  it("suggests available commands", async function(){
    var instance = new Angel()
    await instance.loadScript(__dirname+"/../index.js")
    try {
      await instance.do("non existing")
    } catch (e) {
      expect(e.message).toBe('failed to execute')
    }
  })
})
