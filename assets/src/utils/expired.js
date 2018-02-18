const plusMinutes = (old, minutes) => new Date(old.getTime() + minutes * 60000);
const expired = (date, minutes = 10) => (date === null || plusMinutes(date, minutes) < new Date());

export default expired;