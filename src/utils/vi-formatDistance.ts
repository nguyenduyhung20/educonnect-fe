export const viFormatDistance = (distanceDay: string) : string => {
  if (distanceDay == 'less than a minute') {
    return 'vừa xong';
  }
  const words: string[] = distanceDay.split(/\s+/);
  const numberItem: string = words.find(
    (item) => item.length == 1 || item.length == 2
  );
  let result = '';
  const finalWord: string = words[words.length - 1];
  if (finalWord == 'minutes' || finalWord == 'minutes') {
    result = numberItem + ' phút trước';
  } else if (finalWord == 'hour' || finalWord == 'hours') {
    result = numberItem + ' giờ trước';
  } else if (finalWord == 'day' || finalWord == 'days') {
    result = numberItem + ' ngày trước';
  } else if (finalWord == 'month' || finalWord == 'months') {
    result = numberItem + ' tháng trước';
  } else if (finalWord == 'year' || finalWord == 'years') {
    result = numberItem + ' năm trước';
  }

  return result;
};
