// Styles
import '../../stylus/components/_forms.styl';
import { provide as RegistrableProvide } from '../../mixins/registrable';
/* @vue/component */
export default {
    name: 'v-form',
    mixins: [RegistrableProvide('form')],
    inheritAttrs: false,
    props: {
        value: Boolean,
        lazyValidation: Boolean
    },
    data() {
        return {
            inputs: [],
            watchers: [],
            errorBag: {}
        };
    },
    watch: {
        errorBag: {
            handler() {
                const errors = Object.values(this.errorBag).includes(true);
                this.$emit('input', !errors);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        watchInput(input) {
            const watcher = input => {
                return input.$watch('hasError', val => {
                    this.$set(this.errorBag, input._uid, val);
                }, { immediate: true });
            };
            const watchers = {
                _uid: input._uid,
                valid: undefined,
                shouldValidate: undefined
            };
            if (this.lazyValidation) {
                // Only start watching inputs if we need to
                watchers.shouldValidate = input.$watch('shouldValidate', val => {
                    if (!val)
                        return;
                    // Only watch if we're not already doing it
                    if (this.errorBag.hasOwnProperty(input._uid))
                        return;
                    watchers.valid = watcher(input);
                });
            }
            else {
                watchers.valid = watcher(input);
            }
            return watchers;
        },
        /** @public */
        validate() {
            const errors = this.inputs.filter(input => !input.validate(true)).length;
            return !errors;
        },
        /** @public */
        reset() {
            for (let i = this.inputs.length; i--;) {
                this.inputs[i].reset();
            }
            if (this.lazyValidation) {
                // Account for timeout in validatable
                setTimeout(() => {
                    this.errorBag = {};
                }, 0);
            }
        },
        /** @public */
        resetValidation() {
            for (let i = this.inputs.length; i--;) {
                this.inputs[i].resetValidation();
            }
            if (this.lazyValidation) {
                // Account for timeout in validatable
                setTimeout(() => {
                    this.errorBag = {};
                }, 0);
            }
        },
        register(input) {
            const unwatch = this.watchInput(input);
            this.inputs.push(input);
            this.watchers.push(unwatch);
        },
        unregister(input) {
            const found = this.inputs.find(i => i._uid === input._uid);
            if (!found)
                return;
            const unwatch = this.watchers.find(i => i._uid === found._uid);
            unwatch.valid && unwatch.valid();
            unwatch.shouldValidate && unwatch.shouldValidate();
            this.watchers = this.watchers.filter(i => i._uid !== found._uid);
            this.inputs = this.inputs.filter(i => i._uid !== found._uid);
            this.$delete(this.errorBag, found._uid);
        }
    },
    render(h) {
        return h('form', {
            staticClass: 'v-form',
            attrs: Object.assign({
                novalidate: true
            }, this.$attrs),
            on: {
                submit: e => this.$emit('submit', e)
            }
        }, this.$slots.default);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WRm9ybS9WRm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxxQ0FBcUMsQ0FBQTtBQUU1QyxPQUFPLEVBQUUsT0FBTyxJQUFJLGtCQUFrQixFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFFeEUsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUVkLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXBDLFlBQVksRUFBRSxLQUFLO0lBRW5CLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxPQUFPO1FBQ2QsY0FBYyxFQUFFLE9BQU87S0FDeEI7SUFFRCxJQUFJO1FBQ0YsT0FBTztZQUNMLE1BQU0sRUFBRSxFQUFFO1lBQ1YsUUFBUSxFQUFFLEVBQUU7WUFDWixRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUE7SUFDSCxDQUFDO0lBRUQsS0FBSyxFQUFFO1FBQ0wsUUFBUSxFQUFFO1lBQ1IsT0FBTztnQkFDTCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDOUIsQ0FBQztZQUNELElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLElBQUk7U0FDaEI7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLFVBQVUsQ0FBRSxLQUFLO1lBQ2YsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RCLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFB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Y29tcG9uZW50cy9fZm9ybXMuc3R5bCdcblxuaW1wb3J0IHsgcHJvdmlkZSBhcyBSZWdpc3RyYWJsZVByb3ZpZGUgfSBmcm9tICcuLi8uLi9taXhpbnMvcmVnaXN0cmFibGUnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LWZvcm0nLFxuXG4gIG1peGluczogW1JlZ2lzdHJhYmxlUHJvdmlkZSgnZm9ybScpXSxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IEJvb2xlYW4sXG4gICAgbGF6eVZhbGlkYXRpb246IEJvb2xlYW5cbiAgfSxcblxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5wdXRzOiBbXSxcbiAgICAgIHdhdGNoZXJzOiBbXSxcbiAgICAgIGVycm9yQmFnOiB7fVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGVycm9yQmFnOiB7XG4gICAgICBoYW5kbGVyICgpIHtcbiAgICAgICAgY29uc3QgZXJyb3JzID0gT2JqZWN0LnZhbHVlcyh0aGlzLmVycm9yQmFnKS5pbmNsdWRlcyh0cnVlKVxuICAgICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsICFlcnJvcnMpXG4gICAgICB9LFxuICAgICAgZGVlcDogdHJ1ZSxcbiAgICAgIGltbWVkaWF0ZTogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgd2F0Y2hJbnB1dCAoaW5wdXQpIHtcbiAgICAgIGNvbnN0IHdhdGNoZXIgPSBpbnB1dCA9PiB7XG4gICAgICAgIHJldHVybiBpbnB1dC4kd2F0Y2goJ2hhc0Vycm9yJywgdmFsID0+IHtcbiAgICAgICAgICB0aGlzLiRzZXQodGhpcy5lcnJvckJhZywgaW5wdXQuX3VpZCwgdmFsKVxuICAgICAgICB9LCB7IGltbWVkaWF0ZTogdHJ1ZSB9KVxuICAgICAgfVxuXG4gICAgICBjb25zdCB3YXRjaGVycyA9IHtcbiAgICAgICAgX3VpZDogaW5wdXQuX3VpZCxcbiAgICAgICAgdmFsaWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgc2hvdWxkVmFsaWRhdGU6IHVuZGVmaW5lZFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5sYXp5VmFsaWRhdGlvbikge1xuICAgICAgICAvLyBPbmx5IHN0YXJ0IHdhdGNoaW5nIGlucHV0cyBpZiB3ZSBuZWVkIHRvXG4gICAgICAgIHdhdGNoZXJzLnNob3VsZFZhbGlkYXRlID0gaW5wdXQuJHdhdGNoKCdzaG91bGRWYWxpZGF0ZScsIHZhbCA9PiB7XG4gICAgICAgICAgaWYgKCF2YWwpIHJldHVyblxuXG4gICAgICAgICAgLy8gT25seSB3YXRjaCBpZiB3ZSdyZSBub3QgYWxyZWFkeSBkb2luZyBpdFxuICAgICAgICAgIGlmICh0aGlzLmVycm9yQmFnLmhhc093blByb3BlcnR5KGlucHV0Ll91aWQpKSByZXR1cm5cblxuICAgICAgICAgIHdhdGNoZXJzLnZhbGlkID0gd2F0Y2hlcihpbnB1dClcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhdGNoZXJzLnZhbGlkID0gd2F0Y2hlcihpbnB1dClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHdhdGNoZXJzXG4gICAgfSxcbiAgICAvKiogQHB1YmxpYyAqL1xuICAgIHZhbGlkYXRlICgpIHtcbiAgICAgIGNvbnN0IGVycm9ycyA9IHRoaXMuaW5wdXRzLmZpbHRlcihpbnB1dCA9PiAhaW5wdXQudmFsaWRhdGUodHJ1ZSkpLmxlbmd0aFxuICAgICAgcmV0dXJuICFlcnJvcnNcbiAgICB9LFxuICAgIC8qKiBAcHVibGljICovXG4gICAgcmVzZXQgKCkge1xuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaW5wdXRzLmxlbmd0aDsgaS0tOykge1xuICAgICAgICB0aGlzLmlucHV0c1tpXS5yZXNldCgpXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5sYXp5VmFsaWRhdGlvbikge1xuICAgICAgICAvLyBBY2NvdW50IGZvciB0aW1lb3V0IGluIHZhbGlkYXRhYmxlXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3JCYWcgPSB7fVxuICAgICAgICB9LCAwKVxuICAgICAgfVxuICAgIH0sXG4gICAgLyoqIEBwdWJsaWMgKi9cbiAgICByZXNldFZhbGlkYXRpb24gKCkge1xuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaW5wdXRzLmxlbmd0aDsgaS0tOykge1xuICAgICAgICB0aGlzLmlucHV0c1tpXS5yZXNldFZhbGlkYXRpb24oKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMubGF6eVZhbGlkYXRpb24pIHtcbiAgICAgICAgLy8gQWNjb3VudCBmb3IgdGltZW91dCBpbiB2YWxpZGF0YWJsZVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yQmFnID0ge31cbiAgICAgICAgfSwgMClcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlZ2lzdGVyIChpbnB1dCkge1xuICAgICAgY29uc3QgdW53YXRjaCA9IHRoaXMud2F0Y2hJbnB1dChpbnB1dClcbiAgICAgIHRoaXMuaW5wdXRzLnB1c2goaW5wdXQpXG4gICAgICB0aGlzLndhdGNoZXJzLnB1c2godW53YXRjaClcbiAgICB9LFxuICAgIHVucmVnaXN0ZXIgKGlucHV0KSB7XG4gICAgICBjb25zdCBmb3VuZCA9IHRoaXMuaW5wdXRzLmZpbmQoaSA9PiBpLl91aWQgPT09IGlucHV0Ll91aWQpXG5cbiAgICAgIGlmICghZm91bmQpIHJldHVyblxuXG4gICAgICBjb25zdCB1bndhdGNoID0gdGhpcy53YXRjaGVycy5maW5kKGkgPT4gaS5fdWlkID09PSBmb3VuZC5fdWlkKVxuICAgICAgdW53YXRjaC52YWxpZCAmJiB1bndhdGNoLnZhbGlkKClcbiAgICAgIHVud2F0Y2guc2hvdWxkVmFsaWRhdGUgJiYgdW53YXRjaC5zaG91bGRWYWxpZGF0ZSgpXG5cbiAgICAgIHRoaXMud2F0Y2hlcnMgPSB0aGlzLndhdGNoZXJzLmZpbHRlcihpID0+IGkuX3VpZCAhPT0gZm91bmQuX3VpZClcbiAgICAgIHRoaXMuaW5wdXRzID0gdGhpcy5pbnB1dHMuZmlsdGVyKGkgPT4gaS5fdWlkICE9PSBmb3VuZC5fdWlkKVxuICAgICAgdGhpcy4kZGVsZXRlKHRoaXMuZXJyb3JCYWcsIGZvdW5kLl91aWQpXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIHJldHVybiBoKCdmb3JtJywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LWZvcm0nLFxuICAgICAgYXR0cnM6IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBub3ZhbGlkYXRlOiB0cnVlXG4gICAgICB9LCB0aGlzLiRhdHRycyksXG4gICAgICBvbjoge1xuICAgICAgICBzdWJtaXQ6IGUgPT4gdGhpcy4kZW1pdCgnc3VibWl0JywgZSlcbiAgICAgIH1cbiAgICB9LCB0aGlzLiRzbG90cy5kZWZhdWx0KVxuICB9XG59XG4iXX0=