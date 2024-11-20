export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    month: "long",
    day: "numeric",
    weekday: "long",
    locale: "ko-KR",
  };
  return date.toLocaleDateString("ko-KR", options);
};
