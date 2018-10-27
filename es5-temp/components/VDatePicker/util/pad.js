const padStart = (string, targetLength, padString) => {
    targetLength = targetLength >> 0;
    string = String(string);
    padString = String(padString);
    if (string.length > targetLength) {
        return String(string);
    }
    targetLength = targetLength - string.length;
    if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(string);
};
export default (n, length = 2) => padStart(n, length, '0');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkRhdGVQaWNrZXIvdXRpbC9wYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ25ELFlBQVksR0FBRyxZQUFZLElBQUksQ0FBQyxDQUFBO0lBQ2hDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdkIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM3QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWSxFQUFFO1FBQ2hDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ3RCO0lBRUQsWUFBWSxHQUFHLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO0lBQzNDLElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUU7UUFDbkMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUMvRDtJQUNELE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzFELENBQUMsQ0FBQTtBQUVELGVBQWUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwYWRTdGFydCA9IChzdHJpbmcsIHRhcmdldExlbmd0aCwgcGFkU3RyaW5nKSA9PiB7XG4gIHRhcmdldExlbmd0aCA9IHRhcmdldExlbmd0aCA+PiAwXG4gIHN0cmluZyA9IFN0cmluZyhzdHJpbmcpXG4gIHBhZFN0cmluZyA9IFN0cmluZyhwYWRTdHJpbmcpXG4gIGlmIChzdHJpbmcubGVuZ3RoID4gdGFyZ2V0TGVuZ3RoKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpXG4gIH1cblxuICB0YXJnZXRMZW5ndGggPSB0YXJnZXRMZW5ndGggLSBzdHJpbmcubGVuZ3RoXG4gIGlmICh0YXJnZXRMZW5ndGggPiBwYWRTdHJpbmcubGVuZ3RoKSB7XG4gICAgcGFkU3RyaW5nICs9IHBhZFN0cmluZy5yZXBlYXQodGFyZ2V0TGVuZ3RoIC8gcGFkU3RyaW5nLmxlbmd0aClcbiAgfVxuICByZXR1cm4gcGFkU3RyaW5nLnNsaWNlKDAsIHRhcmdldExlbmd0aCkgKyBTdHJpbmcoc3RyaW5nKVxufVxuXG5leHBvcnQgZGVmYXVsdCAobiwgbGVuZ3RoID0gMikgPT4gcGFkU3RhcnQobiwgbGVuZ3RoLCAnMCcpXG4iXX0=