import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../constants';
import SiteCard from './SiteCard';

const Home = () => {
    const [siteLists, setSiteLists] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/site`).then((resp) => {
            setSiteLists(resp.data.data);
            console.log(resp.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className='container mt-4'>
            <div className='row'>
                {siteLists.length === 0 ? 'No sites to show' : siteLists.map((data) => {
                    return (<div className='col-4 mt-2'>
                        <SiteCard layout={data?.layout} siteName={data?.siteName} plots={data?.plots} />
                    </div>)
                })}
            </div>
        </div>
    )
}

export default Home