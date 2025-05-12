export class StringUtil {
  private static ARG_REPLACER_LEADING = '{';
  private static ARG_REPLACER_TRAILING = '}';

  static format(value: any): string {
    if (isFinite(value)) {
      return value.toString();
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  static formatStringArgs(str: string, ...args: any[]): string {
    const argReplacementRegex = new RegExp(
      `\\${StringUtil.ARG_REPLACER_LEADING}(\\d+)\\${StringUtil.ARG_REPLACER_TRAILING}`,
      'gm',
    );

    return str.replace(argReplacementRegex, (match, groupMatch) => {
      const argIdx = Number(groupMatch);
      if (argIdx >= args.length) return match;

      const argValue = args[argIdx];
      return StringUtil.format(argValue);
    });
  }

  static joinStr(...args: string[]): string {
    return args.join('');
  }
}
