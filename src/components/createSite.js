import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { uploadSite } from '../api/api';

const CreateSite = () => {

    const [fields, setFields] = useState({
        siteName: '',
        siteLocation: '',
        layout: '',
        plots: []
    });

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleUpload = async () => {
        if (!image) {
            alert('Please select an image');
            return;
        }

        setUploading(true);
        console.log(image)

        try {
            // Create a FormData object to send the image file
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'nahowflp');

            // Make a POST request to Cloudinary's upload API
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/drpwuzvax/image/upload',
                formData
            );

            console.log('Image uploaded successfully:', response.data);

            setFields((prev) => ({
                ...prev,
                layout: response.data.url
            }))

            // Handle the response as needed (e.g., update state, show a success message)
        } catch (error) {
            console.error('Error uploading image:', error.response.data);
            // Handle the error (e.g., show an error message)
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e) => {
        setFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const addField = () => {
        setFields([...fields, '']);
    };

    const handleInputChange = (index, value) => {
        const updatedFields = [...fields];
        updatedFields[index] = value;
        setFields(updatedFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        uploadSite(fields);
    }

    

    return (
        <div className='container'>
            <div className='col-8 mx-auto mt-5'>
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Site Name</label>
                        <input type="text" class="form-control" name='siteName' value={fields.siteName} onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Site Location</label>
                        <input type="text" class="form-control" name='siteLocation' value={fields.siteLocation} onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <input type="file" onChange={handleImageChange} />
                        <button type="button" class="btn btn-outline-dark" onClick={handleUpload} disabled={uploading}>{uploading ? 'Uploading...' : 'Upload Layout'}</button>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Add Field
                        </button>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div >
    )
}

export default CreateSite