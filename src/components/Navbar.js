import React, { useEffect, useState } from 'react'
import logo from '../nasav.png'
import { BACKEND_URL } from '../constants';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [dropdownMenu, setDropdownMenu] = useState([]);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/site`).then((resp) => {
            setDropdownMenu(resp.data.data);
        })
    }, [])
    console.log(dropdownMenu)
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#"></a>
            <img className='navbar-brand logo' src={logo}></img>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link to={'/home'} ><a class="nav-link" href="#">Home</a></Link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                            Sites
                        </a>
                        <div class="dropdown-menu">
                            {
                                dropdownMenu.length > 0 ?
                                    dropdownMenu.map((data) => {
                                        return <Link to={`/site/${data?.siteName}`}><a class="dropdown-item" href="#" key={data?._id}>{data?.siteName}</a></Link>
                                    })
                                    : <a class="dropdown-item" href="#">No data</a>
                            }
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled"></a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar