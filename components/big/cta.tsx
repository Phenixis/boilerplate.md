import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function CTA() {
    return (
            <a
                href="/sign-up"
            >
                <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-lg p-6 inline-flex items-center justify-center">
                    Call To Action With Urgency
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </a>
    );
}