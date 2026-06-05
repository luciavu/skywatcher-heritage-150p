import './Card.scss';

const Card = ({ filename, metadata }) => {
  return (
    <div className="card" key={filename}>
      <img src={`/images/compressed/${filename}`} alt={filename} loading="lazy" />
      <div className="metadata">{metadata.taken || 'N/A'}</div>
    </div>
  );
};

export default Card;
