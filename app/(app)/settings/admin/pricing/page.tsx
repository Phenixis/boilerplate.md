import Products from './products';

export default function PricingPage() {
    return (
        <section className="flex-1 p-4 lg:p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-lg lg:text-2xl font-medium text-gray-900 dark:text-gray-100 mb-6">
                    Pricing
                </h1>
            </div>
            <Products />
        </section>
    )
}