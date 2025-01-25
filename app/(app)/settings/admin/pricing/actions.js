"use server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
});

export async function addProductAndDefaultPrice(previousState, formData) {
    const { name, price, currency } = Array.from(formData.entries()).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});   

    if (!name || !price || !currency) {
        return {
            error: 'Please fill out all fields',
        };
    }

    const productResponse = await addProduct(name, (formData.get("description") != "" ? formData.get("description") : undefined));

    if (!productResponse.productId) {
        return productResponse;
    }

    const interval = formData.get("interval");
    const trial_period_days = parseInt(formData.get("trial_period_days"));

    const priceResponse = await addPrice(productResponse.productId, parseInt(price) * 100, currency, (interval && interval !== "one-time" ? interval : undefined), (trial_period_days && !isNaN(trial_period_days) ? trial_period_days : undefined));

    if (priceResponse.error) {
        return priceResponse;
    }

    return {
        success: 'Product and price added successfully',
    };
}

export async function addProduct(name, description) {
    try {
        const product = await stripe.products.create({
            name: name,
            description: description,
            active: true,
        });

        return {
            success: 'Product added successfully',
            productId: product.id,
        };
    } catch (error) {
        return {
            error: error.message,
        };
    }
}

export async function addPrice(productId, price, currency, interval, trial_period_days) {

    const priceData = {
        product: productId,
        unit_amount: price,
        currency: currency,
    };

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
    } catch (error) {
        return {
            error: error.message,
        };
    }
}

export async function toggleProductStatus(productId, actualState) {
    try {
        await stripe.products.update(productId, {
            active: !actualState,
        });

        return {
            success: 'Product status updated successfully',
        };
    } catch (error) {
        return {
            error: error.message,
        };
    }
}