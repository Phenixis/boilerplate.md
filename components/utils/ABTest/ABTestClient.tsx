'use client';

import { stillIn } from './actions'
import { useEffect, useState } from 'react';

export default function ABTestClient({
    id,
    A,
    B,
    testName,
    userIp,
    startTime,
}: {
    id: number,
    A: React.ReactElement;
    B: React.ReactElement;
    testName: string;
    userIp: string;
    startTime: number;
}) {
    const [variant, setVariant] = useState('A');

    useEffect(() => {
        setVariant(Math.random() < 0.5 ? 'A' : 'B');

        setInterval(() => {
            if (document.visibilityState === 'visible') {
                stillIn(id, variant);
            }
        }, 1000);
    }, []);

    return (
        <>
            {variant === 'A' ? A : B}
        </>
    )
}