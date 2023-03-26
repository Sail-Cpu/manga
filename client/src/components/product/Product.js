import React from 'react';
//Icon
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Product = (props) => {
    return(
        <div className='product-card-container'>
            <div className='product-card-image' style={{backgroundImage: `url(${props.image})`}}></div>
            <div className='product-card-content'>
                <div className='product-card-type'>
                    {props.type}
                </div>
                <div className='product-card-name' style={{fontSize: '20px', color: '#fff'}}>
                    {props.name}
                </div>
                <div className='product-card-heart' style={{justifyContent: 'flex-end'}}>
                    <FavoriteBorderIcon />
                </div>
            </div>
        </div>
    )
}

export default Product;