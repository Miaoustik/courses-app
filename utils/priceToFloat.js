export default function (string) {
    return parseFloat(string.substring(0, string.length - 2).replace(',', '.'))
}