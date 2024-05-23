import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsGrid1X2Fill, BsUpload, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from "react-icons/bs";
import { LineChart, Line, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BisTShirt from '@meronex/icons/bi/BisTShirt';
import GiShirt from '@meronex/icons/gi/GiShirt';
import GrRedhat from '@meronex/icons/gr/GrRedhat';
import GiTrousers from '@meronex/icons/gi/GiTrousers';
import GiArmoredPants from '@meronex/icons/gi/GiArmoredPants';
import FcSalesPerformance from '@meronex/icons/fc/FcSalesPerformance';

function Home() {
    const [totalKofia, setTotalKofia] = useState(0);
    const [totalPensi, setTotalPensi] = useState(0);
    const [totalSweta, setTotalSweta] = useState(0);
    const [totalTracks, setTotalTracks] = useState(0);
    const [totalTshirt, setTotalTshirt] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalAll, setTotalAll] = useState(0);

    useEffect(() => {
        // Calculate total of all products
        const total = totalKofia + totalPensi + totalSweta + totalTracks + totalTshirt;
        setTotalAll(total);
    }, [totalKofia, totalPensi, totalSweta, totalTracks, totalTshirt]);

    useEffect(() => {
        fetchTotalKofia();
    }, []);

    const fetchTotalKofia = () => {
        axios.get('http://10.0.62.231:5000/total_kofia')
            .then(response => {
                setTotalKofia(response.data.total);
            })
            .catch(error => {
                console.error('Error fetching total kofia:', error);
            });
    };

    useEffect(() => {
        fetchTotalSales();
    }, []);

    const fetchTotalSales = () => {
        axios.get('http://10.0.62.231:5000/total_sales')
            .then(response => {
                setTotalSales(response.data.total);
            })
            .catch(error => {
                console.error('Error fetching total Sales:', error);
            });
    };

    useEffect(() => {
        fetchTotalPensi();
    }, []);

    const fetchTotalPensi = () => {
        axios.get('http://10.0.62.231:5000/total_pensi')
            .then(response => {
                setTotalPensi(response.data.total);
            })
            .catch(error => {
                console.error('Error fetching total pensi:', error);
            });
    };

    useEffect(() => {
        fetchTotalTracks();
    }, []);

    const fetchTotalTracks = () => {
        axios.get('http://10.0.62.231:5000/total_tracks')
            .then(response => {
                setTotalTracks(response.data.total);
            })
            .catch(error => {
                console.error('Error fetching total tracks:', error);
            });
    };

    useEffect(() => {
        fetchTotalTshirt();
    }, []);

    const fetchTotalTshirt = () => {
        axios.get('http://10.0.62.231:5000/total_tshirt')
            .then(response => {
                setTotalTshirt(response.data.total);
            })
            .catch(error => {
                console.error('Error fetching total tshirts:', error);
            });
    };

    useEffect(() => {
        fetchTotalSweta();
    }, []);

    const fetchTotalSweta = () => {
        axios.get('http://10.0.62.231:5000/total_sweta')
            .then(response => {
                setTotalSweta(response.data.total);
            })
            .catch(error => {
                console.error('Error fetching total sweta:', error);
            });
    };

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];



    return (
        <main className="main-container">
            <div className="main-title">
                <h3>ANDREWS COLLECTION</h3>
            </div>

            <div className="main-cards">
                <div className="card">
                    <div className="card-inner">
                        <a href="./AllProducts">
                            <h3 style={{ color: 'white' }}>ALL</h3>
                        </a>
                        <BsFillGrid3X3GapFill className="card_icon" />
                    </div>
                    <h3>{totalAll}</h3>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <a href="./Tracks">
                            <h3 style={{ color: 'white' }}>TRACKS</h3>
                        </a>
                        <GiTrousers className="card_icon" />
                    </div>
                    <h3>{totalTracks}</h3>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <a href="./Sweta">
                            <h3 style={{ color: 'white' }}>SWEATERS</h3>
                        </a>
                        <GiShirt className="card_icon" />
                    </div>
                    <h3>{totalSweta}</h3>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <a href="./Pensi">
                            <h3 style={{ color: 'white' }}>PENSI</h3>
                        </a>
                        <GiArmoredPants className="card_icon" />
                    </div>
                    <h3>{totalPensi}</h3>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <a href="./Tshirts">
                            <h3 style={{ color: 'white' }}>T-SHIRTS</h3>
                        </a>
                        <BisTShirt className="card_icon" />
                    </div>
                    <h3>{totalTshirt}</h3>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <a href="./Kofia">
                            <h3 style={{ color: 'white' }}>KOFIA</h3>
                        </a>
                    </div>
                    <h3>{totalKofia}</h3>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <a href="./Sales">
                            <h3 style={{ color: 'white' }}>Mauzo Yote</h3>
                        </a>
                        <FcSalesPerformance className="card_icon" />
                    </div>
                    <h3>{totalSales}</h3>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <a href="./UploadProduct">
                            <h3 style={{ color: 'white' }}>Upload</h3>
                        </a>
                        <BsUpload className="icon" />
                    </div>
                </div>
            </div>

            {/* <div className="charts">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                        <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div> */}
        </main>
    )
}

export default Home