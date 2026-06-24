export const getScoreColor = (score: number) => {
  if (score < 50) return "bg-destructive";
  if (score < 80) return "bg-secondary";
  return "bg-success";
};
