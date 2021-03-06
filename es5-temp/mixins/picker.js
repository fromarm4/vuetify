// Components
import VPicker from '../components/VPicker';
// Mixins
import Colorable from './colorable';
import Themeable from './themeable';
/* @vue/component */
export default {
    name: 'picker',
    mixins: [
        Colorable,
        Themeable
    ],
    props: {
        fullWidth: Boolean,
        headerColor: String,
        landscape: Boolean,
        noTitle: Boolean,
        width: {
            type: [Number, String],
            default: 290,
            validator: value => parseInt(value, 10) > 0
        }
    },
    methods: {
        genPickerTitle() { },
        genPickerBody() { },
        genPickerActionsSlot() {
            return this.$scopedSlots.default ? this.$scopedSlots.default({
                save: this.save,
                cancel: this.cancel
            }) : this.$slots.default;
        },
        genPicker(staticClass) {
            return this.$createElement(VPicker, {
                staticClass,
                class: this.fullWidth ? ['v-picker--full-width'] : [],
                props: {
                    color: this.headerColor || this.color,
                    dark: this.dark,
                    fullWidth: this.fullWidth,
                    landscape: this.landscape,
                    light: this.light,
                    width: this.width
                }
            }, [
                this.noTitle ? null : this.genPickerTitle(),
                this.genPickerBody(),
                this.$createElement('template', { slot: 'actions' }, [this.genPickerActionsSlot()])
            ]);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9waWNrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsYUFBYTtBQUNiLE9BQU8sT0FBTyxNQUFNLHVCQUF1QixDQUFBO0FBRTNDLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSxhQUFhLENBQUE7QUFDbkMsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFBO0FBRW5DLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLFFBQVE7SUFFZCxNQUFNLEVBQUU7UUFDTixTQUFTO1FBQ1QsU0FBUztLQUNWO0lBRUQsS0FBSyxFQUFFO1FBQ0wsU0FBUyxFQUFFLE9BQU87UUFDbEIsV0FBVyxFQUFFLE1BQU07UUFDbkIsU0FBUyxFQUFFLE9BQU87UUFDbEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsR0FBRztZQUNaLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUM1QztLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1AsY0FBYyxLQUFLLENBQUM7UUFDcEIsYUFBYSxLQUFLLENBQUM7UUFDbkIsb0JBQW9CO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO2dCQUMzRCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUE7UUFDMUIsQ0FBQztRQUNELFNBQVMsQ0FBRSxXQUFXO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xDLFdBQVc7Z0JBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDckQsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxLQUFLO29CQUNyQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO29CQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7b0JBQ3pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUNsQjthQUNGLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUMzQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7YUFDcEYsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvbXBvbmVudHNcbmltcG9ydCBWUGlja2VyIGZyb20gJy4uL2NvbXBvbmVudHMvVlBpY2tlcidcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4vY29sb3JhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuL3RoZW1lYWJsZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3BpY2tlcicsXG5cbiAgbWl4aW5zOiBbXG4gICAgQ29sb3JhYmxlLFxuICAgIFRoZW1lYWJsZVxuICBdLFxuXG4gIHByb3BzOiB7XG4gICAgZnVsbFdpZHRoOiBCb29sZWFuLFxuICAgIGhlYWRlckNvbG9yOiBTdHJpbmcsXG4gICAgbGFuZHNjYXBlOiBCb29sZWFuLFxuICAgIG5vVGl0bGU6IEJvb2xlYW4sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAyOTAsXG4gICAgICB2YWxpZGF0b3I6IHZhbHVlID0+IHBhcnNlSW50KHZhbHVlLCAxMCkgPiAwXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZW5QaWNrZXJUaXRsZSAoKSB7fSxcbiAgICBnZW5QaWNrZXJCb2R5ICgpIHt9LFxuICAgIGdlblBpY2tlckFjdGlvbnNTbG90ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ID8gdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCh7XG4gICAgICAgIHNhdmU6IHRoaXMuc2F2ZSxcbiAgICAgICAgY2FuY2VsOiB0aGlzLmNhbmNlbFxuICAgICAgfSkgOiB0aGlzLiRzbG90cy5kZWZhdWx0XG4gICAgfSxcbiAgICBnZW5QaWNrZXIgKHN0YXRpY0NsYXNzKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWUGlja2VyLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzLFxuICAgICAgICBjbGFzczogdGhpcy5mdWxsV2lkdGggPyBbJ3YtcGlja2VyLS1mdWxsLXdpZHRoJ10gOiBbXSxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xvcjogdGhpcy5oZWFkZXJDb2xvciB8fCB0aGlzLmNvbG9yLFxuICAgICAgICAgIGRhcms6IHRoaXMuZGFyayxcbiAgICAgICAgICBmdWxsV2lkdGg6IHRoaXMuZnVsbFdpZHRoLFxuICAgICAgICAgIGxhbmRzY2FwZTogdGhpcy5sYW5kc2NhcGUsXG4gICAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHQsXG4gICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGhcbiAgICAgICAgfVxuICAgICAgfSwgW1xuICAgICAgICB0aGlzLm5vVGl0bGUgPyBudWxsIDogdGhpcy5nZW5QaWNrZXJUaXRsZSgpLFxuICAgICAgICB0aGlzLmdlblBpY2tlckJvZHkoKSxcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnLCB7IHNsb3Q6ICdhY3Rpb25zJyB9LCBbdGhpcy5nZW5QaWNrZXJBY3Rpb25zU2xvdCgpXSlcbiAgICAgIF0pXG4gICAgfVxuICB9XG59XG4iXX0=