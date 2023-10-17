function debounce(func: Function, wait: number, immediate: boolean = false) {
  let timer: number | null = null;
  return function (this: any, ...args: any[]) {
    const context = this;
    const callNow = immediate && !timer;
    const later = () => {
      timer = null;
      if (!immediate) func.apply(context, args);
    }
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }
}

function throttle(func: Function, wait: number) {
  let timer: number | null = null;
  return function (this: any, ...args: any[]) {
    const context = this;
    if (!timer) {
      timer = window.setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, wait);
    }
  }
}

export {
  debounce,
  throttle
}