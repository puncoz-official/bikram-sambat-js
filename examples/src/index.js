import BikramSambat, {
    ADToBS,
    BSToAD,
} from "../.."

console.log(BSToAD("2048-12-05"))
console.log(ADToBS("1992-03-18"))
console.log(new BikramSambat().toAD())
console.log(new BikramSambat().toBS())
console.log(BSToAD('2076-05-08'))

// edge case
console.log('edge case')
console.log('2081-02-32 =>', BSToAD('2081-02-32'))
console.log('2081-03-01 =>', BSToAD('2081-03-01'))
console.log('2024-06-13 =>', ADToBS('2024-06-13'))
console.log('2024-06-14 =>', ADToBS('2024-06-14'))
console.log('2024-06-15 =>', ADToBS('2024-06-15'))
