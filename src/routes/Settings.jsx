import { settingsInfo } from "../settingsInfo/settingsInfo";

export default function Settings() {
  const settings = Object.keys(settingsInfo);
  console.log(settings);
  return (
    <div>
      {settings.map((setting) => (
        <fieldset>
          <legend>
            {setting}
            {settingsInfo[setting].map((item) => (
              <label>
                <input type="checkbox" value={item} />
                <span>{item}</span>
              </label>
            ))}
          </legend>
        </fieldset>
      ))}
    </div>
  );
}
