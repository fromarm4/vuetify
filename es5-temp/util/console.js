function createMessage(message, vm, parent) {
    if (parent) {
        vm = {
            _isVue: true,
            $parent: parent,
            $options: vm
        };
    }
    if (vm) {
        // Only show each message once per instance
        vm.$_alreadyWarned = vm.$_alreadyWarned || [];
        if (vm.$_alreadyWarned.includes(message))
            return;
        vm.$_alreadyWarned.push(message);
    }
    return `[Vuetify] ${message}` + (vm ? generateComponentTrace(vm) : '');
}
export function consoleInfo(message, vm, parent) {
    const newMessage = createMessage(message, vm, parent);
    newMessage != null && console.info(newMessage);
}
export function consoleWarn(message, vm, parent) {
    const newMessage = createMessage(message, vm, parent);
    newMessage != null && console.warn(newMessage);
}
export function consoleError(message, vm, parent) {
    const newMessage = createMessage(message, vm, parent);
    newMessage != null && console.error(newMessage);
}
export function deprecate(original, replacement, vm, parent) {
    consoleWarn(`'${original}' is deprecated, use '${replacement}' instead`, vm, parent);
}
/**
 * Shamelessly stolen from vuejs/vue/blob/dev/src/core/util/debug.js
 */
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str
    .replace(classifyRE, c => c.toUpperCase())
    .replace(/[-_]/g, '');
function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
        return '<Root>';
    }
    const options = typeof vm === 'function' && vm.cid != null
        ? vm.options
        : vm._isVue
            ? vm.$options || vm.constructor.options
            : vm || {};
    let name = options.name || options._componentTag;
    const file = options.__file;
    if (!name && file) {
        const match = file.match(/([^/\\]+)\.vue$/);
        name = match && match[1];
    }
    return ((name ? `<${classify(name)}>` : `<Anonymous>`) +
        (file && includeFile !== false ? ` at ${file}` : ''));
}
function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
        const tree = [];
        let currentRecursiveSequence = 0;
        while (vm) {
            if (tree.length > 0) {
                const last = tree[tree.length - 1];
                if (last.constructor === vm.constructor) {
                    currentRecursiveSequence++;
                    vm = vm.$parent;
                    continue;
                }
                else if (currentRecursiveSequence > 0) {
                    tree[tree.length - 1] = [last, currentRecursiveSequence];
                    currentRecursiveSequence = 0;
                }
            }
            tree.push(vm);
            vm = vm.$parent;
        }
        return '\n\nfound in\n\n' + tree
            .map((vm, i) => `${i === 0 ? '---> ' : ' '.repeat(5 + i * 2)}${Array.isArray(vm)
            ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)`
            : formatComponentName(vm)}`)
            .join('\n');
    }
    else {
        return `\n\n(found in ${formatComponentName(vm)})`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2NvbnNvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxhQUFhLENBQUUsT0FBZSxFQUFFLEVBQVEsRUFBRSxNQUFZO0lBQzdELElBQUksTUFBTSxFQUFFO1FBQ1YsRUFBRSxHQUFHO1lBQ0gsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsTUFBTTtZQUNmLFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQTtLQUNGO0lBRUQsSUFBSSxFQUFFLEVBQUU7UUFDTiwyQ0FBMkM7UUFDM0MsRUFBRSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQTtRQUM3QyxJQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUFFLE9BQU07UUFDaEQsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDakM7SUFFRCxPQUFPLGFBQWEsT0FBTyxFQUFFLEdBQUcsQ0FDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNyQyxDQUFBO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUUsT0FBZSxFQUFFLEVBQVEsRUFBRSxNQUFZO0lBQ2xFLE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3JELFVBQVUsSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNoRCxDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBRSxPQUFlLEVBQUUsRUFBUSxFQUFFLE1BQVk7SUFDbEUsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFD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O3FCQUFNLElBQUksd0JBQXdCLEdBQUcsQ0FBQyxFQUFFO29CQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxDQUFBO29CQUN4RCx3QkFBd0IsR0FBRyxDQUFDLENBQUE7aUJBQzdCO2FBQ0Y7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUE7U0FDaEI7UUFDRCxPQUFPLGtCQUFrQixHQUFHLElBQUk7YUFDN0IsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FDZCxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQzFDLEdBQ0UsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtZQUMvRCxDQUFDLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUM1QixFQUFFLENBQUM7YUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDZDtTQUFNO1FBQ0wsT0FBTyxpQkFBaUIsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQTtLQUNuRDtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVNZXNzYWdlIChtZXNzYWdlOiBzdHJpbmcsIHZtPzogYW55LCBwYXJlbnQ/OiBhbnkpOiBzdHJpbmcgfCB2b2lkIHtcbiAgaWYgKHBhcmVudCkge1xuICAgIHZtID0ge1xuICAgICAgX2lzVnVlOiB0cnVlLFxuICAgICAgJHBhcmVudDogcGFyZW50LFxuICAgICAgJG9wdGlvbnM6IHZtXG4gICAgfVxuICB9XG5cbiAgaWYgKHZtKSB7XG4gICAgLy8gT25seSBzaG93IGVhY2ggbWVzc2FnZSBvbmNlIHBlciBpbnN0YW5jZVxuICAgIHZtLiRfYWxyZWFkeVdhcm5lZCA9IHZtLiRfYWxyZWFkeVdhcm5lZCB8fCBbXVxuICAgIGlmICh2bS4kX2FscmVhZHlXYXJuZWQuaW5jbHVkZXMobWVzc2FnZSkpIHJldHVyblxuICAgIHZtLiRfYWxyZWFkeVdhcm5lZC5wdXNoKG1lc3NhZ2UpXG4gIH1cblxuICByZXR1cm4gYFtWdWV0aWZ5XSAke21lc3NhZ2V9YCArIChcbiAgICB2bSA/IGdlbmVyYXRlQ29tcG9uZW50VHJhY2Uodm0pIDogJydcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc29sZUluZm8gKG1lc3NhZ2U6IHN0cmluZywgdm0/OiBhbnksIHBhcmVudD86IGFueSk6IHZvaWQge1xuICBjb25zdCBuZXdNZXNzYWdlID0gY3JlYXRlTWVzc2FnZShtZXNzYWdlLCB2bSwgcGFyZW50KVxuICBuZXdNZXNzYWdlICE9IG51bGwgJiYgY29uc29sZS5pbmZvKG5ld01lc3NhZ2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zb2xlV2FybiAobWVzc2FnZTogc3RyaW5nLCB2bT86IGFueSwgcGFyZW50PzogYW55KTogdm9pZCB7XG4gIGNvbnN0IG5ld01lc3NhZ2UgPSBjcmVhdGVNZXNzYWdlKG1lc3NhZ2UsIHZtLCBwYXJlbnQpXG4gIG5ld01lc3NhZ2UgIT0gbnVsbCAmJiBjb25zb2xlLndhcm4obmV3TWVzc2FnZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnNvbGVFcnJvciAobWVzc2FnZTogc3RyaW5nLCB2bT86IGFueSwgcGFyZW50PzogYW55KTogdm9pZCB7XG4gIGNvbnN0IG5ld01lc3NhZ2UgPSBjcmVhdGVNZXNzYWdlKG1lc3NhZ2UsIHZtLCBwYXJlbnQpXG4gIG5ld01lc3NhZ2UgIT0gbnVsbCAmJiBjb25zb2xlLmVycm9yKG5ld01lc3NhZ2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXByZWNhdGUgKG9yaWdpbmFsOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBzdHJpbmcsIHZtPzogYW55LCBwYXJlbnQ/OiBhbnkpIHtcbiAgY29uc29sZVdhcm4oYCcke29yaWdpbmFsfScgaXMgZGVwcmVjYXRlZCwgdXNlICcke3JlcGxhY2VtZW50fScgaW5zdGVhZGAsIHZtLCBwYXJlbnQpXG59XG5cbi8qKlxuICogU2hhbWVsZXNzbHkgc3RvbGVuIGZyb20gdnVlanMvdnVlL2Jsb2IvZGV2L3NyYy9jb3JlL3V0aWwvZGVidWcuanNcbiAqL1xuXG5jb25zdCBjbGFzc2lmeVJFID0gLyg/Ol58Wy1fXSkoXFx3KS9nXG5jb25zdCBjbGFzc2lmeSA9IChzdHI6IHN0cmluZykgPT4gc3RyXG4gIC5yZXBsYWNlKGNsYXNzaWZ5UkUsIGMgPT4gYy50b1VwcGVyQ2FzZSgpKVxuICAucmVwbGFjZSgvWy1fXS9nLCAnJylcblxuZnVuY3Rpb24gZm9ybWF0Q29tcG9uZW50TmFtZSAodm06IGFueSwgaW5jbHVkZUZpbGU/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgaWYgKHZtLiRyb290ID09PSB2bSkge1xuICAgIHJldHVybiAnPFJvb3Q+J1xuICB9XG4gIGNvbnN0IG9wdGlvbnMgPSB0eXBlb2Ygdm0gPT09ICdmdW5jdGlvbicgJiYgdm0uY2lkICE9IG51bGxcbiAgICA/IHZtLm9wdGlvbnNcbiAgICA6IHZtLl9pc1Z1ZVxuICAgICAgPyB2bS4kb3B0aW9ucyB8fCB2bS5jb25zdHJ1Y3Rvci5vcHRpb25zXG4gICAgICA6IHZtIHx8IHt9XG4gIGxldCBuYW1lID0gb3B0aW9ucy5uYW1lIHx8IG9wdGlvbnMuX2NvbXBvbmVudFRhZ1xuICBjb25zdCBmaWxlID0gb3B0aW9ucy5fX2ZpbGVcbiAgaWYgKCFuYW1lICYmIGZpbGUpIHtcbiAgICBjb25zdCBtYXRjaCA9IGZpbGUubWF0Y2goLyhbXi9cXFxcXSspXFwudnVlJC8pXG4gICAgbmFtZSA9IG1hdGNoICYmIG1hdGNoWzFdXG4gIH1cblxuICByZXR1cm4gKFxuICAgIChuYW1lID8gYDwke2NsYXNzaWZ5KG5hbWUpfT5gIDogYDxBbm9ueW1vdXM+YCkgK1xuICAgIChmaWxlICYmIGluY2x1ZGVGaWxlICE9PSBmYWxzZSA/IGAgYXQgJHtmaWxlfWAgOiAnJylcbiAgKVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUNvbXBvbmVudFRyYWNlICh2bTogYW55KTogc3RyaW5nIHtcbiAgaWYgKHZtLl9pc1Z1ZSAmJiB2bS4kcGFyZW50KSB7XG4gICAgY29uc3QgdHJlZSA9IFtdXG4gICAgbGV0IGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSA9IDBcbiAgICB3aGlsZSAodm0pIHtcbiAgICAgIGlmICh0cmVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbGFzdDogYW55ID0gdHJlZVt0cmVlLmxlbmd0aCAtIDFdXG4gICAgICAgIGlmIChsYXN0LmNvbnN0cnVjdG9yID09PSB2bS5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgIGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSsrXG4gICAgICAgICAgdm0gPSB2bS4kcGFyZW50XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2UgPiAwKSB7XG4gICAgICAgICAgdHJlZVt0cmVlLmxlbmd0aCAtIDFdID0gW2xhc3QsIGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZV1cbiAgICAgICAgICBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2UgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRyZWUucHVzaCh2bSlcbiAgICAgIHZtID0gdm0uJHBhcmVudFxuICAgIH1cbiAgICByZXR1cm4gJ1xcblxcbmZvdW5kIGluXFxuXFxuJyArIHRyZWVcbiAgICAgIC5tYXAoKHZtLCBpKSA9PiBgJHtcbiAgICAgICAgaSA9PT0gMCA/ICctLS0+ICcgOiAnICcucmVwZWF0KDUgKyBpICogMilcbiAgICAgIH0ke1xuICAgICAgICBBcnJheS5pc0FycmF5KHZtKVxuICAgICAgICAgID8gYCR7Zm9ybWF0Q29tcG9uZW50TmFtZSh2bVswXSl9Li4uICgke3ZtWzFdfSByZWN1cnNpdmUgY2FsbHMpYFxuICAgICAgICAgIDogZm9ybWF0Q29tcG9uZW50TmFtZSh2bSlcbiAgICAgIH1gKVxuICAgICAgLmpvaW4oJ1xcbicpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGBcXG5cXG4oZm91bmQgaW4gJHtmb3JtYXRDb21wb25lbnROYW1lKHZtKX0pYFxuICB9XG59XG4iXX0=