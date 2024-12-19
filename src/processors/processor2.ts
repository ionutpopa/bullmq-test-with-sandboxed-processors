import { SandboxedJob } from 'bullmq';
import { JobType } from "../types/main";

export default async (job: SandboxedJob<JobType>) => {
    console.log("yahooo eu merg caci sunt un procesor sanboxed si asta mi jobul:", )
    return job.data
}