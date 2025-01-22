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
import {
    Badge
} from "@/components/ui/badge"

export default function Product({
    product
}: {
    product: StripeProductWithPrices;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <h2>
                        {product.name}
                    </h2>
                    {product.active ? (<Badge variant="outline">Active</Badge>) : (<Badge variant="outline">Inactive</Badge>)}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{product.description}</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Price</TableHead>
                            <TableHead>Interval</TableHead>
                            <TableHead>Trial Period</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            product.prices.map(price => (
                                <TableRow key={price.id}>
                                    <TableCell>
                                        {
                                            price.unitAmount ? `${(price.unitAmount / 100).toFixed(2)}€` : "Free"
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {price.interval}
                                    </TableCell>
                                    <TableCell>
                                        {price.trialPeriodDays}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <Button>Add Price</Button>
            </CardFooter>
        </Card>
    )
}