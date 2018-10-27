import { addOnceEventListener } from '../../util/helpers';
export default function (expandedParentClass = '') {
    return {
        enter(el, done) {
            el._parent = el.parentNode;
            addOnceEventListener(el, 'transitionend', done);
            // Get height that is to be scrolled
            el.style.overflow = 'hidden';
            el.style.height = 0;
            el.style.display = 'block';
            expandedParentClass && el._parent.classList.add(expandedParentClass);
            setTimeout(() => {
                el.style.height = !el.scrollHeight
                    ? 'auto'
                    : `${el.scrollHeight}px`;
            }, 100);
        },
        afterEnter(el) {
            el.style.overflow = null;
            el.style.height = null;
        },
        leave(el, done) {
            // Remove initial transition
            addOnceEventListener(el, 'transitionend', done);
            // Set height before we transition to 0
            el.style.overflow = 'hidden';
            el.style.height = `${el.scrollHeight}px`;
            setTimeout(() => (el.style.height = 0), 100);
        },
        afterLeave(el) {
            expandedParentClass && el._parent && el._parent.classList.remove(expandedParentClass);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLXRyYW5zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy90cmFuc2l0aW9ucy9leHBhbmQtdHJhbnNpdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUV6RCxNQUFNLENBQUMsT0FBTyxXQUFXLG1CQUFtQixHQUFHLEVBQUU7SUFDL0MsT0FBTztRQUNMLEtBQUssQ0FBRSxFQUFFLEVBQUUsSUFBSTtZQUNiLEVBQUUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQTtZQUUxQixvQkFBb0IsQ0FBQyxFQUFFLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBRS9DLG9DQUFvQztZQUNwQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7WUFDNUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtZQUMxQixtQkFBbUIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtZQUVwRSxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVk7b0JBQ2hDLENBQUMsQ0FBQyxNQUFNO29CQUNSLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLElBQUksQ0FBQTtZQUM1QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDVCxDQUFDO1FBRUQsVUFBVSxDQUFFLEVBQUU7WUFDWixFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7WUFDeEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBQ3hCLENBQUM7UUFFRCxLQUFLLENBQUUsRUFBRSxFQUFFLElBQUk7WUFDYiw0QkFBNEI7WUFDNUIsb0JBQW9CLENBQUMsRUFBRSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUUvQyx1Q0FBdUM7WUFDdkMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1lBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLFlBQVksSUFBSSxDQUFBO1lBRXhDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQzlDLENBQUM7UUFFRCxVQUFVLENBQUUsRUFBRTtZQUNaLG1CQUFtQixJQUFJLEVBQUUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDdkYsQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWRkT25jZUV2ZW50TGlzdGVuZXIgfSBmcm9tICcuLi8uLi91dGlsL2hlbHBlcnMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChleHBhbmRlZFBhcmVudENsYXNzID0gJycpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnRlciAoZWwsIGRvbmUpIHtcbiAgICAgIGVsLl9wYXJlbnQgPSBlbC5wYXJlbnROb2RlXG5cbiAgICAgIGFkZE9uY2VFdmVudExpc3RlbmVyKGVsLCAndHJhbnNpdGlvbmVuZCcsIGRvbmUpXG5cbiAgICAgIC8vIEdldCBoZWlnaHQgdGhhdCBpcyB0byBiZSBzY3JvbGxlZFxuICAgICAgZWwuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gMFxuICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgIGV4cGFuZGVkUGFyZW50Q2xhc3MgJiYgZWwuX3BhcmVudC5jbGFzc0xpc3QuYWRkKGV4cGFuZGVkUGFyZW50Q2xhc3MpXG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAhZWwuc2Nyb2xsSGVpZ2h0XG4gICAgICAgICAgPyAnYXV0bydcbiAgICAgICAgICA6IGAke2VsLnNjcm9sbEhlaWdodH1weGBcbiAgICAgIH0sIDEwMClcbiAgICB9LFxuXG4gICAgYWZ0ZXJFbnRlciAoZWwpIHtcbiAgICAgIGVsLnN0eWxlLm92ZXJmbG93ID0gbnVsbFxuICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gbnVsbFxuICAgIH0sXG5cbiAgICBsZWF2ZSAoZWwsIGRvbmUpIHtcbiAgICAgIC8vIFJlbW92ZSBpbml0aWFsIHRyYW5zaXRpb25cbiAgICAgIGFkZE9uY2VFdmVudExpc3RlbmVyKGVsLCAndHJhbnNpdGlvbmVuZCcsIGRvbmUpXG5cbiAgICAgIC8vIFNldCBoZWlnaHQgYmVmb3JlIHdlIHRyYW5zaXRpb24gdG8gMFxuICAgICAgZWwuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7ZWwuc2Nyb2xsSGVpZ2h0fXB4YFxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IChlbC5zdHlsZS5oZWlnaHQgPSAwKSwgMTAwKVxuICAgIH0sXG5cbiAgICBhZnRlckxlYXZlIChlbCkge1xuICAgICAgZXhwYW5kZWRQYXJlbnRDbGFzcyAmJiBlbC5fcGFyZW50ICYmIGVsLl9wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZShleHBhbmRlZFBhcmVudENsYXNzKVxuICAgIH1cbiAgfVxufVxuIl19