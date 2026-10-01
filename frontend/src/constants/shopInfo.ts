// Store contact details shown in the footer and on the Contacts page.
// Configure them in frontend/.env (REACT_APP_* variables are embedded at build time).
export const SHOP_NAME = process.env.REACT_APP_SHOP_NAME || "Perfume";
export const SHOP_PHONE = process.env.REACT_APP_SHOP_PHONE || "";
export const SHOP_EMAIL = process.env.REACT_APP_SHOP_EMAIL || "";

export const SOCIAL_LINKS = {
    facebook: process.env.REACT_APP_FACEBOOK_URL || "",
    instagram: process.env.REACT_APP_INSTAGRAM_URL || "",
    twitter: process.env.REACT_APP_TWITTER_URL || ""
};

// VietQR bank BIN codes (NAPAS), keyed by the exact bank name string used in
// REACT_APP_BANK_NAME. Used to generate a scannable VietQR transfer code.
// https://api.vietqr.io/v2/banks
const VIETQR_BANK_BIN: Record<string, string> = {
    Vietcombank: "970436",
    VietinBank: "970415",
    BIDV: "970418",
    Agribank: "970405",
    Techcombank: "970407",
    MBBank: "970422",
    ACB: "970416",
    VPBank: "970432",
    TPBank: "970423",
    Sacombank: "970403",
    HDBank: "970437",
    SHB: "970443",
    VIB: "970441",
    MSB: "970426",
    OCB: "970448"
};

// Bank account shown on the order confirmation page when the customer chooses
// bank transfer as their payment method.
export const BANK_INFO = {
    bankName: process.env.REACT_APP_BANK_NAME || "MSB",
    accountNumber: process.env.REACT_APP_BANK_ACCOUNT_NUMBER || "0984368800",
    accountHolder: process.env.REACT_APP_BANK_ACCOUNT_HOLDER || SHOP_NAME.toUpperCase(),
    bankBin: process.env.REACT_APP_BANK_BIN || VIETQR_BANK_BIN[process.env.REACT_APP_BANK_NAME || "MSB"] || ""
};
