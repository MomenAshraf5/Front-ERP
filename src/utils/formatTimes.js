// Format duration from seconds to readable format
const formatDuration = (totalSeconds) => {
  if (!totalSeconds) return "No recorded activity today";
  if (totalSeconds < 60) {
    return `${totalSeconds} sec`;
  }
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours} h : ${minutes} min : ${seconds} sec`;
  }
  return `${minutes} min : ${seconds} sec`;
};

export default formatDuration;
