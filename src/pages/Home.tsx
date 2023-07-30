import timer from '../assets/timer.gif';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="homepage-container">
      <div className="homepage-text">
        <div className="homepage-title">
          <h2>Welcome to Personalized Interval Timer! ⏱</h2>
        </div>
        <div className="homepage-description">
          <p>
            "Customize your interval workout routines effortlessly, without the
            need for a stopwatch. Tailor your workouts to your liking and enjoy
            a personalized fitness experience, free from the constraints of
            following YouTube videos."
          </p>
          <br></br>
          <p>
            Ps. Don't for get to enable 3rd party cookie for authentication 🍪
          </p>
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
