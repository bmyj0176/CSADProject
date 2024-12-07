export function convertISO8601(time) {
    const date = new Date(time);
    return date.toISOString();
}

export function timeDiffISO8601(time1, time2) {
    const date1 = new Date(time1);
    const date2 = new Date(time2);

    // Calculate difference in milliseconds
    const diffInMilliseconds = date1 - date2;

    // Convert to seconds
    const diffInSeconds = diffInMilliseconds / 1000;

    return diffInSeconds
}