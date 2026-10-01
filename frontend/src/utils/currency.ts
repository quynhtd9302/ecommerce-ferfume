// Fixed USD -> VND display rate. Catalog prices are stored in USD; prices are
// always *displayed* in VND regardless of the site's UI language — this is a
// Vietnamese shop, so the currency doesn't change with the interface language.
export const USD_TO_VND_RATE = 25000;

export const formatPrice = (usdAmount: number): string => {
    const vnd = Math.round(usdAmount * USD_TO_VND_RATE);
    return `${vnd.toLocaleString("vi-VN")} ₫`;
};
