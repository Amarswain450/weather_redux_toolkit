import React, { useEffect, useState } from 'react';
import "./SearchBar.css";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useDispatch } from 'react-redux';
import { fetchData } from '../store/weatherSlice';

const SearchBar = () => {
    const dispatch = useDispatch();

    const [searchItem, setSearchItem] = useState("");
    //console.log(searchItem);

    const changeInputHandler = (e) => {
        setSearchItem(e.target.value);
    }

    useEffect(() => {
        let timer;
        timer = setTimeout(() => {
            if (searchItem) {
                dispatch(fetchData(searchItem));
            }
        }, 1000);
        if (searchItem === "") {
            dispatch(fetchData("bengaluru"));
        }
        return () => {
            clearTimeout(timer);
        }
    }, [dispatch, searchItem]);

    return (
        <>
            <Box className='card__input__style' component="form" noValidate autoComplete="off">
                <FormControl sx={{ width: '45ch' }}>
                    <OutlinedInput
                        placeholder="Search cities..."
                        value={searchItem}
                        onChange={changeInputHandler}
                    />
                </FormControl>
            </Box>
        </>
    )
}

export default SearchBar