interface Env {
  BOOKING_PROCESS_URL: string;
  ADMIN_API_TOKEN: string;
}

interface CronEvent {
  cron: string;
  scheduledTime: number;
}

interface WorkerExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

export default {
  async scheduled(
    _event: CronEvent,
    env: Env,
    ctx: WorkerExecutionContext
  ): Promise<void> {
    ctx.waitUntil(processEmails(env));
  },
};

async function processEmails(env: Env): Promise<void> {
  if (!env.BOOKING_PROCESS_URL || !env.ADMIN_API_TOKEN) {
    throw new Error("Booking email scheduler is not configured.");
  }

  const MAX_JOBS_PER_RUN = 10;
  let processed = 0;

  for (let i = 0; i < MAX_JOBS_PER_RUN; i++) {
    const response = await fetch(env.BOOKING_PROCESS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.ADMIN_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: "{}",
    });

    if (!response.ok) {
      throw new Error(
        `Booking email processor returned HTTP ${response.status}`
      );
    }

    const result: {
      processed?: number;
      status?: string;
      message?: string;
    } = await response.json();

    if (result.processed !== 1) {
      console.log("Booking email queue drained:", result.message);
      break;
    }

    processed++;

    if (result.status === "failed") {
      console.error("Booking email delivery failed; retry scheduled.");
    }
  }

  console.log(`Booking email scheduler processed ${processed} job(s).`);
}