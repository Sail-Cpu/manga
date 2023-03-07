import React, {useState} from 'react';

const SearchRow = (props) => {

    const [tabRow, setTabRow] = useState([]);
    const [dataName, setDataName] = useState('');

    const searchRow = (search) => {
        setDataName(search);
        props.fetchData(search).then(response => {
            setTabRow(response.data);
            tabRow.slice(0, 10);
        }).catch(error => {
            console.log(error);
        })
    }

    const chooseRow = (row) => {
        setDataName(row.name);
        props.setData(row);
        setTabRow([]);
    }

    return(
        <div className="search-row-container">
            <input type='text'
                   className='search-row-input'
                   placeholder='image name...'
                   value={dataName}
                   onChange={(e) => searchRow(e.target.value)}
                   onClick={() => searchRow('')}/>
            <div className='search-row-content'>
                {
                    tabRow.map((row, idx) => {
                        return(
                            <div key={idx}
                                 className={`search-row-data ${row.name === props.data?.name ? 'active' : ''}`}
                                 onClick={() => chooseRow(row)} >
                                <span>{row.name}</span>
                                <span>{row.type}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SearchRow;