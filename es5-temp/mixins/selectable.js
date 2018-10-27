// Components
import VInput from '../components/VInput';
// Mixins
import Rippleable from './rippleable';
import Comparable from './comparable';
// Utils
import { keyCodes } from '../util/helpers';
/* @vue/component */
export default {
    name: 'selectable',
    extends: VInput,
    mixins: [Rippleable, Comparable],
    model: {
        prop: 'inputValue',
        event: 'change'
    },
    props: {
        color: {
            type: String,
            default: 'accent'
        },
        id: String,
        inputValue: null,
        falseValue: null,
        trueValue: null,
        multiple: {
            type: Boolean,
            default: null
        },
        label: String,
        toggleKeys: {
            type: Array,
            default: () => [keyCodes.enter, keyCodes.space]
        }
    },
    data: vm => ({
        lazyValue: vm.inputValue
    }),
    computed: {
        classesSelectable() {
            return this.addTextColorClassChecks({}, this.isDirty ? this.color : this.validationState);
        },
        isMultiple() {
            return this.multiple === true || (this.multiple === null && Array.isArray(this.internalValue));
        },
        isActive() {
            const value = this.value;
            const input = this.internalValue;
            if (this.isMultiple) {
                if (!Array.isArray(input))
                    return false;
                return input.some(item => this.valueComparator(item, value));
            }
            if (this.trueValue === undefined || this.falseValue === undefined) {
                return value
                    ? this.valueComparator(value, input)
                    : Boolean(input);
            }
            return this.valueComparator(input, this.trueValue);
        },
        isDisabled() {
            return this.disabled;
        },
        isDirty() {
            return this.isActive;
        }
    },
    watch: {
        inputValue(val) {
            this.lazyValue = val;
        }
    },
    methods: {
        genLabel() {
            if (!this.hasLabel)
                return null;
            const label = VInput.methods.genLabel.call(this);
            label.data.on = { click: this.onChange };
            return label;
        },
        genInput(type, attrs) {
            return this.$createElement('input', {
                attrs: Object.assign({
                    'aria-label': this.label,
                    'aria-checked': this.isActive.toString(),
                    disabled: this.isDisabled,
                    id: this.id,
                    role: type,
                    type,
                    value: this.inputValue
                }, attrs),
                domProps: {
                    checked: this.isActive
                },
                on: {
                    blur: this.onBlur,
                    change: this.onChange,
                    focus: this.onFocus,
                    keydown: this.onKeydown
                },
                ref: 'input'
            });
        },
        onBlur() {
            this.isFocused = false;
        },
        onChange() {
            if (this.isDisabled)
                return;
            const value = this.value;
            let input = this.internalValue;
            if (this.isMultiple) {
                if (!Array.isArray(input)) {
                    input = [];
                }
                const length = input.length;
                input = input.filter(item => !this.valueComparator(item, value));
                if (input.length === length) {
                    input.push(value);
                }
            }
            else if (this.trueValue !== undefined && this.falseValue !== undefined) {
                input = this.valueComparator(input, this.trueValue) ? this.falseValue : this.trueValue;
            }
            else if (value) {
                input = this.valueComparator(input, value) ? null : value;
            }
            else {
                input = !input;
            }
            this.validate(true, input);
            this.lazyValue = input;
            this.$emit('change', input);
        },
        onFocus() {
            this.isFocused = true;
        },
        onKeydown(e) {
            // Overwrite default behavior to only allow
            // the specified keyCodes
            if (this.toggleKeys.indexOf(e.keyCode) > -1) {
                e.preventDefault();
                this.onChange();
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taXhpbnMvc2VsZWN0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxhQUFhO0FBQ2IsT0FBTyxNQUFNLE1BQU0sc0JBQXNCLENBQUE7QUFFekMsU0FBUztBQUNULE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQTtBQUNyQyxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUE7QUFFckMsUUFBUTtBQUNSLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUUxQyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxZQUFZO0lBRWxCLE9BQU8sRUFBRSxNQUFNO0lBRWYsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztJQUVoQyxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsWUFBWTtRQUNsQixLQUFLLEVBQUUsUUFBUTtLQUNoQjtJQUVELEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxFQUFFLEVBQUUsTUFBTTtRQUNWLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFNBQVMsRUFBRSxJQUFJO1FBQ2YsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsS0FBSyxFQUFFLE1BQU07UUFDYixVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsS0FBSztZQUNYLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQztTQUNoRDtLQUNGO0lBRUQsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNYLFNBQVMsRUFBRSxFQUFFLENBQUMsVUFBVTtLQUN6QixDQUFDO0lBRUYs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LEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO2FBQzFEO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQTthQUNmO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUE7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDN0IsQ0FBQztRQUNELE9BQU87WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtRQUN2QixDQUFDO1FBQ0QsU0FBUyxDQUFFLENBQUM7WUFDViwyQ0FBMkM7WUFDM0MseUJBQXlCO1lBQ3pCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUMzQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7Z0JBRWxCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTthQUNoQjtRQUNILENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb21wb25lbnRzXG5pbXBvcnQgVklucHV0IGZyb20gJy4uL2NvbXBvbmVudHMvVklucHV0J1xuXG4vLyBNaXhpbnNcbmltcG9ydCBSaXBwbGVhYmxlIGZyb20gJy4vcmlwcGxlYWJsZSdcbmltcG9ydCBDb21wYXJhYmxlIGZyb20gJy4vY29tcGFyYWJsZSdcblxuLy8gVXRpbHNcbmltcG9ydCB7IGtleUNvZGVzIH0gZnJvbSAnLi4vdXRpbC9oZWxwZXJzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc2VsZWN0YWJsZScsXG5cbiAgZXh0ZW5kczogVklucHV0LFxuXG4gIG1peGluczogW1JpcHBsZWFibGUsIENvbXBhcmFibGVdLFxuXG4gIG1vZGVsOiB7XG4gICAgcHJvcDogJ2lucHV0VmFsdWUnLFxuICAgIGV2ZW50OiAnY2hhbmdlJ1xuICB9LFxuXG4gIHByb3BzOiB7XG4gICAgY29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdhY2NlbnQnXG4gICAgfSxcbiAgICBpZDogU3RyaW5nLFxuICAgIGlucHV0VmFsdWU6IG51bGwsXG4gICAgZmFsc2VWYWx1ZTogbnVsbCxcbiAgICB0cnVlVmFsdWU6IG51bGwsXG4gICAgbXVsdGlwbGU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIHRvZ2dsZUtleXM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gW2tleUNvZGVzLmVudGVyLCBrZXlDb2Rlcy5zcGFjZV1cbiAgICB9XG4gIH0sXG5cbiAgZGF0YTogdm0gPT4gKHtcbiAgICBsYXp5VmFsdWU6IHZtLmlucHV0VmFsdWVcbiAgfSksXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzU2VsZWN0YWJsZSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRUZXh0Q29sb3JDbGFzc0NoZWNrcyhcbiAgICAgICAge30sXG4gICAgICAgIHRoaXMuaXNEaXJ0eSA/IHRoaXMuY29sb3IgOiB0aGlzLnZhbGlkYXRpb25TdGF0ZVxuICAgICAgKVxuICAgIH0sXG4gICAgaXNNdWx0aXBsZSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA9PT0gdHJ1ZSB8fCAodGhpcy5tdWx0aXBsZSA9PT0gbnVsbCAmJiBBcnJheS5pc0FycmF5KHRoaXMuaW50ZXJuYWxWYWx1ZSkpXG4gICAgfSxcbiAgICBpc0FjdGl2ZSAoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWVcbiAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5pbnRlcm5hbFZhbHVlXG5cbiAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGUpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGlucHV0KSkgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgcmV0dXJuIGlucHV0LnNvbWUoaXRlbSA9PiB0aGlzLnZhbHVlQ29tcGFyYXRvcihpdGVtLCB2YWx1ZSkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnRydWVWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuZmFsc2VWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgID8gdGhpcy52YWx1ZUNvbXBhcmF0b3IodmFsdWUsIGlucHV0KVxuICAgICAgICAgIDogQm9vbGVhbihpbnB1dClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVDb21wYXJhdG9yKGlucHV0LCB0aGlzLnRydWVWYWx1ZSlcbiAgICB9LFxuICAgIGlzRGlzYWJsZWQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRcbiAgICB9LFxuICAgIGlzRGlydHkgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmVcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBpbnB1dFZhbHVlICh2YWwpIHtcbiAgICAgIHRoaXMubGF6eVZhbHVlID0gdmFsXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZW5MYWJlbCAoKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzTGFiZWwpIHJldHVybiBudWxsXG5cbiAgICAgIGNvbnN0IGxhYmVsID0gVklucHV0Lm1ldGhvZHMuZ2VuTGFiZWwuY2FsbCh0aGlzKVxuXG4gICAgICBsYWJlbC5kYXRhLm9uID0geyBjbGljazogdGhpcy5vbkNoYW5nZSB9XG5cbiAgICAgIHJldHVybiBsYWJlbFxuICAgIH0sXG4gICAgZ2VuSW5wdXQgKHR5cGUsIGF0dHJzKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XG4gICAgICAgIGF0dHJzOiBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAnYXJpYS1sYWJlbCc6IHRoaXMubGFiZWwsXG4gICAgICAgICAgJ2FyaWEtY2hlY2tlZCc6IHRoaXMuaXNBY3RpdmUudG9TdHJpbmcoKSxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5pc0Rpc2FibGVkLFxuICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgIHJvbGU6IHR5cGUsXG4gICAgICAgICAgdHlwZSxcbiAgICAgICAgICB2YWx1ZTogdGhpcy5pbnB1dFZhbHVlXG4gICAgICAgIH0sIGF0dHJzKSxcbiAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICBjaGVja2VkOiB0aGlzLmlzQWN0aXZlXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgYmx1cjogdGhpcy5vbkJsdXIsXG4gICAgICAgICAgY2hhbmdlOiB0aGlzLm9uQ2hhbmdlLFxuICAgICAgICAgIGZvY3VzOiB0aGlzLm9uRm9jdXMsXG4gICAgICAgICAga2V5ZG93bjogdGhpcy5vbktleWRvd25cbiAgICAgICAgfSxcbiAgICAgICAgcmVmOiAnaW5wdXQnXG4gICAgICB9KVxuICAgIH0sXG4gICAgb25CbHVyICgpIHtcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2VcbiAgICB9LFxuICAgIG9uQ2hhbmdlICgpIHtcbiAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHJldHVyblxuXG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWVcbiAgICAgIGxldCBpbnB1dCA9IHRoaXMuaW50ZXJuYWxWYWx1ZVxuXG4gICAgICBpZiAodGhpcy5pc011bHRpcGxlKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgICAgICBpbnB1dCA9IFtdXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsZW5ndGggPSBpbnB1dC5sZW5ndGhcblxuICAgICAgICBpbnB1dCA9IGlucHV0LmZpbHRlcihpdGVtID0+ICF0aGlzLnZhbHVlQ29tcGFyYXRvcihpdGVtLCB2YWx1ZSkpXG5cbiAgICAgICAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgaW5wdXQucHVzaCh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRydWVWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuZmFsc2VWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlucHV0ID0gdGhpcy52YWx1ZUNvbXBhcmF0b3IoaW5wdXQsIHRoaXMudHJ1ZVZhbHVlKSA/IHRoaXMuZmFsc2VWYWx1ZSA6IHRoaXMudHJ1ZVZhbHVlXG4gICAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgIGlucHV0ID0gdGhpcy52YWx1ZUNvbXBhcmF0b3IoaW5wdXQsIHZhbHVlKSA/IG51bGwgOiB2YWx1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXQgPSAhaW5wdXRcbiAgICAgIH1cblxuICAgICAgdGhpcy52YWxpZGF0ZSh0cnVlLCBpbnB1dClcbiAgICAgIHRoaXMubGF6eVZhbHVlID0gaW5wdXRcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGlucHV0KVxuICAgIH0sXG4gICAgb25Gb2N1cyAoKSB7XG4gICAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWVcbiAgICB9LFxuICAgIG9uS2V5ZG93biAoZSkge1xuICAgICAgLy8gT3ZlcndyaXRlIGRlZmF1bHQgYmVoYXZpb3IgdG8gb25seSBhbGxvd1xuICAgICAgLy8gdGhlIHNwZWNpZmllZCBrZXlDb2Rlc1xuICAgICAgaWYgKHRoaXMudG9nZ2xlS2V5cy5pbmRleE9mKGUua2V5Q29kZSkgPiAtMSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlKClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==