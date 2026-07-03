import './Gallery.scss';

const Card = ({ image }) => {
  return (
    <div className="card">
      <img src={image.src} alt={image.title} loading="lazy" />
      <p>{image.title}</p>
    </div>
  );
};

export default Card;
