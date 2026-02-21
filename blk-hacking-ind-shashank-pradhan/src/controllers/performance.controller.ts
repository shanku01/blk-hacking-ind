import { Request, Response } from "express";
import os from "os";

export function performanceHandler(
  _req: Request,
  res: Response
) {
  const start = process.hrtime.bigint();

  const memoryUsage = process.memoryUsage();
  const threads = os.cpus().length;

  const end = process.hrtime.bigint();
  const durationMs = Number(end - start) / 1_000_000;

  const memoryMB = (
    memoryUsage.heapUsed /
    1024 /
    1024
  ).toFixed(2);

  res.json({
    time: `${durationMs.toFixed(3)} ms`,
    memory: `${memoryMB} MB`,
    threads,
  });
}