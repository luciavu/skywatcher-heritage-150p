import { useState } from 'react';
import Card from '../components/gallery/Card';
import '../components/gallery/Gallery.scss';
import { images } from '../utils/image';
import Accordion from '../components/gallery/Accordion';

const Gallery = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const hierarchy = images.reduce((acc, image) => {
    acc[image.year] ??= {};
    acc[image.year][image.month] ??= new Set();
    acc[image.year][image.month].add(image.day);
    return acc;
  }, {});

  const filteredImages = selectedDate
    ? images.filter((image) => `${image.year}-${image.month}-${image.day}` === selectedDate)
    : images;

  const yearItems = Object.keys(hierarchy)
    .sort()
    .map((year) => ({ key: year, year, months: hierarchy[year] }));

  return (
    <div className="gallery">
      <div className="filter">
        <h2 className="year" onClick={() => setSelectedDate(null)}>
          ALL
        </h2>
        <Accordion
          items={yearItems}
          title={(year, isOpen) => <h2 className={isOpen ? 'year active' : 'year'}>{year.year}</h2>}
          content={(year) => {
            const monthItems = Object.keys(year.months)
              .sort()
              .map((month) => ({ key: `${year.year}-${month}`, month, days: year.months[month] }));
            return (
              <Accordion
                items={monthItems}
                title={(m, isOpen) => (
                  <h3 className={isOpen ? 'month active' : 'month'}>
                    {new Date(year.year, Number(m.month) - 1)
                      .toLocaleString('default', {
                        month: 'short',
                      })
                      .toUpperCase()}
                  </h3>
                )}
                content={(m) => (
                  <div className="dates">
                    {Array.from(m.days)
                      .sort()
                      .map((day) => (
                        <button
                          className={
                            selectedDate === `${year.year}-${m.month}-${day}` ? 'date active' : ''
                          }
                          key={day}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(`${year.year}-${m.month}-${day}`);
                          }}
                        >
                          {day}
                        </button>
                      ))}
                  </div>
                )}
              />
            );
          }}
        />
      </div>
      <div className="display">
        <div className="log">Log message</div>
        <div className="grid">
          {filteredImages.map((image) => (
            <Card key={image.filename} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
