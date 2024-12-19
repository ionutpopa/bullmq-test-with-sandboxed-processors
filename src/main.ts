import { Queue } from "bullmq"
import { redisConnection } from "./utils/connection"
import { JobType } from "./types/main"

const queueSettings = {
    priority: 1,
    attempts: 5,
    backoff: {
        type: 'exponential',
        delay: 1000,
    },
}

export const queue1Name = 'queue1'
export const queue2Name = 'queue2'

const main = async () => {
    const queue1 = new Queue<JobType>(queue1Name, {
        connection: redisConnection
    })

    const queue2 = new Queue<JobType>(queue2Name, {
        connection: redisConnection
    })

    console.log("Setting up both queues and adding 10 jobs for each queue")
    // Add 10 jobs in queue 1
    for (let i = 0; i < 10; i++) {
        await queue1.add(`normal-job-${i}`, { text: `normal-job-${i}` }, queueSettings)
    }
    // Add 10 jobs in queue 2
    for (let i = 0; i < 10; i++) {
        await queue2.add(`sandboxed-job-${i}`, { text: `special-job-${i}` }, queueSettings)
    }

    await queue1.close()
    await queue2.close()
}

main()