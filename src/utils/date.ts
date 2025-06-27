import moment from 'moment';

export class TimestampUtils {
  /**
   * Convert timestamp to local time string
   */
  static toLocalTime(timestamp: number): string {
    return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * Convert timestamp to formatted local time
   */
  static toFormattedLocalTime(timestamp: number, format?: string): string {
    const defaultFormat = 'MMM DD, YYYY • HH:mm:ss';
    return moment(timestamp).format(format || defaultFormat);
  }

  /**
   * Get timezone offset
   */
  static getTimezoneOffset(): string {
    return moment().format('Z');
  }

  /**
   * Convert to relative time (e.g., "2 minutes ago")
   */
  static toRelativeTime(timestamp: number): string {
    return moment(timestamp).fromNow();
  }
}
