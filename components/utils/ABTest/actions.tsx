"use server";

export async function Leaves(startTime: number) {
    const endTime = performance.now()
    const queryTimeMs = (endTime - startTime).toFixed(2);
    console.log(`User is leaving the page after ${queryTimeMs} ms`);
}