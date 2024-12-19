import path from "path"
import { redisConnection } from "../utils/connection"
import { Worker } from 'bullmq'
import { queue2Name } from "../main"

const worker2 = new Worker(queue2Name, path.join(__dirname, "../processors/processor2.ts"), {
    connection: redisConnection,
    concurrency: 10,
    autorun: false,
    lockDuration: 5 * 60 * 1000,
    stalledInterval: 30000,
    useWorkerThreads: true,
})

worker2.on('error', (err: any) => {
    console.error("worker2 there is an error:", err)
})

worker2.on('failed', (job, err: any) => {
    console.error(`worker2 failed for job ${job?.name} - redis id: ${job?.id}`, err)
})

worker2.on('completed', async (job: { data: { text: any } }) => {
    console.debug(`worker2 with sandboxed processor completed with: text=${job.data.text}`)
})

export const start = () => {
    console.info(`Starting ${queue2Name} worker`)
    worker2.run()
}

start()
