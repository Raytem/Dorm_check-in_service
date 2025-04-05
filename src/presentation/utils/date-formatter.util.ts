export type DateFormatTemplate = 'd MMMM yyyy';

export class DateFormatterUtil {
  private static formatterOptions: Record<
    DateFormatTemplate,
    Intl.DateTimeFormatOptions
  > = {
    'd MMMM yyyy': {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  };

  static format(
    template: DateFormatTemplate,
    date: Date,
    locale: string = 'ru-RU',
  ): string {
    const options = DateFormatterUtil.formatterOptions[template];
    const formatter = Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  }
}
