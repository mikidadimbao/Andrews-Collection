import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function UploadProduct() {
    const [images, setImages] = useState({
        kofia: [],
        pensi: [],
        tshirt: [],
        sweta: [],
        tracks: []
    });
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpload = (productType) => {
        if (files.length === 0) return;

        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file);
        });

        setUploading(true);

        axios.post(`http://10.0.62.231:5000/api/upload/${productType}`, formData)
            .then(res => {
                console.log(res);
                fetchImages(`/getAll${productType.charAt(0).toUpperCase() + productType.slice(1)}Images`, productType);
                setFiles([]);
            })
            .catch(err => {
                console.log(err);
                setError('Error uploading images');
            })
            .finally(() => setUploading(false));
    };

    const fetchImages = (endpoint, type) => {
        axios.get(`http://10.0.62.231:5000${endpoint}`)
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setImages(prevState => ({
                        ...prevState,
                        [type]: res.data
                    }));
                } else {
                    console.warn(`No ${type} images available`);
                }
                setError(null);
            })
            .catch(err => {
                console.error(`Error fetching ${type} images:`, err);
                setError('Network Error: Unable to fetch images');
            });
    };

    useEffect(() => {
        fetchImages('/getAllKofiaImages', 'kofia');
        fetchImages('/getAllPensiImages', 'pensi');
        fetchImages('/getAllTshirtImages', 'tshirt');
        fetchImages('/getAllSwetaImages', 'sweta');
        fetchImages('/getAllTracksImages', 'tracks');
    }, []);

    return (
        <div className='main-container'>
            <div className="upload">
                <div className="dropdown">
                    <button className="dropbtn">Select Product</button>
                    <div className="dropdown-content">
                        {['kofia', 'pensi', 'sweta', 'tshirt', 'tracks'].map((type, index) => (
                            <div key={index} className="tshirt">
                                <input 
                                    type="file" 
                                    multiple 
                                    onChange={e => setFiles([...e.target.files])} 
                                    disabled={uploading} 
                                />
                                <button 
                                    onClick={() => handleUpload(type)} 
                                    disabled={uploading}
                                >
                                    Upload {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {error && <div className="error">{error}</div>}
            <br />
            <br />
            <div className="image-grid">
                {Object.entries(images).map(([type, imgs]) => (
                    imgs.map((image, index) => (
                        <div key={index} className="image-container">
                            <img src={`http://10.0.62.231:5000/Images/${type}/${image.filename}`} alt={`${type} ${index}`} />
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
}

export default UploadProduct;
