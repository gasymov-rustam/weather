import { useEffect } from 'react';
import { useParams } from 'react-router';

export default function City() {
  const { cityName } = useParams();
  useEffect(() => {
    if (cityName) {
      console.log(cityName);
    }
  }, [cityName]);
  return (
    <div>
      <h1>city ({cityName || 'none!'})</h1>
    </div>
  );
}
