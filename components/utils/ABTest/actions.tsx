"use server";

export async function Leaves(userIp: string, idTest: string, startTime: number) {
    const endTime = performance.now()
    const queryTimeMs = (endTime - startTime).toFixed(2);
    console.log(`User ${userIp} is leaving the page with the test ${idTest} after ${queryTimeMs} ms`);
}

export async function stillIn(userIp: string, idTest: string, startTime: number) {
    const endTime = performance.now()
    const queryTimeMs = (endTime - startTime).toFixed(2);
    console.log(`User ${userIp} is still in the page with the test ${idTest} after ${queryTimeMs} ms`);
}