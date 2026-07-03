import { useState } from 'react';

const Accordion = ({ items, title, content }) => {
  const [openKey, setOpenKey] = useState(null);

  return (
    <div>
      {items.map((item) => {
        const key = item.key;
        const isOpen = openKey === item.key;
        return (
          <div key={key}>
            <div
              onClick={() => setOpenKey((prev) => (prev === key ? null : key))}
              className={isOpen ? 'active' : ''}
              style={{ cursor: 'pointer' }}
            >
              {title(item, isOpen)}
            </div>
            {openKey === key && <div style={{ paddingLeft: '0.5rem' }}>{content(item)}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
