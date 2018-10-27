import VTextField from './VTextField';
import VTextarea from '../VTextarea/VTextarea';
import rebuildSlots from '../../util/rebuildFunctionalSlots';
import { deprecate } from '../../util/console';
// TODO: remove this in v2.0
/* @vue/component */
const wrapper = {
    functional: true,
    $_wrapperFor: VTextField,
    props: {
        textarea: Boolean,
        multiLine: Boolean
    },
    render(h, { props, data, slots, parent }) {
        delete data.model;
        const children = rebuildSlots(slots(), h);
        if (props.textarea) {
            deprecate('<v-text-field textarea>', '<v-textarea outline>', wrapper, parent);
        }
        if (props.multiLine) {
            deprecate('<v-text-field multi-line>', '<v-textarea>', wrapper, parent);
        }
        if (props.textarea || props.multiLine) {
            data.attrs.outline = props.textarea;
            return h(VTextarea, data, children);
        }
        else {
            return h(VTextField, data, children);
        }
    }
};
export { wrapper as VTextField };
export default wrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WVGV4dEZpZWxkL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQTtBQUNyQyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFlBQVksTUFBTSxtQ0FBbUMsQ0FBQTtBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFOUMsNEJBQTRCO0FBQzVCLG9CQUFvQjtBQUNwQixNQUFNLE9BQU8sR0FBRztJQUNkLFVBQVUsRUFBRSxJQUFJO0lBRWhCLFlBQVksRUFBRSxVQUFVO0lBRXhCLEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFNBQVMsRUFBRSxPQUFPO0tBQ25CO0lBRUQsTUFBTSxDQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtRQUN2QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDakIsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBRXpDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNsQixTQUFTLENBQUMseUJBQXlCLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQzlFO1FBRUQsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ25CLFNBQVMsQ0FBQywyQkFBMkIsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ3hFO1FBRUQsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQTtZQUNuQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1NBQ3BDO2FBQU07WUFDTCxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1NBQ3JDO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFFRCxPQUFPLEVBQUUsT0FBTyxJQUFJLFVBQVUsRUFBRSxDQUFBO0FBQ2hDLGVBQWUsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZUZXh0RmllbGQgZnJvbSAnLi9WVGV4dEZpZWxkJ1xuaW1wb3J0IFZUZXh0YXJlYSBmcm9tICcuLi9WVGV4dGFyZWEvVlRleHRhcmVhJ1xuaW1wb3J0IHJlYnVpbGRTbG90cyBmcm9tICcuLi8uLi91dGlsL3JlYnVpbGRGdW5jdGlvbmFsU2xvdHMnXG5pbXBvcnQgeyBkZXByZWNhdGUgfSBmcm9tICcuLi8uLi91dGlsL2NvbnNvbGUnXG5cbi8vIFRPRE86IHJlbW92ZSB0aGlzIGluIHYyLjBcbi8qIEB2dWUvY29tcG9uZW50ICovXG5jb25zdCB3cmFwcGVyID0ge1xuICBmdW5jdGlvbmFsOiB0cnVlLFxuXG4gICRfd3JhcHBlckZvcjogVlRleHRGaWVsZCxcblxuICBwcm9wczoge1xuICAgIHRleHRhcmVhOiBCb29sZWFuLFxuICAgIG11bHRpTGluZTogQm9vbGVhblxuICB9LFxuXG4gIHJlbmRlciAoaCwgeyBwcm9wcywgZGF0YSwgc2xvdHMsIHBhcmVudCB9KSB7XG4gICAgZGVsZXRlIGRhdGEubW9kZWxcbiAgICBjb25zdCBjaGlsZHJlbiA9IHJlYnVpbGRTbG90cyhzbG90cygpLCBoKVxuXG4gICAgaWYgKHByb3BzLnRleHRhcmVhKSB7XG4gICAgICBkZXByZWNhdGUoJzx2LXRleHQtZmllbGQgdGV4dGFyZWE+JywgJzx2LXRleHRhcmVhIG91dGxpbmU+Jywgd3JhcHBlciwgcGFyZW50KVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5tdWx0aUxpbmUpIHtcbiAgICAgIGRlcHJlY2F0ZSgnPHYtdGV4dC1maWVsZCBtdWx0aS1saW5lPicsICc8di10ZXh0YXJlYT4nLCB3cmFwcGVyLCBwYXJlbnQpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLnRleHRhcmVhIHx8IHByb3BzLm11bHRpTGluZSkge1xuICAgICAgZGF0YS5hdHRycy5vdXRsaW5lID0gcHJvcHMudGV4dGFyZWFcbiAgICAgIHJldHVybiBoKFZUZXh0YXJlYSwgZGF0YSwgY2hpbGRyZW4pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBoKFZUZXh0RmllbGQsIGRhdGEsIGNoaWxkcmVuKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyB3cmFwcGVyIGFzIFZUZXh0RmllbGQgfVxuZXhwb3J0IGRlZmF1bHQgd3JhcHBlclxuIl19