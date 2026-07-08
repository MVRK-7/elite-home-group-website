import { useReveal } from '../hooks/useReveal';
import hualapaiPhoto from '../assets/listings/hualapai-foothills.webp';
import cerbatPhoto from '../assets/listings/cerbat-cliffs.webp';
import valleVistaPhoto from '../assets/listings/valle-vista.webp';
import './Listings.css';

type Listing = {
  title: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  location: string;
  tag: 'For sale' | 'New';
  photo: string;
};

const LISTINGS: Listing[] = [
  {
    title: 'Hualapai Foothills Estate',
    price: '$1,245,000',
    beds: 4,
    baths: 3,
    sqft: '3,400 sqft',
    location: 'Kingman, AZ',
    tag: 'For sale',
    photo: hualapaiPhoto,
  },
  {
    title: 'Cerbat Cliffs Modern',
    price: '$675,000',
    beds: 3,
    baths: 2,
    sqft: '2,100 sqft',
    location: 'Kingman, AZ',
    tag: 'For sale',
    photo: cerbatPhoto,
  },
  {
    title: 'Valle Vista Retreat',
    price: '$529,000',
    beds: 3,
    baths: 2,
    sqft: '1,850 sqft',
    location: 'Kingman, AZ',
    tag: 'New',
    photo: valleVistaPhoto,
  },
];

function ListingSlide({ listing }: { listing: Listing }) {
  return (
    <div className="listing-slide">
      <a href="#contact" className="listing-card">
        <img className="listing-photo" src={listing.photo} alt={listing.title} />
        <div className="listing-scrim" />
        <span className={`listing-badge ${listing.tag === 'New' ? 'listing-badge-new' : ''}`}>
          {listing.tag}
        </span>
        <div className="listing-body">
          <div className="listing-title">{listing.title}</div>
          <div className="listing-price">{listing.price}</div>
          <div className="listing-meta">
            {listing.beds} bd &nbsp;&middot;&nbsp; {listing.baths} ba &nbsp;&middot;&nbsp; {listing.sqft}
          </div>
          <div className="listing-location">{listing.location}</div>
        </div>
      </a>
    </div>
  );
}

export default function Listings() {
  const heading = useReveal<HTMLDivElement>(0);

  return (
    <section id="listings" className="listings">
      <div className="listings-inner">
        <div ref={heading.ref} style={heading.style} className="listings-head">
          <div>
            <div className="listings-kicker">Featured listings</div>
            <h2 className="listings-title">A considered collection.</h2>
          </div>
          <a href="#contact" className="listings-viewall">
            View all listings &rarr;
          </a>
        </div>
      </div>
      <div className="listings-stack">
        {LISTINGS.map((listing) => (
          <ListingSlide key={listing.title} listing={listing} />
        ))}
      </div>
    </section>
  );
}
