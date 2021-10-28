import { useData } from "../hooks/useData";


export default function Settings() {
  const settingsOptions = {
    units: ["standart", "metric", "imperial"],
    lang: [{long: 'English', code: 'EN'},{long: 'Russian', code: 'RU'},{long: 'Hebrew', code: 'HE'}],
  }
  const [{settings}, dispatch] = useData();

  function handleRadio(key, value) {
    console.log(key, value);
    dispatch({ type: "CHANGE_SETTINGS", payload: {[key]: value} })
  }
  return (
    <>
      {Object.keys(settingsOptions).map((setting) => (
        <fieldset key={setting}>
          <legend>
            {setting}
              {settingsOptions[setting].map((item, i) => {
                return <label key={i}>
                <input
                  type="radio"
                  name={setting}
                  value={item?.code || item}
                  checked={settings[setting] === (item?.code || item)}
                  onChange={() => handleRadio(setting, item?.code || item)}
                />
                <span>{item?.long || item}</span>
              </label>
              })}
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
