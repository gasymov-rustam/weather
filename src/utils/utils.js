export function createRouteWind(number) {
  let str = "";
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
  return units === "standart" ? (
    <span>&#x2109;</span>
  ) : units === "metric" ? (
    <span>&#8451;</span>
  ) : (
    <span>&#xb0;</span>
  );
}

// function debounce(fn, ms) {
//   let timeout;
//   return function () {
//     function fnCall() {
//       return fn.apply(this, arguments);
//     }
//     clearInterval(timeout);
//     timeout = setTimeout(fnCall, ms);
//   };
// }
// onChange = debounce(onChange, 500);

// function throttle(func, ms) {
//   let isThrottled = false;
//   let savedArgs;
//   let savedThis;
//   function wrapper() {
//     if (isThrottled) {
//       savedArgs = arguments;
//       savedThis = this;
//       return;
//     }
//     func.apply(this, arguments);
//     isThrottled = true;
//     setTimeout(() => {
//       isThrottled = false;
//       if (savedArgs) {
//         wrapper.apply(savedThis, savedArgs);
//         savedArgs = savedThis = null;
//       }
//     }, ms);
//   }
//   return wrapper;
// }
