import { Job } from "bullmq";
import { JobType } from "../types/main";

export const processor1 = async (job: Job<JobType>) => {
    console.log("yahooo eu merg caci sunt un procesor normal si asta mi jobul:", job)
}