// Components
import VTimePickerTitle from './VTimePickerTitle';
import VTimePickerClock from './VTimePickerClock';
// Mixins
import Picker from '../../mixins/picker';
// Utils
import { createRange } from '../../util/helpers';
import pad from '../VDatePicker/util/pad';
const rangeHours24 = createRange(24);
const rangeHours12am = createRange(12);
const rangeHours12pm = rangeHours12am.map(v => v + 12);
const rangeMinutes = createRange(60);
/* @vue/component */
export default {
    name: 'v-time-picker',
    mixins: [Picker],
    props: {
        allowedHours: Function,
        allowedMinutes: Function,
        format: {
            type: String,
            default: 'ampm',
            validator(val) {
                return ['ampm', '24hr'].includes(val);
            }
        },
        min: String,
        max: String,
        scrollable: Boolean,
        value: null
    },
    data() {
        return {
            inputHour: null,
            inputMinute: null,
            period: 'am',
            selectingHour: true
        };
    },
    computed: {
        isAllowedHourCb() {
            if (!this.min && !this.max)
                return this.allowedHours;
            const minHour = this.min ? this.min.split(':')[0] : 0;
            const maxHour = this.max ? this.max.split(':')[0] : 23;
            return val => {
                return val >= minHour * 1 &&
                    val <= maxHour * 1 &&
                    (!this.allowedHours || this.allowedHours(val));
            };
        },
        isAllowedMinuteCb() {
            const isHourAllowed = !this.allowedHours || this.allowedHours(this.inputHour);
            if (!this.min && !this.max) {
                return isHourAllowed ? this.allowedMinutes : () => false;
            }
            const [minHour, minMinute] = this.min ? this.min.split(':') : [0, 0];
            const [maxHour, maxMinute] = this.max ? this.max.split(':') : [23, 59];
            const minTime = minHour * 60 + minMinute * 1;
            const maxTime = maxHour * 60 + maxMinute * 1;
            return val => {
                const time = 60 * this.inputHour + val;
                return time >= minTime &&
                    time <= maxTime &&
                    isHourAllowed &&
                    (!this.allowedMinutes || this.allowedMinutes(val));
            };
        },
        isAmPm() {
            return this.format === 'ampm';
        }
    },
    watch: {
        value: 'setInputData'
    },
    mounted() {
        this.setInputData(this.value);
    },
    methods: {
        emitValue() {
            if (this.inputHour != null && this.inputMinute != null) {
                this.$emit('input', `${pad(this.inputHour)}:${pad(this.inputMinute)}`);
            }
        },
        setPeriod(period) {
            this.period = period;
            if (this.inputHour != null) {
                const newHour = this.inputHour + (period === 'am' ? -12 : 12);
                this.inputHour = this.firstAllowed('hour', newHour);
                this.emitValue();
            }
        },
        setInputData(value) {
            if (value == null) {
                this.inputHour = null;
                this.inputMinute = null;
                return;
            }
            if (value instanceof Date) {
                this.inputHour = value.getHours();
                this.inputMinute = value.getMinutes();
            }
            else {
                const [, hour, minute, , period] = value.trim().toLowerCase().match(/^(\d+):(\d+)(:\d+)?([ap]m)?$/, '') || [];
                this.inputHour = period ? this.convert12to24(parseInt(hour, 10), period) : parseInt(hour, 10);
                this.inputMinute = parseInt(minute, 10);
            }
            this.period = this.inputHour < 12 ? 'am' : 'pm';
        },
        convert24to12(hour) {
            return hour ? ((hour - 1) % 12 + 1) : 12;
        },
        convert12to24(hour, period) {
            return hour % 12 + (period === 'pm' ? 12 : 0);
        },
        onInput(value) {
            if (this.selectingHour) {
                this.inputHour = this.isAmPm ? this.convert12to24(value, this.period) : value;
            }
            else {
                this.inputMinute = value;
            }
            this.emitValue();
        },
        onChange() {
            if (!this.selectingHour) {
                this.$emit('change', this.value);
            }
            else {
                this.selectingHour = false;
            }
        },
        firstAllowed(type, value) {
            const allowedFn = type === 'hour' ? this.isAllowedHourCb : this.isAllowedMinuteCb;
            if (!allowedFn)
                return value;
            // TODO: clean up
            const range = type === 'minute'
                ? rangeMinutes
                : (this.isAmPm
                    ? (value < 12
                        ? rangeHours12am
                        : rangeHours12pm)
                    : rangeHours24);
            const first = range.find(v => allowedFn((v + value) % range.length + range[0]));
            return ((first || 0) + value) % range.length + range[0];
        },
        genClock() {
            return this.$createElement(VTimePickerClock, {
                props: {
                    allowedValues: this.selectingHour ? this.isAllowedHourCb : this.isAllowedMinuteCb,
                    color: this.color,
                    dark: this.dark,
                    double: this.selectingHour && !this.isAmPm,
                    format: this.selectingHour ? (this.isAmPm ? this.convert24to12 : val => val) : val => pad(val, 2),
                    light: this.light,
                    max: this.selectingHour ? (this.isAmPm && this.period === 'am' ? 11 : 23) : 59,
                    min: this.selectingHour && this.isAmPm && this.period === 'pm' ? 12 : 0,
                    scrollable: this.scrollable,
                    size: this.width - ((!this.fullWidth && this.landscape) ? 80 : 20),
                    step: this.selectingHour ? 1 : 5,
                    value: this.selectingHour ? this.inputHour : this.inputMinute
                },
                on: {
                    input: this.onInput,
                    change: this.onChange
                },
                ref: 'clock'
            });
        },
        genPickerBody() {
            return this.$createElement('div', {
                staticClass: 'v-time-picker-clock__container',
                style: {
                    width: `${this.width}px`,
                    height: `${this.width - ((!this.fullWidth && this.landscape) ? 60 : 0)}px`
                },
                key: this.selectingHour
            }, [this.genClock()]);
        },
        genPickerTitle() {
            return this.$createElement(VTimePickerTitle, {
                props: {
                    ampm: this.isAmPm,
                    hour: this.inputHour,
                    minute: this.inputMinute,
                    period: this.period,
                    selectingHour: this.selectingHour
                },
                on: {
                    'update:selectingHour': value => (this.selectingHour = value),
                    'update:period': this.setPeriod
                },
                ref: 'title',
                slot: 'title'
            });
        }
    },
    render() {
        return this.genPicker('v-picker--time');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRpbWVQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WVGltZVBpY2tlci9WVGltZVBpY2tlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxhQUFhO0FBQ2IsT0FBTyxnQkFBZ0IsTUFBTSxvQkFBb0IsQ0FBQTtBQUNqRCxPQUFPLGdCQUFnQixNQUFNLG9CQUFvQixDQUFBO0FBRWpELFNBQVM7QUFDVCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQTtBQUV4QyxRQUFRO0FBQ1IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2hELE9BQU8sR0FBRyxNQUFNLHlCQUF5QixDQUFBO0FBRXpDLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNwQyxNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDdEMsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUN0RCxNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7QUFFcEMsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsZUFBZTtJQUVyQixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFFaEIsS0FBSyxFQUFFO1FBQ0wsWUFBWSxFQUFFLFFBQVE7UUFDdEIsY0FBYyxFQUFFLFFBQVE7UUFDeEIsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsTUFBTTtZQUNmLFNBQVMsQ0FBRSxHQUFHO2dCQUNaLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3ZDLENBQUM7U0FDRjtRQUNELEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLE1B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QkFBZ0IsRUFBRTtnQkFDM0MsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO29CQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVc7b0JBQ3hCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO2lCQUNsQztnQkFDRCxFQUFFLEVBQUU7b0JBQ0Ysc0JBQXNCLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO29CQUM3RCxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVM7aUJBQ2hDO2dCQUNELEdBQUcsRUFBRSxPQUFPO2dCQUNaLElBQUksRUFBRSxPQUFPO2FBQ2QsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3pDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29tcG9uZW50c1xuaW1wb3J0IFZUaW1lUGlja2VyVGl0bGUgZnJvbSAnLi9WVGltZVBpY2tlclRpdGxlJ1xuaW1wb3J0IFZUaW1lUGlja2VyQ2xvY2sgZnJvbSAnLi9WVGltZVBpY2tlckNsb2NrJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBQaWNrZXIgZnJvbSAnLi4vLi4vbWl4aW5zL3BpY2tlcidcblxuLy8gVXRpbHNcbmltcG9ydCB7IGNyZWF0ZVJhbmdlIH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuaW1wb3J0IHBhZCBmcm9tICcuLi9WRGF0ZVBpY2tlci91dGlsL3BhZCdcblxuY29uc3QgcmFuZ2VIb3VyczI0ID0gY3JlYXRlUmFuZ2UoMjQpXG5jb25zdCByYW5nZUhvdXJzMTJhbSA9IGNyZWF0ZVJhbmdlKDEyKVxuY29uc3QgcmFuZ2VIb3VyczEycG0gPSByYW5nZUhvdXJzMTJhbS5tYXAodiA9PiB2ICsgMTIpXG5jb25zdCByYW5nZU1pbnV0ZXMgPSBjcmVhdGVSYW5nZSg2MClcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtdGltZS1waWNrZXInLFxuXG4gIG1peGluczogW1BpY2tlcl0sXG5cbiAgcHJvcHM6IHtcbiAgICBhbGxvd2VkSG91cnM6IEZ1bmN0aW9uLFxuICAgIGFsbG93ZWRNaW51dGVzOiBGdW5jdGlvbixcbiAgICBmb3JtYXQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdhbXBtJyxcbiAgICAgIHZhbGlkYXRvciAodmFsKSB7XG4gICAgICAgIHJldHVybiBbJ2FtcG0nLCAnMjRociddLmluY2x1ZGVzKHZhbClcbiAgICAgIH1cbiAgICB9LFxuICAgIG1pbjogU3RyaW5nLFxuICAgIG1heDogU3RyaW5nLFxuICAgIHNjcm9sbGFibGU6IEJvb2xlYW4sXG4gICAgdmFsdWU6IG51bGxcbiAgfSxcblxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5wdXRIb3VyOiBudWxsLFxuICAgICAgaW5wdXRNaW51dGU6IG51bGwsXG4gICAgICBwZXJpb2Q6ICdhbScsXG4gICAgICBzZWxlY3RpbmdIb3VyOiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgaXNBbGxvd2VkSG91ckNiICgpIHtcbiAgICAgIGlmICghdGhpcy5taW4gJiYgIXRoaXMubWF4KSByZXR1cm4gdGhpcy5hbGxvd2VkSG91cnNcblxuICAgICAgY29uc3QgbWluSG91ciA9IHRoaXMubWluID8gdGhpcy5taW4uc3BsaXQoJzonKVswXSA6IDBcbiAgICAgIGNvbnN0IG1heEhvdXIgPSB0aGlzLm1heCA/IHRoaXMubWF4LnNwbGl0KCc6JylbMF0gOiAyM1xuXG4gICAgICByZXR1cm4gdmFsID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbCA+PSBtaW5Ib3VyICogMSAmJlxuICAgICAgICAgIHZhbCA8PSBtYXhIb3VyICogMSAmJlxuICAgICAgICAgICghdGhpcy5hbGxvd2VkSG91cnMgfHwgdGhpcy5hbGxvd2VkSG91cnModmFsKSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzQWxsb3dlZE1pbnV0ZUNiICgpIHtcbiAgICAgIGNvbnN0IGlzSG91ckFsbG93ZWQgPSAhdGhpcy5hbGxvd2VkSG91cnMgfHwgdGhpcy5hbGxvd2VkSG91cnModGhpcy5pbnB1dEhvdXIpXG4gICAgICBpZiAoIXRoaXMubWluICYmICF0aGlzLm1heCkge1xuICAgICAgICByZXR1cm4gaXNIb3VyQWxsb3dlZCA/IHRoaXMuYWxsb3dlZE1pbnV0ZXMgOiAoKSA9PiBmYWxzZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBbbWluSG91ciwgbWluTWludXRlXSA9IHRoaXMubWluID8gdGhpcy5taW4uc3BsaXQoJzonKSA6IFswLCAwXVxuICAgICAgY29uc3QgW21heEhvdXIsIG1heE1pbnV0ZV0gPSB0aGlzLm1heCA/IHRoaXMubWF4LnNwbGl0KCc6JykgOiBbMjMsIDU5XVxuICAgICAgY29uc3QgbWluVGltZSA9IG1pbkhvdXIgKiA2MCArIG1pbk1pbnV0ZSAqIDFcbiAgICAgIGNvbnN0IG1heFRpbWUgPSBtYXhIb3VyICogNjAgKyBtYXhNaW51dGUgKiAxXG5cbiAgICAgIHJldHVybiB2YWwgPT4ge1xuICAgICAgICBjb25zdCB0aW1lID0gNjAgKiB0aGlzLmlucHV0SG91ciArIHZhbFxuICAgICAgICByZXR1cm4gdGltZSA+PSBtaW5UaW1lICYmXG4gICAgICAgICAgdGltZSA8PSBtYXhUaW1lICYmXG4gICAgICAgICAgaXNIb3VyQWxsb3dlZCAmJlxuICAgICAgICAgICghdGhpcy5hbGxvd2VkTWludXRlcyB8fCB0aGlzLmFsbG93ZWRNaW51dGVzKHZhbCkpXG4gICAgICB9XG4gICAgfSxcbiAgICBpc0FtUG0gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0ID09PSAnYW1wbSdcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZTogJ3NldElucHV0RGF0YSdcbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLnNldElucHV0RGF0YSh0aGlzLnZhbHVlKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBlbWl0VmFsdWUgKCkge1xuICAgICAgaWYgKHRoaXMuaW5wdXRIb3VyICE9IG51bGwgJiYgdGhpcy5pbnB1dE1pbnV0ZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgYCR7cGFkKHRoaXMuaW5wdXRIb3VyKX06JHtwYWQodGhpcy5pbnB1dE1pbnV0ZSl9YClcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldFBlcmlvZCAocGVyaW9kKSB7XG4gICAgICB0aGlzLnBlcmlvZCA9IHBlcmlvZFxuICAgICAgaWYgKHRoaXMuaW5wdXRIb3VyICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgbmV3SG91ciA9IHRoaXMuaW5wdXRIb3VyICsgKHBlcmlvZCA9PT0gJ2FtJyA/IC0xMiA6IDEyKVxuICAgICAgICB0aGlzLmlucHV0SG91ciA9IHRoaXMuZmlyc3RBbGxvd2VkKCdob3VyJywgbmV3SG91cilcbiAgICAgICAgdGhpcy5lbWl0VmFsdWUoKVxuICAgICAgfVxuICAgIH0sXG4gICAgc2V0SW5wdXREYXRhICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5pbnB1dEhvdXIgPSBudWxsXG4gICAgICAgIHRoaXMuaW5wdXRNaW51dGUgPSBudWxsXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHRoaXMuaW5wdXRIb3VyID0gdmFsdWUuZ2V0SG91cnMoKVxuICAgICAgICB0aGlzLmlucHV0TWludXRlID0gdmFsdWUuZ2V0TWludXRlcygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBbLCBob3VyLCBtaW51dGUsICwgcGVyaW9kXSA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpLm1hdGNoKC9eKFxcZCspOihcXGQrKSg6XFxkKyk/KFthcF1tKT8kLywgJycpIHx8IFtdXG5cbiAgICAgICAgdGhpcy5pbnB1dEhvdXIgPSBwZXJpb2QgPyB0aGlzLmNvbnZlcnQxMnRvMjQocGFyc2VJbnQoaG91ciwgMTApLCBwZXJpb2QpIDogcGFyc2VJbnQoaG91ciwgMTApXG4gICAgICAgIHRoaXMuaW5wdXRNaW51dGUgPSBwYXJzZUludChtaW51dGUsIDEwKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnBlcmlvZCA9IHRoaXMuaW5wdXRIb3VyIDwgMTIgPyAnYW0nIDogJ3BtJ1xuICAgIH0sXG4gICAgY29udmVydDI0dG8xMiAoaG91cikge1xuICAgICAgcmV0dXJuIGhvdXIgPyAoKGhvdXIgLSAxKSAlIDEyICsgMSkgOiAxMlxuICAgIH0sXG4gICAgY29udmVydDEydG8yNCAoaG91ciwgcGVyaW9kKSB7XG4gICAgICByZXR1cm4gaG91ciAlIDEyICsgKHBlcmlvZCA9PT0gJ3BtJyA/IDEyIDogMClcbiAgICB9LFxuICAgIG9uSW5wdXQgKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RpbmdIb3VyKSB7XG4gICAgICAgIHRoaXMuaW5wdXRIb3VyID0gdGhpcy5pc0FtUG0gPyB0aGlzLmNvbnZlcnQxMnRvMjQodmFsdWUsIHRoaXMucGVyaW9kKSA6IHZhbHVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlucHV0TWludXRlID0gdmFsdWVcbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdFZhbHVlKClcbiAgICB9LFxuICAgIG9uQ2hhbmdlICgpIHtcbiAgICAgIGlmICghdGhpcy5zZWxlY3RpbmdIb3VyKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRoaXMudmFsdWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdGluZ0hvdXIgPSBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgZmlyc3RBbGxvd2VkICh0eXBlLCB2YWx1ZSkge1xuICAgICAgY29uc3QgYWxsb3dlZEZuID0gdHlwZSA9PT0gJ2hvdXInID8gdGhpcy5pc0FsbG93ZWRIb3VyQ2IgOiB0aGlzLmlzQWxsb3dlZE1pbnV0ZUNiXG4gICAgICBpZiAoIWFsbG93ZWRGbikgcmV0dXJuIHZhbHVlXG5cbiAgICAgIC8vIFRPRE86IGNsZWFuIHVwXG4gICAgICBjb25zdCByYW5nZSA9IHR5cGUgPT09ICdtaW51dGUnXG4gICAgICAgID8gcmFuZ2VNaW51dGVzXG4gICAgICAgIDogKHRoaXMuaXNBbVBtXG4gICAgICAgICAgPyAodmFsdWUgPCAxMlxuICAgICAgICAgICAgPyByYW5nZUhvdXJzMTJhbVxuICAgICAgICAgICAgOiByYW5nZUhvdXJzMTJwbSlcbiAgICAgICAgICA6IHJhbmdlSG91cnMyNClcbiAgICAgIGNvbnN0IGZpcnN0ID0gcmFuZ2UuZmluZCh2ID0+IGFsbG93ZWRGbigodiArIHZhbHVlKSAlIHJhbmdlLmxlbmd0aCArIHJhbmdlWzBdKSlcbiAgICAgIHJldHVybiAoKGZpcnN0IHx8IDApICsgdmFsdWUpICUgcmFuZ2UubGVuZ3RoICsgcmFuZ2VbMF1cbiAgICB9LFxuICAgIGdlbkNsb2NrICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFZUaW1lUGlja2VyQ2xvY2ssIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBhbGxvd2VkVmFsdWVzOiB0aGlzLnNlbGVjdGluZ0hvdXIgPyB0aGlzLmlzQWxsb3dlZEhvdXJDYiA6IHRoaXMuaXNBbGxvd2VkTWludXRlQ2IsXG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgICAgZGFyazogdGhpcy5kYXJrLFxuICAgICAgICAgIGRvdWJsZTogdGhpcy5zZWxlY3RpbmdIb3VyICYmICF0aGlzLmlzQW1QbSxcbiAgICAgICAgICBmb3JtYXQ6IHRoaXMuc2VsZWN0aW5nSG91ciA/ICh0aGlzLmlzQW1QbSA/IHRoaXMuY29udmVydDI0dG8xMiA6IHZhbCA9PiB2YWwpIDogdmFsID0+IHBhZCh2YWwsIDIpLFxuICAgICAgICAgIGxpZ2h0OiB0aGlzLmxpZ2h0LFxuICAgICAgICAgIG1heDogdGhpcy5zZWxlY3RpbmdIb3VyID8gKHRoaXMuaXNBbVBtICYmIHRoaXMucGVyaW9kID09PSAnYW0nID8gMTEgOiAyMykgOiA1OSxcbiAgICAgICAgICBtaW46IHRoaXMuc2VsZWN0aW5nSG91ciAmJiB0aGlzLmlzQW1QbSAmJiB0aGlzLnBlcmlvZCA9PT0gJ3BtJyA/IDEyIDogMCxcbiAgICAgICAgICBzY3JvbGxhYmxlOiB0aGlzLnNjcm9sbGFibGUsXG4gICAgICAgICAgc2l6ZTogdGhpcy53aWR0aCAtICgoIXRoaXMuZnVsbFdpZHRoICYmIHRoaXMubGFuZHNjYXBlKSA/IDgwIDogMjApLFxuICAgICAgICAgIHN0ZXA6IHRoaXMuc2VsZWN0aW5nSG91ciA/IDEgOiA1LFxuICAgICAgICAgIHZhbHVlOiB0aGlzLnNlbGVjdGluZ0hvdXIgPyB0aGlzLmlucHV0SG91ciA6IHRoaXMuaW5wdXRNaW51dGVcbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBpbnB1dDogdGhpcy5vbklucHV0LFxuICAgICAgICAgIGNoYW5nZTogdGhpcy5vbkNoYW5nZVxuICAgICAgICB9LFxuICAgICAgICByZWY6ICdjbG9jaydcbiAgICAgIH0pXG4gICAgfSxcbiAgICBnZW5QaWNrZXJCb2R5ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi10aW1lLXBpY2tlci1jbG9ja19fY29udGFpbmVyJyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB3aWR0aDogYCR7dGhpcy53aWR0aH1weGAsXG4gICAgICAgICAgaGVpZ2h0OiBgJHt0aGlzLndpZHRoIC0gKCghdGhpcy5mdWxsV2lkdGggJiYgdGhpcy5sYW5kc2NhcGUpID8gNjAgOiAwKX1weGBcbiAgICAgICAgfSxcbiAgICAgICAga2V5OiB0aGlzLnNlbGVjdGluZ0hvdXJcbiAgICAgIH0sIFt0aGlzLmdlbkNsb2NrKCldKVxuICAgIH0sXG4gICAgZ2VuUGlja2VyVGl0bGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVlRpbWVQaWNrZXJUaXRsZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGFtcG06IHRoaXMuaXNBbVBtLFxuICAgICAgICAgIGhvdXI6IHRoaXMuaW5wdXRIb3VyLFxuICAgICAgICAgIG1pbnV0ZTogdGhpcy5pbnB1dE1pbnV0ZSxcbiAgICAgICAgICBwZXJpb2Q6IHRoaXMucGVyaW9kLFxuICAgICAgICAgIHNlbGVjdGluZ0hvdXI6IHRoaXMuc2VsZWN0aW5nSG91clxuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgICd1cGRhdGU6c2VsZWN0aW5nSG91cic6IHZhbHVlID0+ICh0aGlzLnNlbGVjdGluZ0hvdXIgPSB2YWx1ZSksXG4gICAgICAgICAgJ3VwZGF0ZTpwZXJpb2QnOiB0aGlzLnNldFBlcmlvZFxuICAgICAgICB9LFxuICAgICAgICByZWY6ICd0aXRsZScsXG4gICAgICAgIHNsb3Q6ICd0aXRsZSdcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VuUGlja2VyKCd2LXBpY2tlci0tdGltZScpXG4gIH1cbn1cbiJdfQ==