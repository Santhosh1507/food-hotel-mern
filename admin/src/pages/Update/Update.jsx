import React, { useEffect, useState } from 'react';
import './Update.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Update = (props) => {
    
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: ""
    });
    
    const { id } = useParams();
    const navigate = useNavigate();
    const api = `http://localhost:3000/api/food/list/${id}`;

    useEffect(() => {
        axios.get(api).then((res) => {
            setData({
                name: res.data.name,
                description: res.data.description,
                price: res.data.price,
                category: res.data.category
            });
            setImage(res.data.image);
        }).catch((err) => {
            toast.error("Error fetching food item data");
        });
    }, [id]);

    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({
            ...data, [name]: value
        }))
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const formData = {
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            image: image
        }
        

        try {
            const response = axios.put(`http://localhost:3000/api/food/update/${id}`, formData);
            if (response.data.success) {
                toast.success("Food item updated successfully");
                navigate(`/list`);
            } else {
                toast.error("Error updating food item");
            }
        } catch (error) {
            toast.error("Error updating food item");
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input onChange={onchangeHandler} value={data.name} type="text" name='name' placeholder='Type here'  />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea onChange={onchangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here'></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onchangeHandler} value={data.category} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product price</p>
                        <input onChange={onchangeHandler} value={data.price} type="number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>Update</button>
            </form>
        </div>
    );
};

export default Update;
