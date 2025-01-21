import { CreditCard, Database, User, FlaskConical, MessagesSquare, Moon, Sun, CalendarPlus2 } from 'lucide-react';
import CTA from '@/components/big/cta';
import SocialProof from '@/components/big/socialProof';
import Image from 'next/image';

type Feature = {
    title: string,
    description: string | string[],
    icon: any,
    colSpan?: number,
    rowSpan?: number
}


export default function HomePage() {
    const features: Feature[] = [
        { title: "Credentials & OAuth", description: ["2 credentials flows :", "The first one has 2 static pages : Sign In / Sign Up.", "The second one has 1 dynamic page : Login.", "And obviously, social login."], icon: User, rowSpan: 2 },
        { title: "A/B Testing", description: "Maximize your conversion by A/B testing, and displaying the most effective component.", icon: FlaskConical, colSpan: 2 },
        { title: "Payments & Subscriptions", description: "One-time payment, subscriptions and discount using Stripe.", icon: CreditCard },
        { title: "Daily Update", description: "The boilerplate gets new features and fewer bugs daily.", icon: CalendarPlus2 },
        { title: "Collect Feedback", description: "Collect feedback with the small button on the bottom right corner of this page.", icon: MessagesSquare, colSpan: 2 },
        { title: "Postgres Database", description: "Store your data using Drizzle with any PostgreSQL.", icon: Database },
    ]

    return (
        <main>
            {/* <ABTest A={<h1>Test A</h1>} B={<h1>Test B</h1>} testName="homepage_heading" description="A test to determine which headline make the user stay longer on the page" location="/" /> */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <div className="sm:text-center md:max-w-2xl md:mx-auto">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 tracking-tight sm:text-5xl md:text-6xl">
                                Forget the fluff,
                                <strong className="block text-brand-primary">Focus on your genius</strong>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                Start your brilliant idea with all the fluff already done and build your next startup in days.
                            </p>
                            <div className="mt-8 space-y-2 sm:max-w-lg sm:mx-auto sm:text-center">
                                <CTA />
                                <SocialProof />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white dark:bg-black w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-4">
                        {
                            features.map((feature, index) => (
                                <div key={index} className={`relative group/Feature ${feature.colSpan ? 'col-span-' + feature.colSpan : 'col-span-1'} ${feature.rowSpan ? 'row-span-' + feature.rowSpan : 'row-span-1'}`}>
                                    <div className="h-full w-full flex flex-col justify-between items-start bg-gray-50 dark:bg-gray-900 p-4 rounded-md ">
                                        <div className="flex items-center justify-center h-12 px-2 w-fit rounded-md bg-brand-primary text-white">
                                            <feature.icon className="size-6 mr-2 group-hover/Feature:size-8 duration-100" />
                                            <h3 className="text-lg font-medium group-hover/Feature:text-xl duration-100">{feature.title}</h3>
                                        </div>
                                        <p className="mt-2 text-base text-gray-500">
                                            {Array.isArray(feature.description) ?
                                                (
                                                    feature.description.map((desc, index) => (
                                                        <span className="inline-block mt-1" key={index}>
                                                            {desc}
                                                            <br />
                                                        </span>
                                                    ))
                                                )
                                                : feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 sm:text-4xl">
                                Ready to [action] ?
                            </h2>
                            <p className="mt-3 max-w-3xl text-lg text-gray-700 dark:text-gray-300">
                                Use a sense of urgency and limited availability to encourage the user to take action now.
                            </p>
                        </div>
                        <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
                            <CTA />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
