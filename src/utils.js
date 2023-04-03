const convertPeriod = (period) => {
  console.log(period);
  const intervals = { m: "minute", h: "hour", d: "day" };
  try {
    const match = period.match(/^([a-z])(\d+)$/i);
    if (match !== null) {
      const unit = match[1];
      const value = parseInt(match[2]);
      return [intervals[unit], value];
    } else throw new Error("Incorrect input value");
  } catch (error) {
    console.error("❌ convertPeriod", error);
  }
};

module.exports = { convertPeriod };
