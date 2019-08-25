import { ADToBS, BSToAD } from ".."

test("AD to BS conversion", () => {
    expect(ADToBS("2019-08-25")).toBe("2076-05-08")
})

test("BS to AD conversion", () => {
    expect(BSToAD("2076-05-08")).toBe("2019-08-25")
})
