import { useParams } from 'react-router-dom';
import { images } from '../utils/image';
import { Link } from 'react-router-dom';
import '../components/gallery/Gallery.scss';

const PhotoDetail = () => {
  const { year, month, day, filename } = useParams();

  const index = images.findIndex(
    (img) =>
      img.year === year && img.month === month && img.day === day && img.filename === filename,
  );

  if (index === -1) {
    return <p>Image not found</p>;
  }

  const image = images[index];
  const previous = index > 0 ? images[index - 1] : null;
  const next = index < images.length - 1 ? images[index + 1] : null;

  return (
    <div className="photo-detail-container">
      <Link to={'/gallery'} className="return">
        RETURN
      </Link>
      <div className="image-detail">
        <img src={image.src} alt={image.filename} />
        <div className="details">
          <p>Taken: {image.metadata?.taken || 'NA'}</p>
          <p>Lens: {image.metadata?.lens || 'NA'}</p>
          <p>ISO: {image.metadata?.iso || 'NA'}</p>
          <p>Shutter: {image.metadata?.shutter || 'NA'}</p>
          <p>Aperture: {image.metadata?.aperture || 'NA'}</p>
        </div>
      </div>
      <div className="prev-next">
        {previous && (
          <Link
            to={`/gallery/${previous.year}/${previous.month}/${previous.day}/${previous.filename}`}
          >
            PREV
          </Link>
        )}
        <Link to={`/gallery/${next.year}/${next.month}/${next.day}/${next.filename}`}>NEXT</Link>
      </div>
    </div>
  );
};

export default PhotoDetail;
