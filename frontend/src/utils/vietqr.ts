import { BANK_INFO } from "../constants/shopInfo";
import { USD_TO_VND_RATE } from "./currency";

// Builds an image URL for the official VietQR image API (img.vietqr.io),
// which renders a standard EMVCo/VietQR transfer code that any Vietnamese
// banking app can scan. No API key required, no transaction is processed —
// the amount/content are just encoded into the QR image for the payer to confirm.
//
// Takes the catalog price in USD (how totalPrice is stored) and converts it
// to VND internally — VietQR amounts are always VND, so the caller should
// never need to remember to convert before calling this.
export const buildVietQrUrl = (usdAmount: number, addInfo: string): string => {
    const { bankBin, accountNumber, accountHolder } = BANK_INFO;
    const vndAmount = Math.round(usdAmount * USD_TO_VND_RATE);
    const params = new URLSearchParams({
        amount: String(vndAmount),
        addInfo,
        accountName: accountHolder
    });

    return `https://img.vietqr.io/image/${bankBin}-${accountNumber}-qr_only.png?${params.toString()}`;
};
