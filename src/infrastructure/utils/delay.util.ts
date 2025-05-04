export class DelayUtil {
  static async withDelay<T>(callback: () => T, delay = 100): Promise<T> {
    return await new Promise((resolve) =>
      setTimeout(() => {
        resolve(callback());
      }, delay),
    );
  }

  static async withRandomDelay<T>(
    callback: () => T,
    delayOptions: { min?: number; max?: number } = {},
  ): Promise<T> {
    const { min = 100, max = 1000 } = delayOptions;

    const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min;

    return await new Promise((resolve) =>
      setTimeout(() => {
        resolve(callback());
      }, randomDelay),
    );
  }
}
