import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { StripeProductWithPrices } from '@/lib/payments/stripe';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ToggleProduct from './toggleProduct';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function Product({
    product
}: {
    product?: StripeProductWithPrices;
}) {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                {
                    product ? (
                        <CardTitle className="flex justify-between items-center">
                            {product.name}
                            <ToggleProduct productId={product.id} initialStatus={product.active} />
                        </CardTitle>
                    ) : (
                        <CardTitle className="flex justify-between items-center">
                            <Skeleton className="h-8 w-32" />
                            <Badge variant="outline" className="animate-pulse">
                                Loading...
                            </Badge>
                        </CardTitle>
                    )
                }
            </CardHeader>
            <CardContent>
                {
                    product ? (
                        <p>{product.description}</p>
                    ) : (
                        <>
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-1/2" />
                        </>
                    )
                }
                <Table>
                    <TableHeader>
                        <TableRow className={`${product ? "" : "animate-pulse"}`}>
                            <TableHead>Price</TableHead>
                            <TableHead>Interval</TableHead>
                            <TableHead>Trial Period</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            product ? product.prices.map(price => (
                                <TableRow key={price.id}>
                                    <TableCell>
                                        {
                                            price.unitAmount ? `${(price.unitAmount / 100).toFixed(2)} ${price.currency}` : "Free"
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {price.interval}
                                    </TableCell>
                                    <TableCell>
                                        {price.trialPeriodDays} days
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Skeleton className="h-4" />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <Button variant="outline"  className={`${product ? "" : "animate-pulse"}`}>Add Price</Button>
            </CardFooter>
        </Card >
    )
}