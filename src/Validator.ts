import Config from "./Config"

export default class Validator {
    public static dateType(type: string): boolean {
        if (!["BS", "AD"].includes(type)) {
            throw new TypeError("Invalid date type. Only 'AD' or 'BS' type supported.")
        }

        return true
    }

    public static adYear(year: number) {
        const minAdYear = Config.minBSYear - 57
        const maxAdYear = Config.maxBSYear - 57

        if (year < minAdYear || year > maxAdYear) {
            throw new RangeError(`AD year should be in range of ${minAdYear} to ${maxAdYear}`)
        }
    }

    public static adMonth(month: number) {
        if (month < 1 || month > 12) {
            throw new RangeError("AD month should be in range of 1 to 12")
        }
    }

    public static adDay(day: number) {
        if (day < 1 || day > 31) {
            throw new RangeError("AD day should be in range of 1 to 31")
        }
    }

    public static bsYear(year: number) {
        const midBsYear = Config.minBSYear
        const maxBsYear = Config.maxBSYear

        if (year < midBsYear || year > maxBsYear) {
            throw new RangeError(`BS year should be in range of ${midBsYear} to ${maxBsYear}`)
        }
    }

    public static bsMonth(month: number) {
        if (month < 1 || month > 12) {
            throw new RangeError("BS month should be in range of 1 to 12")
        }
    }

    public static bsDay(day: number) {
        if (day < 1 || day > 32) {
            throw new RangeError("BS day should be in range of 1 to 32")
        }
    }

}
