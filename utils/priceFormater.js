const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});

export default function (price) {
    return formatter.format(price)
}