import { useHistory } from 'react-router';
import notfound from '../img/mistake.webp'


export default function NotFound() {
    const history = useHistory(); 
  return (
    <div className="imgWrapper">
        <button onClick={() => history.push('/')}>Home</button>
      <img
        src={notfound}
        loading="lazy"
        width="500"
        alt="wrong adress"
      />
    </div>
  );
}
