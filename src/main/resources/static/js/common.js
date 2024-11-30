export function FormatCurrency(number, locale = 'vi-VN', currency = 'VND') {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
}