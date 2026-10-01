import { formatPrice } from "../utils/currency";

// Kept as a hook (rather than exporting formatPrice directly) so call sites
// don't need to change if price formatting ever needs component-level state
// again (e.g. a live exchange rate).
export const usePrice = (): ((usdAmount: number) => string) => {
    return formatPrice;
};
