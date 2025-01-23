"use server";

import { stripe } from "@/lib/payments/stripe";

type ActionState = {
    error?: string;
    success?: string;
    [key: string]: any; // This allows for additional properties
};

export async function addProduct(previousState: ActionState, formData: FormData) {
    const { name, description } = Object.fromEntries(formData.entries());

    try {
        const product = await stripe.products.create({
            name: name as string,
            description: description as string,
            active: true,
        });

        return {
            success: 'Product added successfully',
            productId: product.id,
        };
    } catch (error: any) {
        return {
            error: error.message,
        };
    }

}