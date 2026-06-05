import { useEffect, useState } from 'react';
import Card from '../components/gallery/Card';
import '../components/gallery/Card.scss';

const GalleryHome = () => {
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/images/compressed/metadata.json');
        const data = await res.json();
        setMetadata(data);
      } catch (err) {
        console.error('Failed to load metadata', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);
  if (loading) return <div className="loading">Loading...</div>;
  return (
    <div className="grid">
      {Object.entries(metadata).map(([filename, data]) => (
        <>
          <Card filename={filename} metadata={data}></Card>
        </>
      ))}
    </div>
  );
};

export default GalleryHome;
