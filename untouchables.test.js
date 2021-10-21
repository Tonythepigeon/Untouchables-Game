const rewire = require("rewire")
const untouchables = rewire("./untouchables")
const reset = untouchables.__get__("reset")
// @ponicode
describe("reset", () => {
    test("0", () => {
        let result = reset()
        expect(result).toMatchSnapshot()
    })
})
