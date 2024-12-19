import { queue1Name } from "../main"
import { processor1 } from "../processors/processor1"
import { redisConnection } from "../utils/connection"
import { Worker } from 'bullmq'

const worker1 = new Worker(queue1Name, processor1, {
    connection: redisConnection,
    concurrency: 10,
    autorun: false,
    lockDuration: 5 * 60 * 1000,
    stalledInterval: 30000,
})

worker1.on('error', (err) => {
    console.error("worker1 there is an error:", err)
})

worker1.on('failed', (job, err) => {
    console.error(`worker1 failed for job ${job?.name} - redis id: ${job?.id}`, err)
})

worker1.on('completed', async (job) => {
    console.debug(`worker1 with normal processor completed with: text=${job.data.text}`)
})

export const start = () => {
    console.info(`Starting ${queue1Name} worker`)
    worker1.run()
}

start()
