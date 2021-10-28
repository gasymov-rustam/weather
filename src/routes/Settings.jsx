import { useState, useEffect } from "react";
import { useData } from "../hooks/useData";
import { settingsInfo } from "../settingsInfo/settingsInfo";

export default function Settings() {
  const settings =Object.keys(settingsInfo)
  const [, dispatch] = useData();
  if (!window.localStorage.getItem("params"))
    window.localStorage.setItem(
      "params",
      JSON.stringify({
        lang: "english",
        units: "standart",
      })
    );
  let params = JSON.parse(window.localStorage.getItem("params"));
  const [lang, setLang] = useState(params.lang);
  const [unit, setUnit] = useState(params.units);
  useEffect(()=> dispatch({ type: "CHANGE_SETTINGS", payload: `&lang=${lang.slice(0, 2)}&units=${unit}`}),[lang, unit, dispatch])
  window.localStorage.setItem("params", JSON.stringify({ lang: lang, units: unit }))  
  
  function handlRadio(e, item) {
    if (e.target.name === "lang") {
      setLang(item);
    } else {
      setUnit(item);
    }
  }
  return (
    <>
      {settings.map((setting) => (
        <fieldset key={setting}>
          <legend>
            {setting}
            <form>
              {settingsInfo[setting].map((item) => (
                <label key={item}>
                  <input
                    type="radio"
                    name={setting}
                    checked={item === lang || item === unit}
                    onChange={(e) => handlRadio(e, item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </form>
          </legend>
        </fieldset>
      ))}
    </>
  );
}
// const settings = Object.keys(settingsInfo);
// {settings.map((setting) => (
//   <fieldset>
//     <legend>
//       {setting}
//       {settingsInfo[setting].map((item) => (
//         <label>
//           <input
//             type="radio"
//             name={setting}
//             value={item}
//             // checked={value === item && setting === key}
//             onChange={() => handlRadio(item, setting)}
//           />
//           <span>{item}</span>
//         </label>
//       ))}
//     </legend>
//   </fieldset>
// ))}

{
  /* <form>
        {units.map((item) => (
          <label>
            <input
              type="radio"
              name="units"
              checked={item === unit}
              onChange={(e) => handlRadio(e, item)}
            />
            <span>{item}</span>
          </label>
        ))}
      </form>
      <form>
        {langs.map((item) => (
          <label>
            <input
              type="radio"
              name="lang"
              checked={item === lang}
              onChange={(e) => handlRadio(e, item)}
            />
            <span>{item}</span>
          </label>
        ))}
      </form> */
}
{
  /* {
        <div>
          <fieldset>
            <legend>
              {settings[0]}
              {settingsInfo[settings[0]].map((item) => (
                <label>
                  <input
                    type="radio"
                    name={settings[0]}
                    value={item}
                    // checked={value === item && setting === key}
                    onChange={() => handlRadio(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </legend>
          </fieldset>
          <fieldset>
            <legend>
              {settings[1]}
              {settingsInfo[settings[1]].map((item) => (
                <label>
                  <input
                    type="radio"
                    name={settings[1]}
                    value={item}
                    // checked={value === item && setting === key}
                    onChange={() => handlRadio(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </legend>
          </fieldset>
        </div>
      } */
}
// console.log(settingsParams);
  // let par = settingsParams;
  // par = par.split("");
  // let params = settingsParams.toString().split("&").filter(word => !!word).map(item => item.split('=')).map(item => item[1]);
  // console.log(a.map(item=> console.log(item[1])));
  // console.log(par);
  // let str = '';
  // console.log(settings);
  // let keys = Object.keys(settings);

  // keyss.map(key => str+=`&${key}=${settingsParams[key]}`)
  // console.log(settingsParams);

  // console.log(a(settingsParams));
