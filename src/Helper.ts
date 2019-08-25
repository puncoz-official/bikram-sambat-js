import BikramSambat from "./BikramSambat"

export const BSToAD = (date: string): string => {
    return (new BikramSambat()).setDate(date, "BS").toAD()
}

export const ADToBS = (date: Date | string): string => {
    return (new BikramSambat()).setDate(date, "AD").toBS()
}
