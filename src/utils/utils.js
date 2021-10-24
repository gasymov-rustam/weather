export function createRouteWind(number) {
  if (number === 0) {
    return (
      <>
        <div style={{ transform: `rotate(${number}deg)` }}>&#10506; </div>
        <span>north wind</span>
      </>
    );
  } else if (number < 90) {
    return (
      <>
        <div style={{ transform: `rotate(${number}deg)` }}>&#10506; </div>
        <span>north east wind</span>
      </>
    );
  } else if (number === 90) {
    return (
      <>
        <div style={{ transform: `rotate(${number}deg)` }}>&#10506; </div>
        <span>east wind</span>
      </>
    );
  
  } else if (number < 180) {
    return (
      <>
        <div style={{ transform: `rotate(${number}deg)` }}>&#10506; </div>
        <span>south east wind</span>
      </>
    );
  }
  else if (number === 180) {
    return (
      <>
        <div style={{ transform: `rotate(${number}deg)` }}>&#10506; </div>
        <span>south wind</span>
      </>
    );
  }
  else if (number < 270) {
    return (
      <>
        <div style={{ transform: `rotate(${number}deg)` }}>&#10506; </div>
        <span>southwest wind</span>
      </>
    );
  }
  else if (number === 270) {
    return (
      <>
        <div style={{ transform: `rotate(${number}deg)` }}>&#10506; </div>
        <span>west wind</span>
      </>
    );
  }
  else {
    return (
      <>
        <div style={{ transform: `rotate(${number}deg)` }}>&#10506; </div>
        <span>northwest wind</span>
      </>
    );
  }
}
