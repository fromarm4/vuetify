import '../../stylus/components/_avatars.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import { convertToUnit } from '../../util/helpers';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Colorable).extend({
    name: 'v-avatar',
    functional: true,
    props: {
        // TODO: inherit these
        color: String,
        size: {
            type: [Number, String],
            default: 48
        },
        tile: Boolean
    },
    render(h, { data, props, children }) {
        data.staticClass = (`v-avatar ${data.staticClass || ''}`).trim();
        if (props.tile)
            data.staticClass += ' v-avatar--tile';
        const size = convertToUnit(props.size);
        data.style = {
            height: size,
            width: size,
            ...data.style
        };
        data.class = [
            data.class,
            Colorable.options.methods.addBackgroundColorClassChecks.call(props, {}, props.color)
        ];
        return h('div', data, children);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkF2YXRhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZBdmF0YXIvVkF2YXRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHVDQUF1QyxDQUFBO0FBRTlDLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFJbEQsT0FBTyxNQUFNLE1BQU0sbUJBQW1CLENBQUE7QUFFdEMsb0JBQW9CO0FBQ3BCLGVBQWUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN0QyxJQUFJLEVBQUUsVUFBVTtJQUVoQixVQUFVLEVBQUUsSUFBSTtJQUVoQixLQUFLLEVBQUU7UUFDTCxzQkFBc0I7UUFDdEIsS0FBSyxFQUFFLE1BQU07UUFFYixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxFQUFFO1NBQ1o7UUFDRCxJQUFJLEVBQUUsT0FBTztLQUNkO0lBRUQsTUFBTSxDQUFFLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxZQUFZLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUVoRSxJQUFJLEtBQUssQ0FBQyxJQUFJO1lBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxpQkFBaUIsQ0FBQTtRQUVyRCxNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWCxNQUFNLEVBQUUsSUFBSTtZQUNaLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxJQUFJLENBQUMsS0FBSztTQUNkLENBQUE7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsSUFBSSxDQUFDLEtBQUs7WUFDVixTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ3JGLENBQUE7UUFFRCxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2pDLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19hdmF0YXJzLnN0eWwnXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IHsgY29udmVydFRvVW5pdCB9IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcblxuLy8gVHlwZXNcbmltcG9ydCB7IFZOb2RlIH0gZnJvbSAndnVlJ1xuaW1wb3J0IG1peGlucyBmcm9tICcuLi8uLi91dGlsL21peGlucydcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IG1peGlucyhDb2xvcmFibGUpLmV4dGVuZCh7XG4gIG5hbWU6ICd2LWF2YXRhcicsXG5cbiAgZnVuY3Rpb25hbDogdHJ1ZSxcblxuICBwcm9wczoge1xuICAgIC8vIFRPRE86IGluaGVyaXQgdGhlc2VcbiAgICBjb2xvcjogU3RyaW5nLFxuXG4gICAgc2l6ZToge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDQ4XG4gICAgfSxcbiAgICB0aWxlOiBCb29sZWFuXG4gIH0sXG5cbiAgcmVuZGVyIChoLCB7IGRhdGEsIHByb3BzLCBjaGlsZHJlbiB9KTogVk5vZGUge1xuICAgIGRhdGEuc3RhdGljQ2xhc3MgPSAoYHYtYXZhdGFyICR7ZGF0YS5zdGF0aWNDbGFzcyB8fCAnJ31gKS50cmltKClcblxuICAgIGlmIChwcm9wcy50aWxlKSBkYXRhLnN0YXRpY0NsYXNzICs9ICcgdi1hdmF0YXItLXRpbGUnXG5cbiAgICBjb25zdCBzaXplID0gY29udmVydFRvVW5pdChwcm9wcy5zaXplKVxuICAgIGRhdGEuc3R5bGUgPSB7XG4gICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICB3aWR0aDogc2l6ZSxcbiAgICAgIC4uLmRhdGEuc3R5bGVcbiAgICB9XG4gICAgZGF0YS5jbGFzcyA9IFtcbiAgICAgIGRhdGEuY2xhc3MsXG4gICAgICBDb2xvcmFibGUub3B0aW9ucy5tZXRob2RzLmFkZEJhY2tncm91bmRDb2xvckNsYXNzQ2hlY2tzLmNhbGwocHJvcHMsIHt9LCBwcm9wcy5jb2xvcilcbiAgICBdXG5cbiAgICByZXR1cm4gaCgnZGl2JywgZGF0YSwgY2hpbGRyZW4pXG4gIH1cbn0pXG4iXX0=