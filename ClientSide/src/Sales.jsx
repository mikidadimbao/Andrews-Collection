// Sales.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function Sales() {
    const [deletedImages, setDeletedImages] = useState([]);

    useEffect(() => {
        axios.get('http://10.0.62.231:5000/api/deletedImages')
            .then(response => setDeletedImages(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (imageId) => {
        axios.delete(`http://10.0.62.231:5000/api/deleteImage/${imageId}`)
            .then(response => {
                if (response.status === 200) {
                    setDeletedImages(deletedImages.filter(image => image._id !== imageId));
                } else {
                    console.error('Failed to delete image');
                }
            })
            .catch(error => console.error('Error deleting image:', error));
    };

    return (
        <div className="main-container">
            <h1>Sold Products</h1>
            <div className="deleted-images-grid">
                {deletedImages.map(image => (
                    <div key={image._id} className="deleted-image">
                        {image.filename ? (
                            <>
                                <img
                                    src={`http://10.0.62.231:5000/Images/SoldProducts/${image.filename}`}
                                    alt="Deleted Image"
                                    onError={(e) => e.target.src = '/path/to/default/image.jpg'}
                                />
                                <button onClick={() => handleDelete(image._id)}>Delete</button>
                            </>
                        ) : (
                            <p>No image available</p>
                        )}
                        <p>{image.phoneNumber}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sales;
