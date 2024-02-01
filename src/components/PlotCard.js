import React from 'react'

const PlotCard = ({ data, setCurrPlot }) => {
    return (
        <div class="card shadow p-2 mb-5 bg-white rounded">
            <div class="card-body">
                <p className='d-flex'>
                    <p class="col-4 font-weight-normal p-0">
                        {`PLOT NO ${data?.plotNo}`}
                    </p>
                    <span className='col-4 p-0'>
                        <button type="button" style={{ cursor: `${data?.isBooked ? 'no-drop' : 'pointer'}` }} class={`pointer btn btn-outline-${data?.isBooked ? 'success' : 'danger'}`} onClick={() => setCurrPlot(data?.plotNo)} data-toggle="modal" data-target={`#${data?.isBooked ? '' : 'plotBooking'}`} data-plot={data?.plotNo}>{data?.isBooked ? 'Booked' : 'Available'}</button>
                    </span>
                </p>
                <p class="font-weight-normal">{`${data?.facing}`}</p>
                <p class="font-weight-normal">{`AREA ${data?.area}`}</p>
            </div>
        </div>
    )
}

export default PlotCard