export type DateFormatTemplate = 'D MMMM YYYY' | 'DD MM YYYY';

export class DateFormatterUtil {
  private static formatterOptions: Record<
    DateFormatTemplate,
    Intl.DateTimeFormatOptions
  > = {
    'D MMMM YYYY': {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
    'DD MM YYYY': {
      day: 'numeric',
      month: 'numeric',
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
