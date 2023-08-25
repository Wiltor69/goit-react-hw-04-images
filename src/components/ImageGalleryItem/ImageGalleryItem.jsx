import Modal from 'react-modal';
import { GalleryItem, Image, StyleModal } from './ImageGalleryItem.styled';
import { useState } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const ImageGalleryItem = ({ imageItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(null);

  const closeModal = () => setIsModalOpen(null);

  return imageItem.map(image => {
    const { id, webformatURL, q, largeImageURL } = image;
    return (
      <GalleryItem key={id}>
        <Image src={webformatURL} alt={q} onClick={() => setIsModalOpen(id)} />

        <Modal
          isOpen={isModalOpen === id}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <StyleModal src={largeImageURL} alt={q} />
        </Modal>
      </GalleryItem>
    );
  });
};
