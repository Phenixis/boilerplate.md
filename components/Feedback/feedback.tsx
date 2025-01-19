import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { getUser } from "@/lib/db/queries"

export default async function Feedback() {
    const user = (await getUser());

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="fixed bottom-0 right-0 rounded-none rounded-tl-md">
                    Bugs + Suggestion
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription>
                        Please let us know how we can improve our website.
                    </DialogDescription>
                </DialogHeader>
                <input className="hidden" name="userId" id="userId" value={user?.id} />
                <div>
                    <Label>Feedback</Label>
                    <Input type="text" />
                </div>
                <Button type="submit">
                    Send
                </Button>
            </DialogContent>
        </Dialog>
    )
}