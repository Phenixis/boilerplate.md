'use client';

import { stillIn } from './actions'
import { useEffect, useState } from 'react';

export default function ABTestClient({
    A,
    B,
    idTest,
    userIp,
    startTime,
}: {
    A: React.ReactElement;
    B: React.ReactElement;
    idTest: string;
    userIp: string;
    startTime: number;
}) {
    const [variant, setVariant] = useState('A');

    useEffect(() => {
        setVariant(Math.random() < 0.5 ? 'A' : 'B');

        setInterval(() => {
            if (document.visibilityState === 'visible') {
                stillIn(userIp, idTest, startTime);
            }
        }, 1000);
    }, []);

    return (
        <>
            {variant === 'A' ? A : B}
        </>
    )
}