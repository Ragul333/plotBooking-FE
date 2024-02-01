import React from 'react'
import { Link } from 'react-router-dom'

const SiteCard = ({ layout, siteName, plots }) => {
    return (
        <div class="card" style={{ width: "18rem" }}>
            <img src={layout} class="card-img-top" alt="..." style={{ height: '10rem' }} />
            <div class="card-body">
                <p class="card-text">{siteName}</p>

                <p class="card-text">
                    <button type="button" class="btn btn-primary">
                        Plots <span class="badge badge-light">{plots ? plots?.length : '0'}</span>
                    </button>
                </p>
            </div>
        </div>
    )
}

export default SiteCard