export const maskUserId = (userId: string) => {
  if (!userId) return "Flipkart Customer";
  return `User ${userId.slice(0, 4)}****`;
};