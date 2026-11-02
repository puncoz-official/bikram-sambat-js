import { ADToBS, BSToAD } from ".."

test("AD to BS conversion", () => {
    expect(ADToBS("2019-08-25")).toBe("2076-05-08")
})

test("BS to AD conversion", () => {
    expect(BSToAD("2076-05-08")).toBe("2019-08-25")
})

describe("2083 BS Conversion Tests", () => {
    test("Ashwin 31 corresponds to Oct 17, 2026", () => {
        expect(ADToBS("2026-10-17")).toBe("2083-06-31")
        expect(BSToAD("2083-06-31")).toBe("2026-10-17")
    })

    test("Kartik 1 corresponds to Oct 18, 2026", () => {
        expect(ADToBS("2026-10-18")).toBe("2083-07-01")
        expect(BSToAD("2083-07-01")).toBe("2026-10-18")
    })

    test("Oct 31, 2026 corresponds to Kartik 14, 2083", () => {
        expect(ADToBS("2026-10-31")).toBe("2083-07-14")
        expect(BSToAD("2083-07-14")).toBe("2026-10-31")
    })

    test("Kartik 30 corresponds to Nov 16, 2026", () => {
        expect(ADToBS("2026-11-16")).toBe("2083-07-30")
        expect(BSToAD("2083-07-30")).toBe("2026-11-16")
    })

    test("Mangsir 1 corresponds to Nov 17, 2026", () => {
        expect(ADToBS("2026-11-17")).toBe("2083-08-01")
        expect(BSToAD("2083-08-01")).toBe("2026-11-17")
    })
})
