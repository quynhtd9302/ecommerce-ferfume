import { useTranslation } from "react-i18next";

import { formatPrice } from "../utils/currency";

export const usePrice = (): ((usdAmount: number) => string) => {
    const { i18n } = useTranslation();
    return (usdAmount: number) => formatPrice(usdAmount, i18n.language);
};
