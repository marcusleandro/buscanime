export const getScoreColor = (score: number) => {
  if (score < 50) return "bg-red-500";
  if (score <= 80) return "bg-yellow-500";

  return "bg-green-500";
};
