const PARSE_REGEX = /^(\d{1,4})-(\d{1,2})(-(\d{1,2}))?([^\d]+(\d{1,2}))?(:(\d{1,2}))?(:(\d{1,2}))?$/;
const DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_MONTH_LEAP = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_MONTH_MIN = 28;
const MONTH_MAX = 12;
const MONTH_MIN = 1;
const DAY_MIN = 1;
const DAYS_IN_WEEK = 7;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const FIRST_HOUR = 0;
export function validateTimestamp(input) {
    return !!PARSE_REGEX.exec(input);
}
export function parseTimestamp(input, now) {
    // YYYY-MM-DD hh:mm:ss
    const parts = PARSE_REGEX.exec(input);
    if (!parts)
        return null;
    const timestamp = {
        date: input,
        time: '',
        year: parseInt(parts[1]),
        month: parseInt(parts[2]),
        day: parseInt(parts[4]) || 1,
        hour: parseInt(parts[6]) || 0,
        minute: parseInt(parts[8]) || 0,
        weekday: 0,
        hasDay: !!parts[4],
        hasTime: !!(parts[6] && parts[8]),
        past: false,
        present: false,
        future: false
    };
    updateWeekday(timestamp);
    updateFormatted(timestamp);
    if (now) {
        updateRelative(timestamp, now, timestamp.hasTime);
    }
    return timestamp;
}
export function getDayIdentifier(timestamp) {
    return timestamp.year * 1000000 + timestamp.month * 100 + timestamp.day;
}
export function getTimeIdentifier(timestamp) {
    return timestamp.hour * 100 + timestamp.minute;
}
export function updateRelative(timestamp, now, time = false) {
    let a = getDayIdentifier(now);
    let b = getDayIdentifier(timestamp);
    let present = a === b;
    if (timestamp.hasTime && time && present) {
        a = getTimeIdentifier(now);
        b = getTimeIdentifier(timestamp);
        present = a === b;
    }
    timestamp.past = b < a;
    timestamp.present = present;
    timestamp.future = b > a;
    return timestamp;
}
export function updateMinutes(timestamp, minutes, now) {
    timestamp.hasTime = true;
    timestamp.hour = Math.floor(minutes / MINUTES_IN_HOUR);
    timestamp.minute = minutes % MINUTES_IN_HOUR;
    timestamp.time = getTime(timestamp);
    if (now) {
        updateRelative(timestamp, now, true);
    }
    return timestamp;
}
export function updateWeekday(timestamp) {
    timestamp.weekday = getWeekday(timestamp);
    return timestamp;
}
export function updateFormatted(timestamp) {
    timestamp.time = getTime(timestamp);
    timestamp.date = getDate(timestamp);
    return timestamp;
}
export function getWeekday(timestamp) {
    if (timestamp.hasDay) {
        const _ = Math.floor;
        const k = timestamp.day;
        const m = ((timestamp.month + 9) % MONTH_MAX) + 1;
        const C = _(timestamp.year / 100);
        const Y = (timestamp.year % 100) - (timestamp.month <= 2 ? 1 : 0);
        return (k + _(2.6 * m - 0.2) - 2 * C + Y + _(Y / 4) + _(C / 4)) % 7;
    }
    return timestamp.weekday;
}
export function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}
export function daysInMonth(year, month) {
    return isLeapYear(year) ? DAYS_IN_MONTH_LEAP[month] : DAYS_IN_MONTH[month];
}
export function copyTimestamp(timestamp) {
    const { date, time, year, month, day, weekday, hour, minute, hasDay, hasTime, past, present, future } = timestamp;
    return { date, time, year, month, day, weekday, hour, minute, hasDay, hasTime, past, present, future };
}
export function padNumber(x, length) {
    let padded = String(x);
    while (padded.length < length) {
        padded = '0' + padded;
    }
    return padded;
}
export function getDate(timestamp) {
    let str = `${padNumber(timestamp.year, 4)}-${padNumber(timestamp.month, 2)}`;
    if (timestamp.hasDay)
        str += `-${padNumber(timestamp.day, 2)}`;
    return str;
}
export function getTime(timestamp) {
    if (!timestamp.hasTime) {
        return '';
    }
    return `${padNumber(timestamp.hour, 2)}:${padNumber(timestamp.minute, 2)}`;
}
export function nextMinutes(timestamp, minutes) {
    timestamp.minute += minutes;
    while (timestamp.minute > MINUTES_IN_HOUR) {
        timestamp.minute -= MINUTES_IN_HOUR;
        timestamp.hour++;
        if (timestamp.hour >= HOURS_IN_DAY) {
            nextDay(timestamp);
            timestamp.hour = FIRST_HOUR;
        }
    }
    return timestamp;
}
export function nextDay(timestamp) {
    timestamp.day++;
    timestamp.weekday = (timestamp.weekday + 1) % DAYS_IN_WEEK;
    if (timestamp.day > DAYS_IN_MONTH_MIN && timestamp.day > daysInMonth(timestamp.year, timestamp.month)) {
        timestamp.day = DAY_MIN;
        timestamp.month++;
        if (timestamp.month > MONTH_MAX) {
            timestamp.month = MONTH_MIN;
            timestamp.year++;
        }
    }
    return timestamp;
}
export function prevDay(timestamp) {
    timestamp.day--;
    timestamp.weekday = (timestamp.weekday + 6) % DAYS_IN_WEEK;
    if (timestamp.day < DAY_MIN) {
        timestamp.month--;
        if (timestamp.month < MONTH_MIN) {
            timestamp.year--;
            timestamp.month = MONTH_MAX;
        }
        timestamp.day = daysInMonth(timestamp.year, timestamp.month);
    }
    return timestamp;
}
export function relativeDays(timestamp, mover = nextDay, days = 1) {
    while (--days >= 0)
        mover(timestamp);
    return timestamp;
}
export function findWeekday(timestamp, weekday, mover = nextDay, maxDays = 6) {
    while (timestamp.weekday !== weekday && --maxDays >= 0)
        mover(timestamp);
    return timestamp;
}
export function getWeekdaySkips(weekdays) {
    const skips = [1, 1, 1, 1, 1, 1, 1];
    const filled = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < weekdays.length; i++) {
        filled[weekdays[i]] = 1;
    }
    for (let k = 0; k < DAYS_IN_WEEK; k++) {
        let skip = 1;
        for (let j = 1; j < DAYS_IN_WEEK; j++) {
            const next = (k + j) % DAYS_IN_WEEK;
            if (filled[next]) {
                break;
            }
            skip++;
        }
        skips[k] = filled[k] * skip;
    }
    return skips;
}
export function createDayList(start, end, now, weekdaySkips, max = 42) {
    const stop = getDayIdentifier(end);
    const days = [];
    let current = copyTimestamp(start);
    let currentIdentifier = 0;
    while (currentIdentifier !== stop && days.length < max) {
        currentIdentifier = getDayIdentifier(current);
        if (weekdaySkips[current.weekday] === 0) {
            current = nextDay(current);
            continue;
        }
        const day = copyTimestamp(current);
        updateFormatted(day);
        updateRelative(day, now);
        days.push(day);
        current = relativeDays(current, nextDay, weekdaySkips[current.weekday]);
    }
    return days;
}
export function createIntervalList(timestamp, first, minutes, count, now) {
    const intervals = [];
    for (let i = 0; i < count; i++) {
        const mins = (first + i) * minutes;
        const int = copyTimestamp(timestamp);
        intervals.push(updateMinutes(int, mins, now));
    }
    return intervals;
}
export function createNativeLocaleFormatter(locale, getOptions) {
    const emptyFormatter = (t, s) => '';
    if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
        return emptyFormatter;
    }
    return (timestamp, short) => {
        try {
            const intlFormatter = new Intl.DateTimeFormat(locale || undefined, getOptions(timestamp, short));
            const time = `${padNumber(timestamp.hour, 2)}:${padNumber(timestamp.minute, 2)}`;
            const date = timestamp.date;
            return intlFormatter.format(new Date(`${date}T${time}:00+00:00`));
        }
        catch (e) {
            return '';
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXN0YW1wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkNhbGVuZGFyL3V0aWwvdGltZXN0YW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE1BQU0sV0FBVyxHQUFXLGdGQUFnRixDQUFBO0FBRTVHLE1BQU0sYUFBYSxHQUFhLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDbkYsTUFBTSxrQkFBa0IsR0FBYSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ3hGLE1BQU0saUJBQWlCLEdBQVcsRUFBRSxDQUFBO0FBQ3BDLE1BQU0sU0FBUyxHQUFXLEVBQUUsQ0FBQTtBQUM1QixNQUFNLFNBQVMsR0FBVyxDQUFDLENBQUE7QUFDM0IsTUFBTSxPQUFPLEdBQVcsQ0FBQyxDQUFBO0FBQ3pCLE1BQU0sWUFBWSxHQUFXLENBQUMsQ0FBQTtBQUM5QixNQUFNLGVBQWUsR0FBVyxFQUFFLENBQUE7QUFDbEMsTUFBTSxZQUFZLEdBQVcsRUFBRSxDQUFBO0FBQy9CLE1BQU0sVUFBVSxHQUFXLENBQUMsQ0FBQTtBQXNCNUIsTUFBTSxVQUFVLGlCQUFpQixDQUFFLEtBQVU7SUFDM0MsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNsQyxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBRSxLQUFhLEVBQUUsR0FBZ0I7SUFDN0Qsc0JB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STtZQUNGLE1BQU0sYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNoRyxNQUFNLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFDaEYsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQTtZQUMzQixPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFBO1NBQ2xFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLEVBQUUsQ0FBQTtTQUNWO0lBQ0gsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgUEFSU0VfUkVHRVg6IFJlZ0V4cCA9IC9eKFxcZHsxLDR9KS0oXFxkezEsMn0pKC0oXFxkezEsMn0pKT8oW15cXGRdKyhcXGR7MSwyfSkpPyg6KFxcZHsxLDJ9KSk/KDooXFxkezEsMn0pKT8kL1xuXG5jb25zdCBEQVlTX0lOX01PTlRIOiBudW1iZXJbXSA9IFswLCAzMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXVxuY29uc3QgREFZU19JTl9NT05USF9MRUFQOiBudW1iZXJbXSA9IFswLCAzMSwgMjksIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXVxuY29uc3QgREFZU19JTl9NT05USF9NSU46IG51bWJlciA9IDI4XG5jb25zdCBNT05USF9NQVg6IG51bWJlciA9IDEyXG5jb25zdCBNT05USF9NSU46IG51bWJlciA9IDFcbmNvbnN0IERBWV9NSU46IG51bWJlciA9IDFcbmNvbnN0IERBWVNfSU5fV0VFSzogbnVtYmVyID0gN1xuY29uc3QgTUlOVVRFU19JTl9IT1VSOiBudW1iZXIgPSA2MFxuY29uc3QgSE9VUlNfSU5fREFZOiBudW1iZXIgPSAyNFxuY29uc3QgRklSU1RfSE9VUjogbnVtYmVyID0gMFxuXG5leHBvcnQgaW50ZXJmYWNlIFZUaW1lc3RhbXAge1xuICBkYXRlOiBzdHJpbmdcbiAgdGltZTogc3RyaW5nXG4gIHllYXI6IG51bWJlclxuICBtb250aDogbnVtYmVyXG4gIGRheTogbnVtYmVyXG4gIHdlZWtkYXk6IG51bWJlclxuICBob3VyOiBudW1iZXJcbiAgbWludXRlOiBudW1iZXJcbiAgaGFzRGF5OiBib29sZWFuXG4gIGhhc1RpbWU6IGJvb2xlYW5cbiAgcGFzdDogYm9vbGVhblxuICBwcmVzZW50OiBib29sZWFuXG4gIGZ1dHVyZTogYm9vbGVhblxufVxuXG5leHBvcnQgdHlwZSBWVGltZXN0YW1wRm9ybWF0dGVyPFI+ID0gKHRpbWVzdGFtcDogVlRpbWVzdGFtcCwgc2hvcnQ6IGJvb2xlYW4pID0+IFJcblxuZXhwb3J0IHR5cGUgVlRpbWVzdGFtcE9wZXJhdGlvbiA9ICh0aW1lc3RhbXA6IFZUaW1lc3RhbXApID0+IFZUaW1lc3RhbXBcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlVGltZXN0YW1wIChpbnB1dDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiAhIVBBUlNFX1JFR0VYLmV4ZWMoaW5wdXQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRpbWVzdGFtcCAoaW5wdXQ6IHN0cmluZywgbm93PzogVlRpbWVzdGFtcCk6IFZUaW1lc3RhbXAgfCBudWxsIHtcbiAgLy8gWVlZWS1NTS1ERCBoaDptbTpzc1xuICBjb25zdCBwYXJ0cyA9IFBBUlNFX1JFR0VYLmV4ZWMoaW5wdXQpXG5cbiAgaWYgKCFwYXJ0cykgcmV0dXJuIG51bGxcblxuICBjb25zdCB0aW1lc3RhbXA6IFZUaW1lc3RhbXAgPSB7XG4gICAgZGF0ZTogaW5wdXQsXG4gICAgdGltZTogJycsXG4gICAgeWVhcjogcGFyc2VJbnQocGFydHNbMV0pLFxuICAgIG1vbnRoOiBwYXJzZUludChwYXJ0c1syXSksXG4gICAgZGF5OiBwYXJzZUludChwYXJ0c1s0XSkgfHwgMSxcbiAgICBob3VyOiBwYXJzZUludChwYXJ0c1s2XSkgfHwgMCxcbiAgICBtaW51dGU6IHBhcnNlSW50KHBhcnRzWzhdKSB8fCAwLFxuICAgIHdlZWtkYXk6IDAsXG4gICAgaGFzRGF5OiAhIXBhcnRzWzRdLFxuICAgIGhhc1RpbWU6ICEhKHBhcnRzWzZdICYmIHBhcnRzWzhdKSxcbiAgICBwYXN0OiBmYWxzZSxcbiAgICBwcmVzZW50OiBmYWxzZSxcbiAgICBmdXR1cmU6IGZhbHNlXG4gIH1cblxuICB1cGRhdGVXZWVrZGF5KHRpbWVzdGFtcClcbiAgdXBkYXRlRm9ybWF0dGVkKHRpbWVzdGFtcClcblxuICBpZiAobm93KSB7XG4gICAgdXBkYXRlUmVsYXRpdmUodGltZXN0YW1wLCBub3csIHRpbWVzdGFtcC5oYXNUaW1lKVxuICB9XG5cbiAgcmV0dXJuIHRpbWVzdGFtcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5SWRlbnRpZmllciAodGltZXN0YW1wOiBWVGltZXN0YW1wKTogbnVtYmVyIHtcbiAgcmV0dXJuIHRpbWVzdGFtcC55ZWFyICogMTAwMDAwMCArIHRpbWVzdGFtcC5tb250aCAqIDEwMCArIHRpbWVzdGFtcC5kYXlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVJZGVudGlmaWVyICh0aW1lc3RhbXA6IFZUaW1lc3RhbXApOiBudW1iZXIge1xuICByZXR1cm4gdGltZXN0YW1wLmhvdXIgKiAxMDAgKyB0aW1lc3RhbXAubWludXRlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVSZWxhdGl2ZSAodGltZXN0YW1wOiBWVGltZXN0YW1wLCBub3c6IFZUaW1lc3RhbXAsIHRpbWU6IGJvb2xlYW4gPSBmYWxzZSk6IFZUaW1lc3RhbXAge1xuICBsZXQgYSA9IGdldERheUlkZW50aWZpZXIobm93KVxuICBsZXQgYiA9IGdldERheUlkZW50aWZpZXIodGltZXN0YW1wKVxuICBsZXQgcHJlc2VudCA9IGEgPT09IGJcblxuICBpZiAodGltZXN0YW1wLmhhc1RpbWUgJiYgdGltZSAmJiBwcmVzZW50KSB7XG4gICAgYSA9IGdldFRpbWVJZGVudGlmaWVyKG5vdylcbiAgICBiID0gZ2V0VGltZUlkZW50aWZpZXIodGltZXN0YW1wKVxuICAgIHByZXNlbnQgPSBhID09PSBiXG4gIH1cblxuICB0aW1lc3RhbXAucGFzdCA9IGIgPCBhXG4gIHRpbWVzdGFtcC5wcmVzZW50ID0gcHJlc2VudFxuICB0aW1lc3RhbXAuZnV0dXJlID0gYiA+IGFcblxuICByZXR1cm4gdGltZXN0YW1wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNaW51dGVzICh0aW1lc3RhbXA6IFZUaW1lc3RhbXAsIG1pbnV0ZXM6IG51bWJlciwgbm93PzogVlRpbWVzdGFtcCk6IFZUaW1lc3RhbXAge1xuICB0aW1lc3RhbXAuaGFzVGltZSA9IHRydWVcbiAgdGltZXN0YW1wLmhvdXIgPSBNYXRoLmZsb29yKG1pbnV0ZXMgLyBNSU5VVEVTX0lOX0hPVVIpXG4gIHRpbWVzdGFtcC5taW51dGUgPSBtaW51dGVzICUgTUlOVVRFU19JTl9IT1VSXG4gIHRpbWVzdGFtcC50aW1lID0gZ2V0VGltZSh0aW1lc3RhbXApXG4gIGlmIChub3cpIHtcbiAgICB1cGRhdGVSZWxhdGl2ZSh0aW1lc3RhbXAsIG5vdywgdHJ1ZSlcbiAgfVxuXG4gIHJldHVybiB0aW1lc3RhbXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVdlZWtkYXkgKHRpbWVzdGFtcDogVlRpbWVzdGFtcCk6IFZUaW1lc3RhbXAge1xuICB0aW1lc3RhbXAud2Vla2RheSA9IGdldFdlZWtkYXkodGltZXN0YW1wKVxuXG4gIHJldHVybiB0aW1lc3RhbXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZvcm1hdHRlZCAodGltZXN0YW1wOiBWVGltZXN0YW1wKTogVlRpbWVzdGFtcCB7XG4gIHRpbWVzdGFtcC50aW1lID0gZ2V0VGltZSh0aW1lc3RhbXApXG4gIHRpbWVzdGFtcC5kYXRlID0gZ2V0RGF0ZSh0aW1lc3RhbXApXG5cbiAgcmV0dXJuIHRpbWVzdGFtcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla2RheSAodGltZXN0YW1wOiBWVGltZXN0YW1wKTogbnVtYmVyIHtcbiAgaWYgKHRpbWVzdGFtcC5oYXNEYXkpIHtcbiAgICBjb25zdCBfID0gTWF0aC5mbG9vclxuICAgIGNvbnN0IGsgPSB0aW1lc3RhbXAuZGF5XG4gICAgY29uc3QgbSA9ICgodGltZXN0YW1wLm1vbnRoICsgOSkgJSBNT05USF9NQVgpICsgMVxuICAgIGNvbnN0IEMgPSBfKHRpbWVzdGFtcC55ZWFyIC8gMTAwKVxuICAgIGNvbnN0IFkgPSAodGltZXN0YW1wLnllYXIgJSAxMDApIC0gKHRpbWVzdGFtcC5tb250aCA8PSAyID8gMSA6IDApXG5cbiAgICByZXR1cm4gKGsgKyBfKDIuNiAqIG0gLSAwLjIpIC0gMiAqIEMgKyBZICsgXyhZIC8gNCkgKyBfKEMgLyA0KSkgJSA3XG4gIH1cblxuICByZXR1cm4gdGltZXN0YW1wLndlZWtkYXlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGVhcFllYXIgKHllYXI6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gKCh5ZWFyICUgNCA9PT0gMCkgJiYgKHllYXIgJSAxMDAgIT09IDApKSB8fCAoeWVhciAlIDQwMCA9PT0gMClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRheXNJbk1vbnRoICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIpIHtcbiAgcmV0dXJuIGlzTGVhcFllYXIoeWVhcikgPyBEQVlTX0lOX01PTlRIX0xFQVBbbW9udGhdIDogREFZU19JTl9NT05USFttb250aF1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUaW1lc3RhbXAgKHRpbWVzdGFtcDogVlRpbWVzdGFtcCk6IFZUaW1lc3RhbXAge1xuICBjb25zdCB7IGRhdGUsIHRpbWUsIHllYXIsIG1vbnRoLCBkYXksIHdlZWtkYXksIGhvdXIsIG1pbnV0ZSwgaGFzRGF5LCBoYXNUaW1lLCBwYXN0LCBwcmVzZW50LCBmdXR1cmUgfSA9IHRpbWVzdGFtcFxuXG4gIHJldHVybiB7IGRhdGUsIHRpbWUsIHllYXIsIG1vbnRoLCBkYXksIHdlZWtkYXksIGhvdXIsIG1pbnV0ZSwgaGFzRGF5LCBoYXNUaW1lLCBwYXN0LCBwcmVzZW50LCBmdXR1cmUgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFkTnVtYmVyICh4OiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHBhZGRlZCA9IFN0cmluZyh4KVxuICB3aGlsZSAocGFkZGVkLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgIHBhZGRlZCA9ICcwJyArIHBhZGRlZFxuICB9XG5cbiAgcmV0dXJuIHBhZGRlZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0ZSAodGltZXN0YW1wOiBWVGltZXN0YW1wKTogc3RyaW5nIHtcbiAgbGV0IHN0ciA9IGAke3BhZE51bWJlcih0aW1lc3RhbXAueWVhciwgNCl9LSR7cGFkTnVtYmVyKHRpbWVzdGFtcC5tb250aCwgMil9YFxuXG4gIGlmICh0aW1lc3RhbXAuaGFzRGF5KSBzdHIgKz0gYC0ke3BhZE51bWJlcih0aW1lc3RhbXAuZGF5LCAyKX1gXG5cbiAgcmV0dXJuIHN0clxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZSAodGltZXN0YW1wOiBWVGltZXN0YW1wKTogc3RyaW5nIHtcbiAgaWYgKCF0aW1lc3RhbXAuaGFzVGltZSkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgcmV0dXJuIGAke3BhZE51bWJlcih0aW1lc3RhbXAuaG91ciwgMil9OiR7cGFkTnVtYmVyKHRpbWVzdGFtcC5taW51dGUsIDIpfWBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRNaW51dGVzICh0aW1lc3RhbXA6IFZUaW1lc3RhbXAsIG1pbnV0ZXM6IG51bWJlcik6IFZUaW1lc3RhbXAge1xuICB0aW1lc3RhbXAubWludXRlICs9IG1pbnV0ZXNcbiAgd2hpbGUgKHRpbWVzdGFtcC5taW51dGUgPiBNSU5VVEVTX0lOX0hPVVIpIHtcbiAgICB0aW1lc3RhbXAubWludXRlIC09IE1JTlVURVNfSU5fSE9VUlxuICAgIHRpbWVzdGFtcC5ob3VyKytcbiAgICBpZiAodGltZXN0YW1wLmhvdXIgPj0gSE9VUlNfSU5fREFZKSB7XG4gICAgICBuZXh0RGF5KHRpbWVzdGFtcClcbiAgICAgIHRpbWVzdGFtcC5ob3VyID0gRklSU1RfSE9VUlxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aW1lc3RhbXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5leHREYXkgKHRpbWVzdGFtcDogVlRpbWVzdGFtcCk6IFZUaW1lc3RhbXAge1xuICB0aW1lc3RhbXAuZGF5KytcbiAgdGltZXN0YW1wLndlZWtkYXkgPSAodGltZXN0YW1wLndlZWtkYXkgKyAxKSAlIERBWVNfSU5fV0VFS1xuICBpZiAodGltZXN0YW1wLmRheSA+IERBWVNfSU5fTU9OVEhfTUlOICYmIHRpbWVzdGFtcC5kYXkgPiBkYXlzSW5Nb250aCh0aW1lc3RhbXAueWVhciwgdGltZXN0YW1wLm1vbnRoKSkge1xuICAgIHRpbWVzdGFtcC5kYXkgPSBEQVlfTUlOXG4gICAgdGltZXN0YW1wLm1vbnRoKytcbiAgICBpZiAodGltZXN0YW1wLm1vbnRoID4gTU9OVEhfTUFYKSB7XG4gICAgICB0aW1lc3RhbXAubW9udGggPSBNT05USF9NSU5cbiAgICAgIHRpbWVzdGFtcC55ZWFyKytcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGltZXN0YW1wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2RGF5ICh0aW1lc3RhbXA6IFZUaW1lc3RhbXApOiBWVGltZXN0YW1wIHtcbiAgdGltZXN0YW1wLmRheS0tXG4gIHRpbWVzdGFtcC53ZWVrZGF5ID0gKHRpbWVzdGFtcC53ZWVrZGF5ICsgNikgJSBEQVlTX0lOX1dFRUtcbiAgaWYgKHRpbWVzdGFtcC5kYXkgPCBEQVlfTUlOKSB7XG4gICAgdGltZXN0YW1wLm1vbnRoLS1cbiAgICBpZiAodGltZXN0YW1wLm1vbnRoIDwgTU9OVEhfTUlOKSB7XG4gICAgICB0aW1lc3RhbXAueWVhci0tXG4gICAgICB0aW1lc3RhbXAubW9udGggPSBNT05USF9NQVhcbiAgICB9XG4gICAgdGltZXN0YW1wLmRheSA9IGRheXNJbk1vbnRoKHRpbWVzdGFtcC55ZWFyLCB0aW1lc3RhbXAubW9udGgpXG4gIH1cblxuICByZXR1cm4gdGltZXN0YW1wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWxhdGl2ZURheXMgKHRpbWVzdGFtcDogVlRpbWVzdGFtcCxcbiAgbW92ZXI6IFZUaW1lc3RhbXBPcGVyYXRpb24gPSBuZXh0RGF5LCBkYXlzOiBudW1iZXIgPSAxKTogVlRpbWVzdGFtcCB7XG4gIHdoaWxlICgtLWRheXMgPj0gMCkgbW92ZXIodGltZXN0YW1wKVxuXG4gIHJldHVybiB0aW1lc3RhbXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRXZWVrZGF5ICh0aW1lc3RhbXA6IFZUaW1lc3RhbXAsIHdlZWtkYXk6IG51bWJlcixcbiAgbW92ZXI6IFZUaW1lc3RhbXBPcGVyYXRpb24gPSBuZXh0RGF5LCBtYXhEYXlzOiBudW1iZXIgPSA2KTogVlRpbWVzdGFtcCB7XG4gIHdoaWxlICh0aW1lc3RhbXAud2Vla2RheSAhPT0gd2Vla2RheSAmJiAtLW1heERheXMgPj0gMCkgbW92ZXIodGltZXN0YW1wKVxuXG4gIHJldHVybiB0aW1lc3RhbXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtkYXlTa2lwcyAod2Vla2RheXM6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICBjb25zdCBza2lwczogbnVtYmVyW10gPSBbMSwgMSwgMSwgMSwgMSwgMSwgMV1cbiAgY29uc3QgZmlsbGVkOiBudW1iZXJbXSA9IFswLCAwLCAwLCAwLCAwLCAwLCAwXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHdlZWtkYXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgZmlsbGVkW3dlZWtkYXlzW2ldXSA9IDFcbiAgfVxuICBmb3IgKGxldCBrID0gMDsgayA8IERBWVNfSU5fV0VFSzsgaysrKSB7XG4gICAgbGV0IHNraXAgPSAxXG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCBEQVlTX0lOX1dFRUs7IGorKykge1xuICAgICAgY29uc3QgbmV4dCA9IChrICsgaikgJSBEQVlTX0lOX1dFRUtcbiAgICAgIGlmIChmaWxsZWRbbmV4dF0pIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIHNraXArK1xuICAgIH1cbiAgICBza2lwc1trXSA9IGZpbGxlZFtrXSAqIHNraXBcbiAgfVxuXG4gIHJldHVybiBza2lwc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGF5TGlzdCAoc3RhcnQ6IFZUaW1lc3RhbXAsIGVuZDogVlRpbWVzdGFtcCwgbm93OiBWVGltZXN0YW1wLFxuICB3ZWVrZGF5U2tpcHM6IG51bWJlcltdLCBtYXg6IG51bWJlciA9IDQyKTogVlRpbWVzdGFtcFtdIHtcbiAgY29uc3Qgc3RvcCA9IGdldERheUlkZW50aWZpZXIoZW5kKVxuICBjb25zdCBkYXlzOiBWVGltZXN0YW1wW10gPSBbXVxuICBsZXQgY3VycmVudCA9IGNvcHlUaW1lc3RhbXAoc3RhcnQpXG4gIGxldCBjdXJyZW50SWRlbnRpZmllciA9IDBcblxuICB3aGlsZSAoY3VycmVudElkZW50aWZpZXIgIT09IHN0b3AgJiYgZGF5cy5sZW5ndGggPCBtYXgpIHtcbiAgICBjdXJyZW50SWRlbnRpZmllciA9IGdldERheUlkZW50aWZpZXIoY3VycmVudClcbiAgICBpZiAod2Vla2RheVNraXBzW2N1cnJlbnQud2Vla2RheV0gPT09IDApIHtcbiAgICAgIGN1cnJlbnQgPSBuZXh0RGF5KGN1cnJlbnQpXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBjb25zdCBkYXkgPSBjb3B5VGltZXN0YW1wKGN1cnJlbnQpXG4gICAgdXBkYXRlRm9ybWF0dGVkKGRheSlcbiAgICB1cGRhdGVSZWxhdGl2ZShkYXksIG5vdylcbiAgICBkYXlzLnB1c2goZGF5KVxuICAgIGN1cnJlbnQgPSByZWxhdGl2ZURheXMoY3VycmVudCwgbmV4dERheSwgd2Vla2RheVNraXBzW2N1cnJlbnQud2Vla2RheV0pXG4gIH1cblxuICByZXR1cm4gZGF5c1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW50ZXJ2YWxMaXN0ICh0aW1lc3RhbXA6IFZUaW1lc3RhbXAsIGZpcnN0OiBudW1iZXIsXG4gIG1pbnV0ZXM6IG51bWJlciwgY291bnQ6IG51bWJlciwgbm93PzogVlRpbWVzdGFtcCk6IFZUaW1lc3RhbXBbXSB7XG4gIGNvbnN0IGludGVydmFsczogVlRpbWVzdGFtcFtdID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICBjb25zdCBtaW5zOiBudW1iZXIgPSAoZmlyc3QgKyBpKSAqIG1pbnV0ZXNcbiAgICBjb25zdCBpbnQ6IFZUaW1lc3RhbXAgPSBjb3B5VGltZXN0YW1wKHRpbWVzdGFtcClcbiAgICBpbnRlcnZhbHMucHVzaCh1cGRhdGVNaW51dGVzKGludCwgbWlucywgbm93KSlcbiAgfVxuXG4gIHJldHVybiBpbnRlcnZhbHNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5hdGl2ZUxvY2FsZUZvcm1hdHRlciAobG9jYWxlOiBzdHJpbmcsIGdldE9wdGlvbnM6IFZUaW1lc3RhbXBGb3JtYXR0ZXI8b2JqZWN0Pik6IFZUaW1lc3RhbXBGb3JtYXR0ZXI8c3RyaW5nPiB7XG4gIGNvbnN0IGVtcHR5Rm9ybWF0dGVyOiBWVGltZXN0YW1wRm9ybWF0dGVyPHN0cmluZz4gPSAodCwgcykgPT4gJydcblxuICBpZiAodHlwZW9mIEludGwgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBJbnRsLkRhdGVUaW1lRm9ybWF0ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBlbXB0eUZvcm1hdHRlclxuICB9XG5cbiAgcmV0dXJuICh0aW1lc3RhbXAsIHNob3J0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGludGxGb3JtYXR0ZXIgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUgfHwgdW5kZWZpbmVkLCBnZXRPcHRpb25zKHRpbWVzdGFtcCwgc2hvcnQpKVxuICAgICAgY29uc3QgdGltZSA9IGAke3BhZE51bWJlcih0aW1lc3RhbXAuaG91ciwgMil9OiR7cGFkTnVtYmVyKHRpbWVzdGFtcC5taW51dGUsIDIpfWBcbiAgICAgIGNvbnN0IGRhdGUgPSB0aW1lc3RhbXAuZGF0ZVxuICAgICAgcmV0dXJuIGludGxGb3JtYXR0ZXIuZm9ybWF0KG5ldyBEYXRlKGAke2RhdGV9VCR7dGltZX06MDArMDA6MDBgKSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gIH1cbn1cbiJdfQ==