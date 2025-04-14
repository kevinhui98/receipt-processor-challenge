const { z } = require('zod');

const ItemSchema = z.object({
    shortDescription: z.string().regex(/^[\w\s\-]+$/),
    price: z.string().regex(/^\d+\.\d{2}$/)
});

const ReceiptSchema = z.object({
    retailer: z.string().regex(/^[\w\s\-\&]+$/),
    purchaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    purchaseTime: z.string().regex(/^\d{2}:\d{2}$/),
    items: z.array(ItemSchema).min(1),
    total: z.string().regex(/^\d+\.\d{2}$/)
});

module.exports = {
    validateReceipt: (data) => {
        const result = ReceiptSchema.safeParse(data);
        return result.success ? { valid: true } : { valid: false, issues: result.error.issues };
    }
};
