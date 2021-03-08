interface IFIO {
    lastName: string
    name: string
    middleName: string
}
export const getFIO = ({ lastName, name, middleName }: IFIO): string => {
    return `${lastName} ${name.charAt(0)}.${middleName.charAt(0)}.`
}