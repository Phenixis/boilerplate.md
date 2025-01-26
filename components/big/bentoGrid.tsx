export type Feature = {
    title: string,
    description: string | string[],
    icon: any,
    colSpan?: number,
    rowSpan?: number
}

function FeatureDisplay({
    feature
}: {
    feature: Feature
}) {
    return (
        <div className={`relative group/Feature ${feature.colSpan ? 'col-span-' + feature.colSpan : 'col-span-1'} ${feature.rowSpan ? 'row-span-' + feature.rowSpan : 'row-span-1'}`}>
            <div className="h-full w-full flex flex-col justify-between items-start bg-gray-50 dark:bg-gray-900 p-4 rounded-md ">
                <div className="flex items-center justify-center h-12 px-2 w-fit text-primary">
                    <feature.icon className="size-6 mr-2 group-hover/Feature:size-8 duration-100" />
                    <h3 className="text-xl font-bold group-hover/Feature:text-2xl duration-100">{feature.title}</h3>
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
    )
}

export default function BentoGrid({
    features
}: {
    features: Feature[]
}) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
            {
                features.map((feature, index) => (
                    <FeatureDisplay key={index} feature={feature} />
                ))
            }
        </div>
    )
}