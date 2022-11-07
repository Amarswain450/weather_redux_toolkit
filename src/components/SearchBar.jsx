import React, { useEffect, useState, useRef } from 'react';
import "./SearchBar.css";
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { fetchData } from '../store/weatherSlice';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const SearchBar = () => {
    const dispatch = useDispatch();

    const [searchItem, setSearchItem] = useState("");
    //console.log(searchItem);
    const [isButtonDisable, setIsButtonDisable] = useState(false);

    const changeInputHandler = (e) => {
        setSearchItem(e.target.value);
    }

    useEffect(() => {
        if (searchItem === "") {
            dispatch(fetchData("bengaluru"));
        }
    }, [dispatch, searchItem]);

    const optimizeFun = (fn, d) => {
        return function (...args) {
            setIsButtonDisable(true);
            setTimeout(() => {
                fn();
            }, d);
        }
    }

    const clickHandler = optimizeFun(() => {
        console.log("....");
        setIsButtonDisable(false);
        dispatch(fetchData(searchItem));
    }, 2000);

    return (
        <>
            <Box className='card__input__style' component="form" noValidate autoComplete="off">
                <Paper
                    style={{ border: "1px solid gray" }}
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Cities....."
                        value={searchItem}
                        onChange={changeInputHandler}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} onClick={clickHandler} disabled={isButtonDisable}>
                        <ArrowRightAltIcon />
                    </IconButton>
                </Paper>
            </Box>
        </>
    )
}

export default SearchBar