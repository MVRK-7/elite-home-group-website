import Logo from './Logo';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <a href="#top" className="footer-brand" aria-label="Elite Home Group — home">
            <Logo className="footer-logo" />
          </a>
          <p className="footer-tagline">
            A boutique real estate team in Kingman, Arizona &mdash; part of Realty ONE
            Group.
          </p>
        </div>
        <div>
          <div className="footer-heading">Explore</div>
          <div className="footer-links">
            <a href="#listings" className="footer-link">Listings</a>
            <a href="#team" className="footer-link">Our Team</a>
            <a href="#results" className="footer-link">Results</a>
          </div>
        </div>
        <div>
          <div className="footer-heading">Contact</div>
          <div className="footer-contact">
            <a href="tel:+19283622011" className="footer-link">(928) 362&ndash;2011</a>
            <a href="mailto:MyEliteHomeGroup@gmail.com" className="footer-link">
              MyEliteHomeGroup@gmail.com
            </a>
            <span>1608 Stockton Hill Rd #104, Kingman, AZ</span>
            <a href="#contact" className="footer-contact-cta">
              Book a consultation &rarr;
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {year} Elite Home Group &middot; Realty ONE Group</span>
        <span>Equal Housing Opportunity &middot; Licensed in Arizona</span>
      </div>
    </footer>
  );
}
