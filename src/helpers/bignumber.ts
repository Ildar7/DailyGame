import BigNumber from 'bignumber.js'

export function convertStringToNumber(value: string | number): number {
    return new BigNumber(`${value}`).toNumber()
}

export function multiply(
    numberOne: number | string,
    numberTwo: number | string
): string {
    return new BigNumber(`${numberOne}`)
        .times(new BigNumber(`${numberTwo}`))
        .toString()
}

export function greaterThanOrEqual(
    numberOne: number,
    numberTwo: number
): boolean {
    return (
        new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) >= 0
    )
}