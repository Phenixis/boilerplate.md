"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useValues } from "@/lib/auth"
import { sendFeedback } from "./actions";
import { useEffect, useActionState, useState } from "react";
import { ActionState } from "@/lib/auth/middleware";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "../ui/textarea";

export default function Feedback() {
    const user = useValues().user;
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("🐞Bugs + ❓Suggestion");
    const [feedbackState, feedbackAction, isFeedbackPending] = useActionState<ActionState, FormData>(
        async (state, formData) => {
            const result = await sendFeedback(state, formData);

            setIsOpen(false);

            return result;
        }
        , { error: '', success: '' });
    const { toast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            setTitle("🐞 + ❓")
        }, 3000);

        return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
        if (feedbackState.error) {
            toast({
                title: `Error`,
                description: feedbackState.error,
            });
        } else if (feedbackState.success) {
            toast({
                title: "Success",
                description: feedbackState.success,
            });
        }
    }, [feedbackState]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 fixed bottom-0 right-0 rounded-none rounded-tl-md duration-300">
                {title}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send feedback</DialogTitle>
                    <DialogDescription>
                        Please let me know how I can improve this app. You can also contact me on <a href="https://twitter.com/maxime_duhamel_" target="_blank" className="underline hover:text-gray-900">𝕏</a>.
                    </DialogDescription>
                </DialogHeader>
                <form action={feedbackAction} className="gap-4 flex flex-col">
                    {
                        user ?
                            <input className="hidden" name="userId" id="userId" value={user?.id} readOnly />
                            : <div>
                                <Label>Email</Label>
                                <Input type="email" name="userEmail" id="userEmail" required />
                            </div>
                    }
                    <div>
                        <Label>Title</Label>
                        <Input type="text" name="title" id="title" required />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Textarea name="description" id="description" required />
                    </div>
                    <div className="flex justify-end gap-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">
                            {
                                isFeedbackPending
                                    ? <Loader2 className="w-6 h-6 animate-spin" />
                                    : "Send"
                            }
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}