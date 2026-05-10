import type { ResumeResponseFeedbackType } from "../types/resume";

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const base = 1024;

  const unitIndex = Math.floor(Math.log(bytes) / Math.log(base));
  const size = bytes / Math.pow(base, unitIndex);

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

export const cleanJson = (raw: string): ResumeResponseFeedbackType => {
  const cleanedRaw = raw
    .replace(/```json\s*/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedRaw);
};

export const getRelativeDate = (dateInput: string | number): string => {
  const timestamp = new Date(dateInput).getTime();

  const now = Date.now();
  const diff = now - timestamp;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days <= 30) {
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";

    return `${days} days ago`;
  }

  return new Date(timestamp).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
