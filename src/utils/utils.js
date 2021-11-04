export function createRouteWind(number) {
  let str = '';
  if (number === 0) str = <span>north wind</span>;
  else if (number < 90) str = <span>north east wind</span>;
  else if (number === 90) str = <span>east wind</span>;
  else if (number < 180) str = <span>south east wind</span>;
  else if (number === 180) str = <span>south wind</span>;
  else if (number < 270) str = <span>southwest wind</span>;
  else if (number === 270) str = <span>west wind</span>;
  else str = <span>northwest wind</span>;
  return (
    <>
      <div style={{ transform: `rotate(${number}deg)` }}>&#10506; </div>
      {str}
    </>
  );
}
export function getTemperatureSymbol(units) {
  return units === 'standart' ? <span>&#x2109;</span> : units === 'metric' ? <span>&#8451;</span> : <span>&#xb0;</span>;
}

export function asyncThrottle(delay, fn) {
  let throttling = false;
  let timer = null;
  return async (...args) => {
    if (throttling) return;
    throttling = true;
    timer = setTimeout(() => {
      throttling = false;
    }, delay);
    return fn(...args);
  };
}

export function asyncDebounce(delay, fn) {
  let timer = null;
  function sleep(ms) {
    return new Promise((resolve) => (timer = setTimeout(() => resolve(), ms)));
  }
  return async (...args) => {
    clearTimeout(timer);
    await sleep(delay);
    return fn(...args);
  };
}
