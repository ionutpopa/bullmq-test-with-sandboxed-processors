import { Job } from "bullmq";
import { JobType } from "../types/main";

export const processor1 = async (job: Job<JobType>) => {
    console.log("I work!", job)
}