import { useData } from "../hooks/useData";

export default function Settings() {
  const settingsOptions = {
    units: ["standart", "metric", "imperial"],
    lang: [
      { long: "English", code: "EN" },
      { long: "Russian", code: "RU" },
      { long: "Hebrew", code: "HE" },
    ],
  };
  const [{ settings }, dispatch] = useData();

  function handleRadio(key, value) {
    dispatch({ type: "CHANGE_SETTINGS", payload: { [key]: value } });
  }
  return (
    <div className="formWrapper__Settings">
      {Object.keys(settingsOptions).map((setting) => (
        <div key={setting} >
          <legend>
            <h3>{setting}</h3>
            {settingsOptions[setting].map((item, i) => {
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name={setting}
                    value={item?.code || item}
                    checked={settings[setting] === (item?.code || item)}
                    onChange={() => handleRadio(setting, item?.code || item)}
                  />
                  <span>{item?.long || item}</span>
                </label>
              );
            })}
          </legend>
        </div>
      ))}
    </div>
  );
}
