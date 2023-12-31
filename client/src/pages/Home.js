import Contact from "../components/Contact";
import "../index.css";


function Donation() {
  return (
    <div className="donation-container">
      <h2 className="donation-heading">Donation</h2>
      <p>If you'd like to support our work, you can donate using the button below:</p>
      <button className="donation-button">Donate</button>
    </div>
  );
}

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome!</h1>
      <div className="home-content">
        <p>
          
        </p>
      </div>
      <div className="container">
        <Contact />
        <Donation />
      </div>
    </div>
  );
};

export default Home;