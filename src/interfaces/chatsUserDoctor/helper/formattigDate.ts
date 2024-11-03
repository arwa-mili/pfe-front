export function formatChatDate(dateString: string): string {
  const messageDate = new Date(dateString);
  const today = new Date();

  if (isSameDay(messageDate, today)) {
    return `${padZero(messageDate.getHours())}:${padZero(
      messageDate.getMinutes()
    )}:${padZero(messageDate.getSeconds())}`;
  } else {
    const month = messageDate.toLocaleString('default', { month: 'short' });
    const day = messageDate.getDate();
    return `${month} ${day}`;
  }
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
