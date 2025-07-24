export const formatCurrency = (value: number, locale = 'es-CO', currency = 'COP') => {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		minimumFractionDigits: 0
	}).format(value);
};

export const formatPercent = (value: number, locale = 'es-CO') => {
	return new Intl.NumberFormat(locale, {
		style: 'percent',
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	}).format(value / 100);
};

export const formatNumber = (value: number, locale = 'es-CO') => {
	return new Intl.NumberFormat(locale).format(value);
};
