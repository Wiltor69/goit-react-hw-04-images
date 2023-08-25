import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { GlobalStyle } from './GlobalStyle';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '38080803-2095028227abc5092026f2051';

export const App = () => {
  const [images, setImages] = useState([]);
  const [seachImg, setSeachImg] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getImage() {
      if (seachImg === '') return;
      try {
        setLoading(true);
        const images = await fetchImage({ seachImg: seachImg, page: page });
        setImages(prevState => [...prevState, ...images]);
        console.log(images);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
    getImage();
  }, [seachImg, page]);

  const changeImage = newImage => {
    if (newImage === '') {
      toast.error('Please enter the name of the images');
    } else {
      setSeachImg(`${Date.now()}/${newImage}`);
      setImages([]);
      setPage(1);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    changeImage(evt.target.elements.seachImg.value);
    evt.target.reset();
  };

  const handleLoader = () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true);
  };

  const fetchImage = async ({ seachImg, page }) => {
    const imgIndex = seachImg.indexOf('/');
    const nameImg = seachImg.slice(imgIndex + 1);

    let response = await axios.get(
      `/?q=${nameImg}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data.hits;
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      {images.length > 0 && seachImg !== '' && (
        <Button onClick={handleLoader} />
      )}
      <GlobalStyle />

      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
};
