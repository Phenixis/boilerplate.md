"use server";

import { stripe } from "@/lib/payments/stripe";
import Stripe from "stripe";

type ActionState = {
    error?: string;
    success?: string;
    [key: string]: any; // This allows for additional properties
};

export async function addProductAndDefaultPrice(previousState: ActionState, formData: FormData) {
    const { name, description, price, currency } = formData.entries().reduce((acc, [key, value]) => {
        acc[key] = value as string;
        return acc;
    }, {} as Record<string, string>);

    if (!name || !description || !price || !currency) {
        return {
            error: 'Please fill out all fields',
        };
    }

    const productResponse = await addProduct(name, description);

    if (!productResponse.productId) {
        return productResponse;
    }

    const priceResponse = await addPrice(productResponse.productId, parseInt(price), currency, formData.get("interval") as Stripe.PriceCreateParams.Recurring.Interval, parseInt(formData.get("trial_period_days") as string));

    if (priceResponse.error) {
        return priceResponse;
    }

    return {
        success: 'Product and price added successfully',
    };
}

export async function addProduct(name: string, description: string) {
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

export async function addPrice(productId: string, price: number, currency: string, interval?: Stripe.PriceCreateParams.Recurring.Interval, trial_period_days?: number) {

    const priceData = {
        product: productId,
        unit_amount: price,
        currency: currency,
    } as Stripe.PriceCreateParams;

    if (interval) {
        priceData.recurring = {
            interval: interval,
            trial_period_days: trial_period_days,
        };
    }

    try {
        await stripe.prices.create(priceData);

        return {
            success: 'Price added successfully',
        };
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
}