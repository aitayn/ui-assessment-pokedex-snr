export const debounce = (callback: any, delay: number) => {
    let timer: any
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback();
        }, delay)
    }
}
