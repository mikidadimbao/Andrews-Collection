import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return [];
    }
};

const deleteImageFromDatabase = async (category, imageId, phoneNumber) => {
    try {
        const response = await axios.delete(`http://10.0.62.231:5000/api/deleteImage/${category}/${imageId}`, {
            data: { phoneNumber }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error deleting image from database:', error);
    }
};

const ImageGrid = ({ category, images, showDeleteModal }) => (
    <>
        {images.map((image, index) => (
            <div key={index} className="image-container">
                <img src={`http://10.0.62.231:5000/Images/${category.toLowerCase()}/${image.filename}`} alt={`Image ${index}`} />
                <button onClick={() => showDeleteModal(category, image._id)}>Chagua</button>
            </div>
        ))}
    </>
);

function AllProducts() {
    const [images, setImages] = useState({
        kofia: [],
        pensi: [],
        tshirt: [],
        sweta: [],
        tracks: []
    });

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const fetchAllData = async () => {
            const kofiaImages = await fetchData('http://10.0.62.231:5000/getAllKofiaImages');
            const pensiImages = await fetchData('http://10.0.62.231:5000/getAllPensiImages');
            const tshirtImages = await fetchData('http://10.0.62.231:5000/getAllTshirtImages');
            const swetaImages = await fetchData('http://10.0.62.231:5000/getAllSwetaImages');
            const trackImages = await fetchData('http://10.0.62.231:5000/getAllTracksImages');

            setImages({
                kofia: kofiaImages,
                pensi: pensiImages,
                tshirt: tshirtImages,
                sweta: swetaImages,
                tracks: trackImages
            });
        };

        fetchAllData();
    }, []);

    const showDeleteModal = (category, imageId) => {
        setSelectedImage({ category, imageId });
        setShowModal(true);
    };

    const handleDelete = () => {
        const { category, imageId } = selectedImage;
        deleteImageFromDatabase(category, imageId, phoneNumber);
        setImages(prevState => ({
            ...prevState,
            [category.toLowerCase()]: prevState[category.toLowerCase()].filter(image => image._id !== imageId)
        }));
        setShowModal(false);
        setPhoneNumber('');
    };

    return (
        <div className='main-container'>
            <div className="welcome">
                <h2>Welcome To ANDREW'S COLLECTION</h2>
                <p>We are excited to have you here.</p>
                <div className="prod">
                    <ul className="product-list">
                        <li><a href="./AllProducts">ALL</a></li>
                        <li><a href="./Tracks">Tracks</a></li>
                        <li><a href="./Kofia">Kofia</a></li>
                        <li><a href="./Pensi">Pensi</a></li>
                        <li><a href="./Tshirts">T-Shirts</a></li>
                    </ul>
                </div>
            </div>
            <br />
            <div className="image-grid">
                <ImageGrid category="sweta" images={images.sweta} showDeleteModal={showDeleteModal} />
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Enter your phone number</h3>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone Number"
                        />
                        <button onClick={handleDelete}>Nunua</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllProducts;
