"use client";

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useValues } from '@/lib/auth';
import { Label } from '@/components/ui/label';
import { addProductAndDefaultPrice } from './actions';
import { ActionState } from "@/lib/auth/middleware";
import { useActionState, useState, useEffect } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

export default function AddProductDialog() {
    const user = useValues().user;
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    const [addProductState, addProductAction, isAddProductPending] = useActionState<ActionState, FormData>(
        async (state, formData) => {
            const result = await addProductAndDefaultPrice(state, formData);

            setIsOpen(false);

            return result;
        },
        { error: '', success: '' }
    );

    useEffect(() => {
        if (addProductState.error) {
            toast({
                title: `Error`,
                description: addProductState.error,
            });
        } else if (addProductState.success) {
            toast({
                title: "Success",
                description: addProductState.success,
            });
        }
    }, [addProductState]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground shadow hover:bg-primary/80 dark:hover:bg-primary/80">
                Add Product
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <form action={addProductAction} className="gap-4 flex flex-col">
                    <div className="flex flex-col-reverse gap-1">
                        <Input className="peer" name="name" type="text" required />
                        <Label>
                            Product Name
                        </Label>
                    </div>
                    <div className="flex flex-col-reverse gap-1">
                        <Textarea className="peer" name="name" />
                        <Label>
                            Description
                        </Label>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <h4 className="text-sm font-medium">Default Price</h4>
                        <div className="flex items-end gap-2 w-full">
                            <div className="flex flex-col-reverse gap-1">
                                <Select defaultValue='usd' required>
                                    <SelectTrigger className="max-w-full">
                                        <SelectValue placeholder="currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="eur">€</SelectItem>
                                        <SelectItem value="usd">$</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Label>
                                    Currency<span className="text-red-700">*</span>
                                </Label>
                            </div>
                            <div className="flex flex-col-reverse gap-1 w-full">
                                <Input className="peer" type="number" name="price" required />
                                <Label>
                                    Price
                                </Label>
                            </div>
                            <div className="flex flex-col-reverse gap-1">
                                <Select defaultValue='one-time'>
                                    <SelectTrigger className="max-w-full">
                                        <SelectValue placeholder="interval"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="one-time">One-time</SelectItem>
                                        <SelectItem value="day">Day</SelectItem>
                                        <SelectItem value="week">Week</SelectItem>
                                        <SelectItem value="month">Month</SelectItem>
                                        <SelectItem value="year">Year</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Label>
                                    Interval
                                </Label>
                            </div>
                            <div className="flex flex-col-reverse gap-1">
                                <Input className="peer" type="number" name="trial_period_days" />
                                <Label>
                                    Days of trial
                                </Label>
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className={`${isAddProductPending ? 'bg-primary/80 dark:bg-primary/80' : ""}`}>
                        {
                            isAddProductPending ?
                                <Loader2 className="animate-spin w-5 h-5 mr-2" /> :
                                <Plus className="w-5 h-5 mr-2" />
                        }
                        Add Product
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}