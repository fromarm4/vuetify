// Styles
import '../../stylus/components/_rating.styl';
// Components
import VIcon from '../VIcon';
// Mixins
import Colorable from '../../mixins/colorable';
import Delayable from '../../mixins/delayable';
import Sizeable from '../../mixins/sizeable';
import Rippleable from '../../mixins/rippleable';
import Themeable from '../../mixins/themeable';
// Utilities
import { createRange } from '../../util/helpers';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Colorable, Delayable, Rippleable, Sizeable, Themeable).extend({
    name: 'v-rating',
    props: {
        backgroundColor: {
            type: String,
            default: 'accent'
        },
        color: {
            type: String,
            default: 'primary'
        },
        emptyIcon: {
            type: String,
            default: '$vuetify.icons.ratingEmpty'
        },
        fullIcon: {
            type: String,
            default: '$vuetify.icons.ratingFull'
        },
        halfIcon: {
            type: String,
            default: '$vuetify.icons.ratingHalf'
        },
        halfIncrements: Boolean,
        length: {
            type: [Number, String],
            default: 5
        },
        readonly: Boolean,
        hover: Boolean,
        value: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            hoverIndex: -1,
            internalValue: this.value
        };
    },
    computed: {
        directives() {
            if (this.readonly || !this.ripple)
                return [];
            return [{
                    name: 'ripple',
                    value: { circle: true }
                }];
        },
        iconProps() {
            const { dark, medium, large, light, small, size, xLarge } = this.$props;
            return {
                dark,
                medium,
                large,
                light,
                size,
                small,
                xLarge
            };
        },
        isHovering() {
            return this.hover && this.hoverIndex >= 0;
        }
    },
    watch: {
        internalValue(val) {
            val !== this.value && this.$emit('input', val);
        },
        value(val) {
            this.internalValue = val;
        }
    },
    methods: {
        createClickFn(i) {
            return (e) => {
                if (this.readonly)
                    return;
                this.internalValue = this.genHoverIndex(e, i);
            };
        },
        createProps(i) {
            const props = {
                index: i,
                value: this.internalValue,
                click: this.createClickFn(i),
                isFilled: Math.floor(this.internalValue) > i,
                isHovered: Math.floor(this.hoverIndex) > i
            };
            if (this.halfIncrements) {
                props.isHalfHovered = !props.isHovered && (this.hoverIndex - i) % 1 > 0;
                props.isHalfFilled = !props.isFilled && (this.internalValue - i) % 1 > 0;
            }
            return props;
        },
        genHoverIndex(e, i) {
            return i + (this.isHalfEvent(e) ? 0.5 : 1);
        },
        getIconName(props) {
            const isFull = this.isHovering ? props.isHovered : props.isFilled;
            const isHalf = this.isHovering ? props.isHalfHovered : props.isHalfFilled;
            return isFull ? this.fullIcon : isHalf ? this.halfIcon : this.emptyIcon;
        },
        getColor(props) {
            if (this.isHovering) {
                if (props.isHovered || props.isHalfHovered)
                    return this.color;
            }
            else {
                if (props.isFilled || props.isHalfFilled)
                    return this.color;
            }
            return this.backgroundColor;
        },
        isHalfEvent(e) {
            if (this.halfIncrements) {
                const rect = e.target && e.target.getBoundingClientRect();
                if (rect && e.offsetX < rect.width / 2)
                    return true;
            }
            return false;
        },
        onMouseEnter(e, i) {
            this.runDelay('open', () => {
                this.hoverIndex = this.genHoverIndex(e, i);
            });
        },
        onMouseLeave() {
            this.runDelay('close', () => (this.hoverIndex = -1));
        },
        genItem(i) {
            const props = this.createProps(i);
            if (this.$scopedSlots.item)
                return this.$scopedSlots.item(props);
            const listeners = {
                click: props.click
            };
            if (this.hover) {
                listeners.mouseenter = (e) => this.onMouseEnter(e, i);
                listeners.mouseleave = this.onMouseLeave;
                if (this.halfIncrements) {
                    listeners.mousemove = (e) => this.onMouseEnter(e, i);
                }
            }
            return this.$createElement(VIcon, {
                directives: this.directives,
                props: this.iconProps,
                class: this.addTextColorClassChecks({}, this.getColor(props)),
                on: listeners
            }, [this.getIconName(props)]);
        }
    },
    render(h) {
        const children = createRange(Number(this.length)).map(i => this.genItem(i));
        return h('div', {
            staticClass: 'v-rating',
            class: {
                'v-rating--readonly': this.readonly
            }
        }, children);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlJhdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZSYXRpbmcvVlJhdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxzQ0FBc0MsQ0FBQTtBQUU3QyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFBO0FBRTVCLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUM1QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxZQUFZO0FBQ1osT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2hELE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBZXRDLG9CQUFvQjtBQUNwQixlQUFlLE1BQU0sQ0FDbkIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsUUFBUSxFQUNSLFNBQVMsQ0FDVixDQUFDLE1BQU0sQ0FBQztJQUNQLElBQUksRUFBRSxVQUFVO0lBRWhCLEtBQUssRUFBRTtRQUNMLGVBQWUsRUFBRTtZQUNmLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsNEJBQTRCO1NBQ3RDO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsMkJBQTJCO1NBQ3JDO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsMkJB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QUcsQ0FBQyxDQUFhLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2lCQUNqRTthQUNGO1lBRUQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdELEVBQUUsRUFBRSxTQUFTO2FBQ2QsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQy9CLENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFM0UsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ2QsV0FBVyxFQUFFLFVBQVU7WUFDdkIsS0FBSyxFQUFFO2dCQUNMLG9CQUFvQixFQUFFLElBQUksQ0FBQyxRQUFRO2FBQ3BDO1NBQ0YsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNkLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3JhdGluZy5zdHlsJ1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgVkljb24gZnJvbSAnLi4vVkljb24nXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IERlbGF5YWJsZSBmcm9tICcuLi8uLi9taXhpbnMvZGVsYXlhYmxlJ1xuaW1wb3J0IFNpemVhYmxlIGZyb20gJy4uLy4uL21peGlucy9zaXplYWJsZSdcbmltcG9ydCBSaXBwbGVhYmxlIGZyb20gJy4uLy4uL21peGlucy9yaXBwbGVhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCB7IGNyZWF0ZVJhbmdlIH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuaW1wb3J0IG1peGlucyBmcm9tICcuLi8uLi91dGlsL21peGlucydcblxuLy8gVHlwZXNcbmltcG9ydCB7IFZOb2RlLCBWTm9kZURpcmVjdGl2ZSwgVk5vZGVDaGlsZHJlbkFycmF5Q29udGVudHMgfSBmcm9tICd2dWUnXG5cbnR5cGUgSXRlbVNsb3RQcm9wcyA9IHtcbiAgaW5kZXg6IG51bWJlclxuICB2YWx1ZTogbnVtYmVyXG4gIGlzRmlsbGVkOiBib29sZWFuXG4gIGlzSGFsZkZpbGxlZD86IGJvb2xlYW4gfCB1bmRlZmluZWRcbiAgaXNIb3ZlcmVkOiBib29sZWFuXG4gIGlzSGFsZkhvdmVyZWQ/OiBib29sZWFuIHwgdW5kZWZpbmVkXG4gIGNsaWNrOiBGdW5jdGlvblxufVxuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQgbWl4aW5zKFxuICBDb2xvcmFibGUsXG4gIERlbGF5YWJsZSxcbiAgUmlwcGxlYWJsZSxcbiAgU2l6ZWFibGUsXG4gIFRoZW1lYWJsZVxuKS5leHRlbmQoe1xuICBuYW1lOiAndi1yYXRpbmcnLFxuXG4gIHByb3BzOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnYWNjZW50J1xuICAgIH0sXG4gICAgY29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdwcmltYXJ5J1xuICAgIH0sXG4gICAgZW1wdHlJY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuaWNvbnMucmF0aW5nRW1wdHknXG4gICAgfSxcbiAgICBmdWxsSWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJyR2dWV0aWZ5Lmljb25zLnJhdGluZ0Z1bGwnXG4gICAgfSxcbiAgICBoYWxmSWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJyR2dWV0aWZ5Lmljb25zLnJhdGluZ0hhbGYnXG4gICAgfSxcbiAgICBoYWxmSW5jcmVtZW50czogQm9vbGVhbixcbiAgICBsZW5ndGg6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiA1XG4gICAgfSxcbiAgICByZWFkb25seTogQm9vbGVhbixcbiAgICBob3ZlcjogQm9vbGVhbixcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH1cbiAgfSxcblxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaG92ZXJJbmRleDogLTEsXG4gICAgICBpbnRlcm5hbFZhbHVlOiB0aGlzLnZhbHVlXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgZGlyZWN0aXZlcyAoKTogVk5vZGVEaXJlY3RpdmVbXSB7XG4gICAgICBpZiAodGhpcy5yZWFkb25seSB8fCAhdGhpcy5yaXBwbGUpIHJldHVybiBbXVxuXG4gICAgICByZXR1cm4gW3tcbiAgICAgICAgbmFtZTogJ3JpcHBsZScsXG4gICAgICAgIHZhbHVlOiB7IGNpcmNsZTogdHJ1ZSB9XG4gICAgICB9IGFzIFZOb2RlRGlyZWN0aXZlXVxuICAgIH0sXG4gICAgaWNvblByb3BzICgpOiBvYmplY3Qge1xuICAgICAgY29uc3Qge1xuICAgICAgICBkYXJrLFxuICAgICAgICBtZWRpdW0sXG4gICAgICAgIGxhcmdlLFxuICAgICAgICBsaWdodCxcbiAgICAgICAgc21hbGwsXG4gICAgICAgIHNpemUsXG4gICAgICAgIHhMYXJnZVxuICAgICAgfSA9IHRoaXMuJHByb3BzXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhcmssXG4gICAgICAgIG1lZGl1bSxcbiAgICAgICAgbGFyZ2UsXG4gICAgICAgIGxpZ2h0LFxuICAgICAgICBzaXplLFxuICAgICAgICBzbWFsbCxcbiAgICAgICAgeExhcmdlXG4gICAgICB9XG4gICAgfSxcbiAgICBpc0hvdmVyaW5nICgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLmhvdmVyICYmIHRoaXMuaG92ZXJJbmRleCA+PSAwXG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaW50ZXJuYWxWYWx1ZSAodmFsKSB7XG4gICAgICB2YWwgIT09IHRoaXMudmFsdWUgJiYgdGhpcy4kZW1pdCgnaW5wdXQnLCB2YWwpXG4gICAgfSxcbiAgICB2YWx1ZSAodmFsKSB7XG4gICAgICB0aGlzLmludGVybmFsVmFsdWUgPSB2YWxcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGNyZWF0ZUNsaWNrRm4gKGk6IG51bWJlcik6IEZ1bmN0aW9uIHtcbiAgICAgIHJldHVybiAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkgcmV0dXJuXG5cbiAgICAgICAgdGhpcy5pbnRlcm5hbFZhbHVlID0gdGhpcy5nZW5Ib3ZlckluZGV4KGUsIGkpXG4gICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVQcm9wcyAoaTogbnVtYmVyKTogSXRlbVNsb3RQcm9wcyB7XG4gICAgICBjb25zdCBwcm9wczogSXRlbVNsb3RQcm9wcyA9IHtcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIHZhbHVlOiB0aGlzLmludGVybmFsVmFsdWUsXG4gICAgICAgIGNsaWNrOiB0aGlzLmNyZWF0ZUNsaWNrRm4oaSksXG4gICAgICAgIGlzRmlsbGVkOiBNYXRoLmZsb29yKHRoaXMuaW50ZXJuYWxWYWx1ZSkgPiBpLFxuICAgICAgICBpc0hvdmVyZWQ6IE1hdGguZmxvb3IodGhpcy5ob3ZlckluZGV4KSA+IGlcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaGFsZkluY3JlbWVudHMpIHtcbiAgICAgICAgcHJvcHMuaXNIYWxmSG92ZXJlZCA9ICFwcm9wcy5pc0hvdmVyZWQgJiYgKHRoaXMuaG92ZXJJbmRleCAtIGkpICUgMSA+IDBcbiAgICAgICAgcHJvcHMuaXNIYWxmRmlsbGVkID0gIXByb3BzLmlzRmlsbGVkICYmICh0aGlzLmludGVybmFsVmFsdWUgLSBpKSAlIDEgPiAwXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9wc1xuICAgIH0sXG4gICAgZ2VuSG92ZXJJbmRleCAoZTogTW91c2VFdmVudCwgaTogbnVtYmVyKSB7XG4gICAgICByZXR1cm4gaSArICh0aGlzLmlzSGFsZkV2ZW50KGUpID8gMC41IDogMSlcbiAgICB9LFxuICAgIGdldEljb25OYW1lIChwcm9wczogSXRlbVNsb3RQcm9wcyk6IHN0cmluZyB7XG4gICAgICBjb25zdCBpc0Z1bGwgPSB0aGlzLmlzSG92ZXJpbmcgPyBwcm9wcy5pc0hvdmVyZWQgOiBwcm9wcy5pc0ZpbGxlZFxuICAgICAgY29uc3QgaXNIYWxmID0gdGhpcy5pc0hvdmVyaW5nID8gcHJvcHMuaXNIYWxmSG92ZXJlZCA6IHByb3BzLmlzSGFsZkZpbGxlZFxuXG4gICAgICByZXR1cm4gaXNGdWxsID8gdGhpcy5mdWxsSWNvbiA6IGlzSGFsZiA/IHRoaXMuaGFsZkljb24gOiB0aGlzLmVtcHR5SWNvblxuICAgIH0sXG4gICAgZ2V0Q29sb3IgKHByb3BzOiBJdGVtU2xvdFByb3BzKTogc3RyaW5nIHtcbiAgICAgIGlmICh0aGlzLmlzSG92ZXJpbmcpIHtcbiAgICAgICAgaWYgKHByb3BzLmlzSG92ZXJlZCB8fCBwcm9wcy5pc0hhbGZIb3ZlcmVkKSByZXR1cm4gdGhpcy5jb2xvclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHByb3BzLmlzRmlsbGVkIHx8IHByb3BzLmlzSGFsZkZpbGxlZCkgcmV0dXJuIHRoaXMuY29sb3JcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuYmFja2dyb3VuZENvbG9yXG4gICAgfSxcbiAgICBpc0hhbGZFdmVudCAoZTogTW91c2VFdmVudCk6IGJvb2xlYW4ge1xuICAgICAgaWYgKHRoaXMuaGFsZkluY3JlbWVudHMpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IGUudGFyZ2V0ICYmIChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgaWYgKHJlY3QgJiYgZS5vZmZzZXRYIDwgcmVjdC53aWR0aCAvIDIpIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0sXG4gICAgb25Nb3VzZUVudGVyIChlOiBNb3VzZUV2ZW50LCBpOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIHRoaXMucnVuRGVsYXkoJ29wZW4nLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuaG92ZXJJbmRleCA9IHRoaXMuZ2VuSG92ZXJJbmRleChlLCBpKVxuICAgICAgfSlcbiAgICB9LFxuICAgIG9uTW91c2VMZWF2ZSAoKTogdm9pZCB7XG4gICAgICB0aGlzLnJ1bkRlbGF5KCdjbG9zZScsICgpID0+ICh0aGlzLmhvdmVySW5kZXggPSAtMSkpXG4gICAgfSxcbiAgICBnZW5JdGVtIChpOiBudW1iZXIpOiBWTm9kZSB8IFZOb2RlQ2hpbGRyZW5BcnJheUNvbnRlbnRzIHwgc3RyaW5nIHtcbiAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5jcmVhdGVQcm9wcyhpKVxuXG4gICAgICBpZiAodGhpcy4kc2NvcGVkU2xvdHMuaXRlbSkgcmV0dXJuIHRoaXMuJHNjb3BlZFNsb3RzLml0ZW0ocHJvcHMpXG5cbiAgICAgIGNvbnN0IGxpc3RlbmVyczogUmVjb3JkPHN0cmluZywgRnVuY3Rpb24+PSB7XG4gICAgICAgIGNsaWNrOiBwcm9wcy5jbGlja1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5ob3Zlcikge1xuICAgICAgICBsaXN0ZW5lcnMubW91c2VlbnRlciA9IChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2VFbnRlcihlLCBpKVxuICAgICAgICBsaXN0ZW5lcnMubW91c2VsZWF2ZSA9IHRoaXMub25Nb3VzZUxlYXZlXG5cbiAgICAgICAgaWYgKHRoaXMuaGFsZkluY3JlbWVudHMpIHtcbiAgICAgICAgICBsaXN0ZW5lcnMubW91c2Vtb3ZlID0gKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZUVudGVyKGUsIGkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkljb24sIHtcbiAgICAgICAgZGlyZWN0aXZlczogdGhpcy5kaXJlY3RpdmVzLFxuICAgICAgICBwcm9wczogdGhpcy5pY29uUHJvcHMsXG4gICAgICAgIGNsYXNzOiB0aGlzLmFkZFRleHRDb2xvckNsYXNzQ2hlY2tzKHt9LCB0aGlzLmdldENvbG9yKHByb3BzKSksXG4gICAgICAgIG9uOiBsaXN0ZW5lcnNcbiAgICAgIH0sIFt0aGlzLmdldEljb25OYW1lKHByb3BzKV0pXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGNyZWF0ZVJhbmdlKE51bWJlcih0aGlzLmxlbmd0aCkpLm1hcChpID0+IHRoaXMuZ2VuSXRlbShpKSlcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtcmF0aW5nJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICd2LXJhdGluZy0tcmVhZG9ubHknOiB0aGlzLnJlYWRvbmx5XG4gICAgICB9XG4gICAgfSwgY2hpbGRyZW4pXG4gIH1cbn0pXG4iXX0=