import { StripeProductWithPrices } from "@/lib/payments/stripe"
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import Product from "./product";
import { Button } from '@/components/ui/button';

export default function ProductsDisplay({
    products
} : {
    products?: StripeProductWithPrices[];
}) {
    return (
        (
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Products
                        <Button>Ajouter un produit</Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-8">
                    {
                        products ?
                        products.map(product => (
                            <Product key={product.id} product={product} />
                        )) : 
                        <p>No products found</p>
                    }
                </CardContent>
            </Card>
        )
    )
}