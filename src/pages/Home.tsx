import timer from '../assets/timer.gif';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="homepage-container">
      <div className="homepage-text">
        <div className="homepage-title">
          <h3>Welcome to Personalized Interval Timer! ⏱</h3>
        </div>
        <div className="homepage-description">
          <h4>
            H2 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Provident ullam labore atque debitis ad nam, id voluptatem
            consequuntur eveniet laborum, ma
          </h4>
        </div>
        <div className="button-container">
          <Link to={'/signin'}>
            <button className="button-link">Click here to sign in!</button>
          </Link>
        </div>
      </div>
      <div className="homepage-image">
        <img className="timer-image" src={timer} alt="timer" />
      </div>
    </div>
  );
}

export default Home;
