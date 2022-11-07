import React, { useEffect } from 'react';
import "./Home.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/weatherSlice';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData("bengaluru"));
    }, [dispatch]);

    const { datas, error } = useSelector((state) => state.weather);
    //console.log(error);

    const convertToCelsius = (val) => {
        //console.log(val);
        let res = (val - 273.15);
        return res.toFixed();
    }

    return (
        <>
            <Box className="home__container">
                <Card className='card__style'>
                    <SearchBar />
                    <Box className='error__box__style'>
                        {
                            error && (
                                <Typography sx={{ fontSize: 16 }} style={{color: "red", fontWeight: "bold"}}>
                                    {error}
                                </Typography>
                            )
                        }
                    </Box>
                    <Box className='content__style'>
                        <Box>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                {datas.name}
                            </Typography>
                            {
                                datas.main ? (
                                    <Typography variant="h4" fontWeight="bold" component="div">
                                        {convertToCelsius(datas.main.temp)}°C
                                    </Typography>
                                ) : null
                            }
                        </Box>
                        <Box>
                            {
                                datas.weather ? (
                                    <img src={`https://openweathermap.org/img/wn/${datas.weather[0].icon}@2x.png`} className="img__style" />
                                ) : null
                            }
                        </Box>
                        <Box className='content__desc__style'>
                            {
                                datas.weather ? (
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {datas.weather[0].main}
                                    </Typography>
                                ) : null
                            }
                        </Box>
                    </Box>
                    <Box className='footer__box'>
                        <Box>
                            {
                                datas.main ? (
                                    <Typography variant="h6" fontWeight="bold">
                                        {convertToCelsius(datas.main.feels_like)}°C
                                    </Typography>
                                ) : null
                            }
                            <Typography sx={{ fontSize: 16 }} color="text.secondary">
                                Feels Like
                            </Typography>
                        </Box>
                        <Box>
                            {
                                datas.main ? (
                                    <Typography variant="h6" fontWeight="bold">
                                        {datas.main.humidity}%
                                    </Typography>
                                ) : null
                            }
                            <Typography sx={{ fontSize: 16 }} color="text.secondary">
                                HUMIDITY
                            </Typography>
                        </Box>
                        <Box>
                            {
                                datas.wind ? (
                                    <Typography variant="h6" fontWeight="bold">
                                        {datas.wind.speed.toFixed()}MPH
                                    </Typography>
                                ) : null
                            }
                            <Typography sx={{ fontSize: 16 }} color="text.secondary">
                                WINDS
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </>
    )
}

export default Home
