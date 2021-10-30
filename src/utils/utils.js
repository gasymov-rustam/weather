export function createRouteWind(number) {
  let str = "";
  if (number === 0) str = <span>north wind</span>;
  else if (number < 90) str = <span>north east wind</span>;
  else if (number === 90) str = <span>east wind</span>;
  else if (number < 180) str = <span>south east wind</span>;
  else if (number === 180) str = <span>south wind</span>;
  else if (number < 270) str = <span>southwest wind</span>;
  else if (number === 270) str = <span>west wind</span>
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
