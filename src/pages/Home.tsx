import '../styles/Homepage.css';

export default function Home() {
  return (
    <>
      <div className='hero hero-container'>

      <svg className="waves3" width="1920" height="100vh" viewBox="0 0 1920 100vh" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" fill-opacity="1" stroke="#0099ff" className="svgwaves3" d="M426.154 609.097C114.858 539.076 12.3445 771.857 0 897V-526H1776V-21.757C1739.86 -12.5823 1653.41 28.7773 1596.74 120.818C1525.89 235.869 1247.87 179.72 1194.73 163.756C1142.62 148.099 991.855 157.15 991.855 263.944C991.855 370.738 1087.39 396.06 1043.92 487.44C1000.44 578.821 815.275 696.624 426.154 609.097Z"/>
      </svg>

      <svg className="waves2" width="1920" height="100vh" viewBox="0 0 1920 100vh" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" fill-opacity="1" stroke="#0099ff" className="svgwaves2" d="M426.154 609.097C114.858 539.076 12.3445 771.857 0 897V-526H1776V-21.757C1739.86 -12.5823 1653.41 28.7773 1596.74 120.818C1525.89 235.869 1247.87 179.72 1194.73 163.756C1142.62 148.099 991.855 157.15 991.855 263.944C991.855 370.738 1087.39 396.06 1043.92 487.44C1000.44 578.821 815.275 696.624 426.154 609.097Z"/>
      </svg>

      <svg className="waves" width="120vw" height="100vh" viewBox="0 0 1920 100vh" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" fill-opacity="1" stroke="#0099ff" className="svgwaves" d="M426.154 609.097C114.858 539.076 12.3445 771.857 0 897V-526H1776V-21.757C1739.86 -12.5823 1653.41 28.7773 1596.74 120.818C1525.89 235.869 1247.87 179.72 1194.73 163.756C1142.62 148.099 991.855 157.15 991.855 263.944C991.855 370.738 1087.39 396.06 1043.92 487.44C1000.44 578.821 815.275 696.624 426.154 609.097Z"/>
      </svg>

        <div className='hero hero-text home-text'>
          <div className='hero hero-title home-title'>TaePare</div>
          <div className='hero hero-subtitle home-subtitle'>"It's the shit, bro."</div>
        </div>
      </div>

      <img className="mascot" src="./src/assets/mascot.png"/>
    </>
    
  );
}
