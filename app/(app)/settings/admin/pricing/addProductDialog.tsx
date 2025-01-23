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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useValues } from '@/lib/auth';
import { Label } from '@radix-ui/react-label';
import { addProduct } from './actions';
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
            // const result = await addProduct(state, formData);

            setIsOpen(false);

            // return result;
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <form action={addProductAction} className="gap-4 flex flex-col">
                    <Label>
                        Product Name
                        <Input name="name" type="text" required />
                    </Label>
                    <Label>
                        Description
                        <Textarea name="description" />
                    </Label>
                    <Button type="submit">
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