function cachingDecoratorNew(func) {
  let cache = [];

  function wrapper(...args) {
    const hash = args.join(',');
    let index = cache.findIndex((item) => item.hash === hash);
    if(index !== -1) {
      console.log( "Из кэша: " + cache[index].result);
      return "Из кэша: " + cache[index].result;
    }

    let result = func(...args);
    cache.push({hash, result});
    if(cache.length > 5){
      cache.shift();
    }
    console.log( "Вычисляем: " + result);
    return "Вычисляем: " + result;
}
return wrapper;
}



function debounceDecorator(func, ms) {
  let timerId = null;
  function wrapper(...args){
    if (timerId === null) {
      func(...args);
    }
    clearTimeout(timerId);
    timerId = setTimeout(() => timerId = null, ms);
    wrapper.count++;
  }
  return wrapper;
}