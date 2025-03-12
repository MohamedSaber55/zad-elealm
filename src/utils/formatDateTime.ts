export function formatDateTime(
    dateString: string,
    options: { showDate?: boolean; showTime?: boolean, isArabic?: boolean } = { showDate: true, showTime: true, isArabic: false }
): string {
    const date = new Date(dateString);

    const formatOptions: Intl.DateTimeFormatOptions = {};

    if (options.showDate) {
        formatOptions.weekday = 'short';
        formatOptions.year = 'numeric';
        formatOptions.month = 'short';
        formatOptions.day = 'numeric';
    }

    if (options.showTime) {
        formatOptions.timeZone = "Africa/Cairo"
        formatOptions.hour = '2-digit';
        formatOptions.minute = '2-digit';
        formatOptions.hour12 = true;
    }
    // Choose the locale based on the `isArabic` option
    const locale = options.isArabic ? 'ar-EG' : 'en-GB';
    return date.toLocaleString(locale, formatOptions);
}
