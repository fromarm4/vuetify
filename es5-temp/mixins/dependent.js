function searchChildren(children) {
    const results = [];
    for (let index = 0; index < children.length; index++) {
        const child = children[index];
        if (child.isActive && child.isDependent) {
            results.push(child);
        }
        else {
            results.push(...searchChildren(child.$children));
        }
    }
    return results;
}
/* @vue/component */
export default {
    name: 'dependent',
    data() {
        return {
            closeDependents: true,
            isDependent: true
        };
    },
    watch: {
        isActive(val) {
            if (val)
                return;
            const openDependents = this.getOpenDependents();
            for (let index = 0; index < openDependents.length; index++) {
                openDependents[index].isActive = false;
            }
        }
    },
    methods: {
        getOpenDependents() {
            if (this.closeDependents)
                return searchChildren(this.$children);
            return [];
        },
        getOpenDependentElements() {
            const result = [];
            const openDependents = this.getOpenDependents();
            for (let index = 0; index < openDependents.length; index++) {
                result.push(...openDependents[index].getClickableDependentElements());
            }
            return result;
        },
        getClickableDependentElements() {
            const result = [this.$el];
            if (this.$refs.content)
                result.push(this.$refs.content);
            result.push(...this.getOpenDependentElements());
            return result;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9kZXBlbmRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxjQUFjLENBQUUsUUFBUTtJQUMvQixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFDbEIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDcEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzdCLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQ3ZDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDcEI7YUFBTTtZQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7U0FDakQ7S0FDRjtJQUVELE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUM7QUFFRCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxXQUFXO0lBRWpCLElBQUk7UUFDRixPQUFPO1lBQ0wsZUFBZSxFQUFFLElBQUk7WUFDckIsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQTtJQUNILENBQUM7SUFFRCxLQUFLLEVBQUU7UUFDTCxRQUFRLENBQUUsR0FBRztZQUNYLElBQUksR0FBRztnQkFBRSxPQUFNO1lBRWYsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUE7WUFDL0MsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQzFELGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO2FBQ3ZDO1FBQ0gsQ0FBQztLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1AsaUJBQWlCO1lBQ2YsSUFBSSxJQUFJLENBQUMsZUFBZTtnQkFBRSxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7WUFFL0QsT0FBTyxFQUFFLENBQUE7UUFDWCxDQUFDO1FBQ0Qsd0JBQXdCO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUNqQixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtZQUUvQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLENBQUE7YUFDdEU7WUFFRCxPQUFPLE1BQU0sQ0FBQTtRQUNmLENBQUM7UUFDRCw2QkFBNkI7WUFDM0IsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDekIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87Z0JBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFBO1lBRS9DLE9BQU8sTUFBTSxDQUFBO1FBQ2YsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNlYXJjaENoaWxkcmVuIChjaGlsZHJlbikge1xuICBjb25zdCByZXN1bHRzID0gW11cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baW5kZXhdXG4gICAgaWYgKGNoaWxkLmlzQWN0aXZlICYmIGNoaWxkLmlzRGVwZW5kZW50KSB7XG4gICAgICByZXN1bHRzLnB1c2goY2hpbGQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdHMucHVzaCguLi5zZWFyY2hDaGlsZHJlbihjaGlsZC4kY2hpbGRyZW4pKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRzXG59XG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdkZXBlbmRlbnQnLFxuXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbG9zZURlcGVuZGVudHM6IHRydWUsXG4gICAgICBpc0RlcGVuZGVudDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGlzQWN0aXZlICh2YWwpIHtcbiAgICAgIGlmICh2YWwpIHJldHVyblxuXG4gICAgICBjb25zdCBvcGVuRGVwZW5kZW50cyA9IHRoaXMuZ2V0T3BlbkRlcGVuZGVudHMoKVxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9wZW5EZXBlbmRlbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBvcGVuRGVwZW5kZW50c1tpbmRleF0uaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2V0T3BlbkRlcGVuZGVudHMgKCkge1xuICAgICAgaWYgKHRoaXMuY2xvc2VEZXBlbmRlbnRzKSByZXR1cm4gc2VhcmNoQ2hpbGRyZW4odGhpcy4kY2hpbGRyZW4pXG5cbiAgICAgIHJldHVybiBbXVxuICAgIH0sXG4gICAgZ2V0T3BlbkRlcGVuZGVudEVsZW1lbnRzICgpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdXG4gICAgICBjb25zdCBvcGVuRGVwZW5kZW50cyA9IHRoaXMuZ2V0T3BlbkRlcGVuZGVudHMoKVxuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb3BlbkRlcGVuZGVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKC4uLm9wZW5EZXBlbmRlbnRzW2luZGV4XS5nZXRDbGlja2FibGVEZXBlbmRlbnRFbGVtZW50cygpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICBnZXRDbGlja2FibGVEZXBlbmRlbnRFbGVtZW50cyAoKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbdGhpcy4kZWxdXG4gICAgICBpZiAodGhpcy4kcmVmcy5jb250ZW50KSByZXN1bHQucHVzaCh0aGlzLiRyZWZzLmNvbnRlbnQpXG4gICAgICByZXN1bHQucHVzaCguLi50aGlzLmdldE9wZW5EZXBlbmRlbnRFbGVtZW50cygpKVxuXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuICB9XG59XG4iXX0=