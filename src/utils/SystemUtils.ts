class SystemUtils {
    static async setTimeout(timeoutMilliseconds: number) {
        return new Promise<void>(resolve => {
            setTimeout(resolve, timeoutMilliseconds);
        });
    }
}

export default SystemUtils;
