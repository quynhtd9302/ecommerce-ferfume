// Fixed USD -> VND display rate. Catalog prices are stored in USD; when the
// site language is Vietnamese we only convert how the price is *displayed*.
export const USD_TO_VND_RATE = 25000;

export const formatPrice = (usdAmount: number, language: string): string => {
    if (language === "vi") {
        const vnd = Math.round(usdAmount * USD_TO_VND_RATE);
        return `${vnd.toLocaleString("vi-VN")} ₫`;
    }
    return `$${usdAmount.toFixed(2)}`;
};
