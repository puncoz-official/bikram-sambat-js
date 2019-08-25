import Config from "./Config"
import Validator from "./Validator"

interface DateObject {
    year: number,
    month: number,
    day: number
}

export default class BikramSambat {
    private dateType: string = "AD"
    private date: DateObject = { year: 0, month: 0, day: 0 }

    constructor(date?: Date | string, type: string = "AD") {
        if (date) {
            this.setDate(date, type)
        } else {
            this.setDate(new Date())
        }
    }


    public setDate(date: Date | string, type: string = "AD"): BikramSambat {
        Validator.dateType(type)
        if (type === "BS") {
            if (typeof date !== "string") {
                throw new TypeError("BS date should be 'string' type.")
            }

            this.dateType = "BS"
            this.date = this.splitBsDate(date)

            return this
        }

        this.dateType = "AD"
        this.date = this.splitAdDate(date)

        return this
    }

    public toAD(): string {
        if (this.dateType === "AD") {
            return this.format(this.date)
        }

        const totalDaysSince = this.totalDaysSince()

        const { year, month, day } = this.splitDate(Config.referenceDate.AD)
        const adDate = new Date(year, month, day - 1)
        adDate.setDate(adDate.getDate() + totalDaysSince)

        return this.format(this.splitAdDate(adDate))
    }

    public toBS(): string {
        if (this.dateType === "BS") {
            return this.format(this.date)
        }

        const { year: adYear, month: adMonth, day: adDay } = this.date
        let bsYear = adYear + 57
        let bsMonth = (adMonth + 9) % 12 || 12
        let bsDay = 1


        if (adMonth < 4) {
            bsYear -= 1
        } else if (adMonth === 4) {
            const bsNewYearAdDate = (new BikramSambat(this.format({ year: bsYear, month: 1, day: 1 }), "BS")).toAD()
            if (adDay < new Date(bsNewYearAdDate).getDate()) {
                bsYear -= 1
            }
        }

        const bsFirstDayOfMonthAdDate = new Date((new BikramSambat(this.format({ year: bsYear, month: bsMonth, day: 1 }), "BS")).toAD())
        if (adDay >= 1 && adDay < bsFirstDayOfMonthAdDate.getDate()) {
            bsMonth = (bsMonth !== 1) ? bsMonth - 1 : 12
            const daysInBSMonth = this.daysInBsMonth(bsYear, bsMonth)
            bsDay = daysInBSMonth - (bsFirstDayOfMonthAdDate.getDate() - adDay) + 1
        } else {
            bsDay = adDay - bsFirstDayOfMonthAdDate.getDate() + 1
        }

        return this.format({ year: bsYear, month: bsMonth, day: bsDay })
    }

    /**
     * Calculate total number of days since minimum reference date
     */
    private totalDaysSince(): number {
        const { year: bsYear, month: bsMonth, day: bsDay } = this.date

        let totalDays = 0
        const diffInYears = bsYear - Config.minBSYear
        for (let i = 1; i <= 12; i++) {
            totalDays += this.totalMonthDaysSince(i, i < bsMonth ? diffInYears + 1 : diffInYears)
        }

        if (bsYear > 2085 && bsYear < 2088) {
            totalDays += bsDay - 2
        } else if (bsYear === 2085 && bsMonth > 5) {
            totalDays += bsDay - 2
        } else if (bsYear > 2088) {
            totalDays += bsDay - 4
        } else if (bsYear === 2088 && bsMonth > 5) {
            totalDays += bsDay - 4
        } else {
            totalDays += bsDay
        }

        return totalDays
    }

    /**
     * Total number of bsMonth days since minimum reference date
     * @param bsMonth
     * @param diffInYear
     */
    private totalMonthDaysSince(bsMonth: number, diffInYear: number): number {
        if (diffInYear === 0) {
            return 0
        }

        const monthData = Config.monthReferences[bsMonth - 1]

        interface Total {
            month: number,
            year: number
        }

        const calculated = monthData.slice(0).reduce((total: Total, monthDataItem: number, monthIndex, arr: number[]): Total => {
            if (monthDataItem === 0) {
                return total
            }

            const monthTotalDaysCountIndex = monthIndex % 2
            if (diffInYear > total.year + monthDataItem) {
                total.year += monthDataItem
                total.month += Config.bsMonthTotalDaysCount[bsMonth - 1][monthTotalDaysCountIndex] * monthDataItem
            } else {
                total.month += Config.bsMonthTotalDaysCount[bsMonth - 1][monthTotalDaysCountIndex] * (diffInYear - total.year)
                total.year = diffInYear - total.year
                arr.splice(1) // break; dont forget slice(0) before reducing https://stackoverflow.com/questions/36144406/how-to-break-on-reduce-method
            }

            return total
        }, { month: 0, year: 0 })

        return calculated.month
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Returns total number of days in bsMonth for bsYear
     * @param bsYear
     * @param bsMonth
     */
    private daysInBsMonth(bsYear: number, bsMonth: number): number {
        const totalYears = (bsYear + 1) - Config.minBSYear
        const monthData = Config.monthReferences[bsMonth - 1]

        let yearCount = 0
        for (let i = 0; i < monthData.length; i++) {
            if (monthData[i] === 0) {
                continue
            }

            const monthTotalDaysCountIndex = i % 2
            yearCount += monthData[i]
            if (totalYears <= yearCount) {
                if ((bsYear === 2085 && bsMonth === 5) || (bsYear === 2088 && bsMonth === 5)) {
                    return Config.bsMonthTotalDaysCount[bsMonth - 1][monthTotalDaysCountIndex] - 2
                } else {
                    return Config.bsMonthTotalDaysCount[bsMonth - 1][monthTotalDaysCountIndex]
                }
            }
        }

        return 0
    }

    private splitDate(date: string): DateObject {
        // tslint:disable-next-line:radix
        const [year, month, day]: number[] = date.replace(/\//g, "-").split("-").map(d => parseInt(d))

        return { year, month, day }
    }

    // noinspection JSMethodCanBeStatic
    private splitAdDate(date: Date | string): DateObject {
        if (typeof date === "string") {
            date = new Date(date)
        }

        const year: number = date.getFullYear()
        const month: number = date.getMonth() + 1
        const day: number = date.getDate()

        Validator.adYear(year)
        Validator.adMonth(month)
        Validator.adDay(day)

        return { year, month, day }
    }

    private splitBsDate(date: string): DateObject {
        const { year, month, day } = this.splitDate(date)

        Validator.bsYear(year)
        Validator.bsMonth(month)
        Validator.bsDay(day)

        return { year, month, day }
    }

    private format(date: DateObject): string {
        const separator: string = Config.outputSeparator
        const { year, month, day } = date

        return `${year}${separator}${this.zeroPad(month)}${separator}${this.zeroPad(day)}`
    }

    // noinspection JSMethodCanBeStatic
    private zeroPad(x: number): string {
        return x > 9 ? `${x}` : `0${x}`
    }
}
