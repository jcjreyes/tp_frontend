import '../styles/AboutUs.css';

export default function AboutUs() {
  return (
    <>
      <div className='aboutus-container'>
        <div className='aboutus-content'>
          <h2>About Us</h2>
          <p>Welcome to TaePare!</p>
          <p>Our mission is to make the very natural process of defecating as seamless as possible.</p>
          <p>In our modern world, sometimes the seemingly simple things become difficult. Like connecting to the OBF wifi, or taking a dump.</p>
          <p>We created TaePare to help alleviate some of that burden for our users.</p>
          <p>At TaePare, we value transparency, integrity, and collaboration. We strive for a world where everyone can use the bathroom in peace.</p>

          <h2>Our Team</h2>
          <div className="team-cards-container">
            <div className="team-member">
              <img src="src\pics\ian.jpg" alt="Member pic"></img>
              <h2>Ian Aragoza</h2>
              <p></p>
            </div>
            <div className="team-member">
              <img src="src\pics\anthony.png" alt="Member pic"></img>
              <h2>Anthony Bicomong</h2>
              <p></p>
            </div>
            <div className="team-member">
              <img src="src\pics\rj.jpg" alt="Member pic"></img>
              <h2>RJ Conanan</h2>
              <p></p>
            </div>
            <div className="team-member">
              <img src="src\pics\justin.jpg" alt="Member pic"></img>
              <h2>Justin Reyes</h2>
              <p></p>
            </div>
            <div className="team-member">
              <img src="src\pics\lay.jpg" alt="Member pic"></img>
              <h2>Layla Villanueva</h2>
              <p></p>
            </div>
          </div>
        </div>
      </div>

    </>
    
  );
}
