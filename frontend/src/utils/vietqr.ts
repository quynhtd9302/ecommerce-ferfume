import { BANK_INFO } from "../constants/shopInfo";

// Builds an image URL for the official VietQR image API (img.vietqr.io),
// which renders a standard EMVCo/VietQR transfer code that any Vietnamese
// banking app can scan. No API key required, no transaction is processed —
// the amount/content are just encoded into the QR image for the payer to confirm.
export const buildVietQrUrl = (amount: number, addInfo: string): string => {
    const { bankBin, accountNumber, accountHolder } = BANK_INFO;
    const params = new URLSearchParams({
        amount: String(Math.round(amount)),
        addInfo,
        accountName: accountHolder
    });

    return `https://img.vietqr.io/image/${bankBin}-${accountNumber}-qr_only.png?${params.toString()}`;
};
