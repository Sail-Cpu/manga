import React, {useEffect, useState} from 'react';
import { get } from '../../api/Api';
import {useParams} from "react-router-dom";

const Type = () => {
    const { typeID } = useParams();
    const [type, setType] = useState();

    useEffect(() => {
        get.fetchTypeById(typeID).then(response => {
            setType(response[0]);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return(
        <div className='type-page-container'>
            {type &&
                <div className='type-page-container-left'>
                    <div className='type-page-container-title'>
                        {type.name.toUpperCase()}
                    </div>
                    <div className='type-page-container-left-background' style={{backgroundImage: `url(${type.background_image})`}}>

                    </div>
                    <div style={{justifyContent: 'flex-end'}} className='type-page-container-title'>
                        {type.japan_name}
                    </div>
                </div>
            }
        </div>
    )
}

export default Type;