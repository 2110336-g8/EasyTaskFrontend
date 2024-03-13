import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export function formatDateDuration(startDate: Date, endDate: Date): string {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const diff = end.diff(start);
    const dur = dayjs.duration(diff);
    let durationText = [];

    if (dur.hours() > 23) {
        if (dur.years() > 0) {
            durationText.push(
                `${dur.years()} year${dur.years() > 1 ? 's' : ''}`,
            );
        }
        if (dur.months() > 0) {
            durationText.push(
                `${dur.months()} month${dur.months() > 1 ? 's' : ''}`,
            );
        }
        if (dur.days() > 0) {
            if (dur.hours() > 0) {
                durationText.push(
                    `${dur.days() + 1} day${dur.days() + 1 > 1 ? 's' : ''}`,
                );
            } else {
                durationText.push(
                    `${dur.days()} day${dur.days() > 1 ? 's' : ''}`,
                );
            }
        }
    } else {
        durationText.push(`${dur.hours()} hour${dur.hours() > 1 ? 's' : ''}`);
    }

    return durationText.join(' ');
}

export function dateNow(): Date {
    return new Date();
}

export function dateFromString(dateString: string): Date {
    return new Date(dateString);
}

export function dateToString(date: Date, fmt: string = 'DD MMM YYYY'): string {
    return dayjs(date).format(fmt);
}
