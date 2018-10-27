// Mixins
import mixins from '../../../util/mixins';
import Themeable from '../../../mixins/themeable';
import Colorable from '../../../mixins/colorable';
import Times from './times';
import Mouse from './mouse';
// Util
import { validateTimestamp, parseTimestamp, getWeekdaySkips, createDayList, createNativeLocaleFormatter } from '../util/timestamp';
/* @vue/component */
export default mixins(Colorable, Themeable, Times, Mouse).extend({
    name: 'calendar-base',
    props: {
        start: {
            type: String,
            required: true,
            validate: validateTimestamp
        },
        end: {
            type: String,
            validate: validateTimestamp,
            default: '0000-00-00'
        },
        weekdays: {
            type: Array,
            default: () => [0, 1, 2, 3, 4, 5, 6]
        },
        hideHeader: {
            type: Boolean,
            default: false
        },
        shortWeekdays: {
            type: Boolean,
            default: true
        },
        weekdayFormat: {
            type: Function,
            default: null
        },
        dayFormat: {
            type: Function,
            default: null
        },
        locale: {
            type: String,
            default: 'en-us'
        }
    },
    data: () => ({
        defaultColor: 'primary'
    }),
    computed: {
        weekdaySkips() {
            return getWeekdaySkips(this.weekdays);
        },
        parsedStart() {
            return parseTimestamp(this.start);
        },
        parsedEnd() {
            return parseTimestamp(this.end);
        },
        days() {
            return createDayList(this.parsedStart, this.parsedEnd, this.times.today, this.weekdaySkips);
        },
        dayFormatter() {
            if (this.dayFormat) {
                return this.dayFormat;
            }
            const options = { timeZone: 'UTC', day: 'numeric' };
            return createNativeLocaleFormatter(this.locale, (tms, short) => options);
        },
        weekdayFormatter() {
            if (this.weekdayFormat) {
                return this.weekdayFormat;
            }
            const longOptions = { timeZone: 'UTC', weekday: 'long' };
            const shortOptions = { timeZone: 'UTC', weekday: 'short' };
            return createNativeLocaleFormatter(this.locale, (tms, short) => short ? shortOptions : longOptions);
        }
    },
    methods: {
        getRelativeClasses(timestamp) {
            return {
                'v-present': timestamp.present,
                'v-past': timestamp.past,
                'v-future': timestamp.future
            };
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZDYWxlbmRhci9taXhpbnMvY2FsZW5kYXItYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxTQUFTO0FBQ1QsT0FBTyxNQUFNLE1BQU0sc0JBQXNCLENBQUE7QUFDekMsT0FBTyxTQUFTLE1BQU0sMkJBQTJCLENBQUE7QUFDakQsT0FBTyxTQUFTLE1BQU0sMkJBQTJCLENBQUE7QUFDakQsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFBO0FBQzNCLE9BQU8sS0FBSyxNQUFNLFNBQVMsQ0FBQTtBQUUzQixPQUFPO0FBQ1AsT0FBTyxFQUdMLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsZUFBZSxFQUNmLGFBQWEsRUFDYiwyQkFBMkIsRUFDNUIsTUFBTSxtQkFBbUIsQ0FBQTtBQUUxQixvQkFBb0I7QUFDcEIsZUFBZSxNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQy9ELElBQUksRUFBRSxlQUFlO0lBRXJCLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsaUJBQWlCO1NBQzVCO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLE9BQU8sRUFBRSxZQUFZO1NBQ3RCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLEtBQXVCO1lBQzdCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNyQztRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELGFBQWEsRUFBRTtZQUNiLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELGFBQWEsRUFBRTtZQUNiLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLE9BQU87U0FDakI7S0FDRjtJQUVELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsWUFBWSxFQUFFLFNBQVM7S0FDeEIsQ0FBQztJQUVGLFFBQVEsRUFBRTtRQUNSLFlBQVk7WUFDVixPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELFdBQVc7WUFDVCxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFlLENBQUE7UUFDakQsQ0FBQztRQUNELFNBQVM7WUFDUCxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFlLENBQUE7UUFDL0MsQ0FBQztRQUNELElBQUk7WUFDRixPQUFPLGFBQWEsQ0FDbEIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FDbEIsQ0FBQTtRQUNILENBQUM7UUFDRCxZQUFZO1lBQ1YsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixPQUFPLElBQUksQ0FBQyxTQUF3QyxDQUFBO2FBQ3JEO1lBRUQsTUFBTSxPQUFPLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQTtZQUVuRCxPQUFPLDJCQUEyQixDQUNoQyxJQUFJLENBQUMsTUFBTSxFQUNYLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUN4QixDQUFBO1FBQ0gsQ0FBQztRQUNELGdCQUFnQjtZQUNkLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdEIsT0FBTyxJQUFJLENBQUMsYUFBNEMsQ0FBQTthQUN6RDtZQUVELE1BQU0sV0FBVyxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUE7WUFDeEQsTUFBTSxZQUFZLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQTtZQUUxRCxPQUFPLDJCQUEyQixDQUNoQyxJQUFJLENBQUMsTUFBTSxFQUNYLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FDbkQsQ0FBQTtRQUNILENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLGtCQUFrQixDQUFFLFNBQXFCO1lBQ3ZDLE9BQU87Z0JBQ0wsV0FBVyxFQUFFLFNBQVMsQ0FBQyxPQUFPO2dCQUM5QixRQUFRLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3hCLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTTthQUM3QixDQUFBO1FBQ0gsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBNaXhpbnNcbmltcG9ydCBtaXhpbnMgZnJvbSAnLi4vLi4vLi4vdXRpbC9taXhpbnMnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uLy4uL21peGlucy90aGVtZWFibGUnXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgVGltZXMgZnJvbSAnLi90aW1lcydcbmltcG9ydCBNb3VzZSBmcm9tICcuL21vdXNlJ1xuXG4vLyBVdGlsXG5pbXBvcnQge1xuICBWVGltZXN0YW1wLFxuICBWVGltZXN0YW1wRm9ybWF0dGVyLFxuICB2YWxpZGF0ZVRpbWVzdGFtcCxcbiAgcGFyc2VUaW1lc3RhbXAsXG4gIGdldFdlZWtkYXlTa2lwcyxcbiAgY3JlYXRlRGF5TGlzdCxcbiAgY3JlYXRlTmF0aXZlTG9jYWxlRm9ybWF0dGVyXG59IGZyb20gJy4uL3V0aWwvdGltZXN0YW1wJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQgbWl4aW5zKENvbG9yYWJsZSwgVGhlbWVhYmxlLCBUaW1lcywgTW91c2UpLmV4dGVuZCh7XG4gIG5hbWU6ICdjYWxlbmRhci1iYXNlJyxcblxuICBwcm9wczoge1xuICAgIHN0YXJ0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHZhbGlkYXRlOiB2YWxpZGF0ZVRpbWVzdGFtcFxuICAgIH0sXG4gICAgZW5kOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0ZTogdmFsaWRhdGVUaW1lc3RhbXAsXG4gICAgICBkZWZhdWx0OiAnMDAwMC0wMC0wMCdcbiAgICB9LFxuICAgIHdlZWtkYXlzOiB7XG4gICAgICB0eXBlOiBBcnJheSBhcyAoKSA9PiBudW1iZXJbXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFswLCAxLCAyLCAzLCA0LCA1LCA2XVxuICAgIH0sXG4gICAgaGlkZUhlYWRlcjoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBzaG9ydFdlZWtkYXlzOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgd2Vla2RheUZvcm1hdDoge1xuICAgICAgdHlwZTogRnVuY3Rpb24sIC8vIFZUaW1lc3RhbXBGb3JtYXR0ZXI8c3RyaW5nPixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGRheUZvcm1hdDoge1xuICAgICAgdHlwZTogRnVuY3Rpb24sIC8vIFZUaW1lc3RhbXBGb3JtYXR0ZXI8c3RyaW5nPixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGxvY2FsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2VuLXVzJ1xuICAgIH1cbiAgfSxcblxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGRlZmF1bHRDb2xvcjogJ3ByaW1hcnknXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgd2Vla2RheVNraXBzICgpOiBudW1iZXJbXSB7XG4gICAgICByZXR1cm4gZ2V0V2Vla2RheVNraXBzKHRoaXMud2Vla2RheXMpXG4gICAgfSxcbiAgICBwYXJzZWRTdGFydCAoKTogVlRpbWVzdGFtcCB7XG4gICAgICByZXR1cm4gcGFyc2VUaW1lc3RhbXAodGhpcy5zdGFydCkgYXMgVlRpbWVzdGFtcFxuICAgIH0sXG4gICAgcGFyc2VkRW5kICgpOiBWVGltZXN0YW1wIHtcbiAgICAgIHJldHVybiBwYXJzZVRpbWVzdGFtcCh0aGlzLmVuZCkgYXMgVlRpbWVzdGFtcFxuICAgIH0sXG4gICAgZGF5cyAoKTogVlRpbWVzdGFtcFtdIHtcbiAgICAgIHJldHVybiBjcmVhdGVEYXlMaXN0KFxuICAgICAgICB0aGlzLnBhcnNlZFN0YXJ0LFxuICAgICAgICB0aGlzLnBhcnNlZEVuZCxcbiAgICAgICAgdGhpcy50aW1lcy50b2RheSxcbiAgICAgICAgdGhpcy53ZWVrZGF5U2tpcHNcbiAgICAgIClcbiAgICB9LFxuICAgIGRheUZvcm1hdHRlciAoKTogVlRpbWVzdGFtcEZvcm1hdHRlcjxzdHJpbmc+IHtcbiAgICAgIGlmICh0aGlzLmRheUZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXlGb3JtYXQgYXMgVlRpbWVzdGFtcEZvcm1hdHRlcjxzdHJpbmc+XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IHRpbWVab25lOiAnVVRDJywgZGF5OiAnbnVtZXJpYycgfVxuXG4gICAgICByZXR1cm4gY3JlYXRlTmF0aXZlTG9jYWxlRm9ybWF0dGVyKFxuICAgICAgICB0aGlzLmxvY2FsZSxcbiAgICAgICAgKHRtcywgc2hvcnQpID0+IG9wdGlvbnNcbiAgICAgIClcbiAgICB9LFxuICAgIHdlZWtkYXlGb3JtYXR0ZXIgKCk6IFZUaW1lc3RhbXBGb3JtYXR0ZXI8c3RyaW5nPiB7XG4gICAgICBpZiAodGhpcy53ZWVrZGF5Rm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLndlZWtkYXlGb3JtYXQgYXMgVlRpbWVzdGFtcEZvcm1hdHRlcjxzdHJpbmc+XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvbmdPcHRpb25zID0geyB0aW1lWm9uZTogJ1VUQycsIHdlZWtkYXk6ICdsb25nJyB9XG4gICAgICBjb25zdCBzaG9ydE9wdGlvbnMgPSB7IHRpbWVab25lOiAnVVRDJywgd2Vla2RheTogJ3Nob3J0JyB9XG5cbiAgICAgIHJldHVybiBjcmVhdGVOYXRpdmVMb2NhbGVGb3JtYXR0ZXIoXG4gICAgICAgIHRoaXMubG9jYWxlLFxuICAgICAgICAodG1zLCBzaG9ydCkgPT4gc2hvcnQgPyBzaG9ydE9wdGlvbnMgOiBsb25nT3B0aW9uc1xuICAgICAgKVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2V0UmVsYXRpdmVDbGFzc2VzICh0aW1lc3RhbXA6IFZUaW1lc3RhbXApOiBvYmplY3Qge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3YtcHJlc2VudCc6IHRpbWVzdGFtcC5wcmVzZW50LFxuICAgICAgICAndi1wYXN0JzogdGltZXN0YW1wLnBhc3QsXG4gICAgICAgICd2LWZ1dHVyZSc6IHRpbWVzdGFtcC5mdXR1cmVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iXX0=