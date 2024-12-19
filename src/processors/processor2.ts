import { SandboxedJob } from 'bullmq';
import { JobType } from "../types/main";

export default async (job: SandboxedJob<JobType>) => {
    console.log("I work!")
    return job.data
}