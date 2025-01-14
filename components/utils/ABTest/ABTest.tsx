import { headers } from 'next/headers'
import { performance } from 'perf_hooks'
import ABTestClient from './ABTestClient'

export default async function ABTest({
    A,
    B,
    idTest,
}: {
    A: React.ReactElement;
    B: React.ReactElement;
    idTest: string;
}) {
    const userIp = ((await headers()).get('x-forwarded-for') ?? '127.0.0.1').split(':')[3]
    const startTime = performance.now()

    return (
        <ABTestClient A={A} B={B} idTest={idTest} userIp={userIp} startTime={startTime} />
    )
}