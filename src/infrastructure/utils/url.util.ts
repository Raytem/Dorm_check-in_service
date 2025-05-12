export class UrlUtil {
  static withBaseUrlIfRelative(
    path: string | undefined,
    baseUrl: string,
  ): string | undefined {
    if (!path) return undefined;
    return path.startsWith('/') ? `${baseUrl}${path}` : path;
  }
}
