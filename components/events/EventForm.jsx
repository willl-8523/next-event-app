import { useState } from 'react';

import ImagePicker from '../ImagePicker.jsx';

const DUMMY_IMAGE = [
  {
    path: 'buzzing-city.jpg',
    caption: 'People walking through a city buzzing with life at night.',
  },
  {
    path: 'laptop-on-desk.jpg',
    caption: 'A laptop on a desk.',
  },
  {
    path: 'meeting-networking.jpg',
    caption: 'A group of people meeting and networking.',
  },
  {
    path: 'park.jpg',
    caption: 'A park with a lake.',
  },
  {
    path: 'women-coding.jpg',
    caption: 'A group of women coding.',
  },
];

export default function EventForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log('Sumbmitted');
  }

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ''}
        />
      </p>
      <div className="control">
        <ImagePicker
          images={DUMMY_IMAGE}
          onSelect={handleSelectImage}
          selectedImage={selectedImage}
        />
      </div>

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ''}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ''}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ''}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ''}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}
