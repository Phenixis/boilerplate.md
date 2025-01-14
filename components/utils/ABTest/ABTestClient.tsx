'use client';

import { Leaves } from './actions'
import { useEffect } from 'react';

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
    // TODO : Maybe change to visiblitychange event, to track when the user leaves the page or not, and calculate the time spent on the page
    // Visiblitychange accepts async functions / beforeunload does not
    useEffect(() => { // Once the window has loaded, we add an event listener to the window object to handle the beforeunload event
        const handleBeforeUnload = (event: any) => { // When the user leaves, we call the Leaves function to calculate the time spent on the page
            event.preventDefault();
            Leaves(startTime)
            event.returnValue = '';
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        };
    }, [startTime])

    return (
        <div>
            {A}
            {B}
        </div>
    )
}