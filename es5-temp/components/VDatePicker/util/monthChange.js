import pad from './pad';
/**
 * @param {String} value YYYY-MM format
 * @param {Number} sign -1 or +1
 */
export default (value, sign) => {
    const [year, month] = value.split('-').map(v => 1 * v);
    if (month + sign === 0) {
        return `${year - 1}-12`;
    }
    else if (month + sign === 13) {
        return `${year + 1}-01`;
    }
    else {
        return `${year}-${pad(month + sign)}`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGhDaGFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WRGF0ZVBpY2tlci91dGlsL21vbnRoQ2hhbmdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQTtBQUV2Qjs7O0dBR0c7QUFDSCxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzdCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFFdEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUN0QixPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFBO0tBQ3hCO1NBQU0sSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsRUFBRTtRQUM5QixPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFBO0tBQ3hCO1NBQU07UUFDTCxPQUFPLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQTtLQUN0QztBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYWQgZnJvbSAnLi9wYWQnXG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFlZWVktTU0gZm9ybWF0XG4gKiBAcGFyYW0ge051bWJlcn0gc2lnbiAtMSBvciArMVxuICovXG5leHBvcnQgZGVmYXVsdCAodmFsdWUsIHNpZ24pID0+IHtcbiAgY29uc3QgW3llYXIsIG1vbnRoXSA9IHZhbHVlLnNwbGl0KCctJykubWFwKHYgPT4gMSAqIHYpXG5cbiAgaWYgKG1vbnRoICsgc2lnbiA9PT0gMCkge1xuICAgIHJldHVybiBgJHt5ZWFyIC0gMX0tMTJgXG4gIH0gZWxzZSBpZiAobW9udGggKyBzaWduID09PSAxMykge1xuICAgIHJldHVybiBgJHt5ZWFyICsgMX0tMDFgXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGAke3llYXJ9LSR7cGFkKG1vbnRoICsgc2lnbil9YFxuICB9XG59XG4iXX0=