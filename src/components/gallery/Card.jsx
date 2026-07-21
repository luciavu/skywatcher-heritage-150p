import { Link } from 'react-router-dom';
import './Gallery.scss';

const Card = ({ image }) => {
  return (
    <Link
      to={`/gallery/${image.year}/${image.month}/${image.day}/${image.filename}`}
      className="card"
    >
      <img src={image.src} alt={image.filename} loading="lazy" />
    </Link>
  );
};

export default Card;
