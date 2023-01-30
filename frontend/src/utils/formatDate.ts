export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "longGeneric",
    timeZone: "Europe/Madrid",
  });
}
