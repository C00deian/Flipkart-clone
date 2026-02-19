export const scrollToProducts = () => {
  const el = document.getElementById("products-section");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
};
