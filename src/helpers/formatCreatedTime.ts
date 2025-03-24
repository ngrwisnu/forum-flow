export const formatCreatedTime = (time: string) => {
  const now = new Date().getTime();
  const createdAt = new Date(time).getTime();
  const timeGap = Math.floor((now - createdAt) / 1000);

  const units = [
    { name: "year", seconds: 365 * 24 * 60 * 60 },
    { name: "month", seconds: 30 * 24 * 60 * 60 },
    { name: "day", seconds: 24 * 60 * 60 },
    { name: "hour", seconds: 60 * 60 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const count = Math.floor(timeGap / unit.seconds);

    if (count >= 1) {
      return count === 1 ? `a ${unit.name} ago` : `${count} ${unit.name}s ago`;
    }
  }

  return "just now";
};
