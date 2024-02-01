import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BACKEND_URL } from '../constants';
import PlotCard from './PlotCard';

const Plot = () => {
    const [plots, setPlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currPlot, setCurrPlot] = useState('');
    const [plot, setPlot] = useState({
        plotNo: '',
        facing: '',
        north: '',
        south: '',
        east: '',
        west: ''
    })
    const [userDetails, setUserDetails] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        amount: ''
    })
    const [booking, setBooking] = useState(false);
    const { name } = useParams();

    const handleBooking = (plot) => {
        setBooking(true);
        axios.put(`${BACKEND_URL}/api/site/bookPlot`, {
            siteNo: name,
            plotNo: plot,
            userDetails: userDetails
        }).then((resp) => {
            setBooking(false);
        })
    }

    const handlePlotChange = (e) => {
        setPlot((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleBookPlot = (e) => {
        setUserDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handlePlotInputs = () => {
        setLoading(true);
        axios.patch(`${BACKEND_URL}/api/site/${name}`, {
            plotDetails: {
                "plotNo": plot.plotNo,
                "facing": plot.facing,
                "area": plot.area,
                "dimensions": {
                    "north": plot.north,
                    "east": plot.east,
                    "west": plot.west,
                    "south": plot.south
                }
            }
        }).then(() => {
            console.log('Plot created');
            setLoading(false);
        })
        setPlot({
            plotNo: '',
            facing: '',
            north: '',
            south: '',
            east: '',
            west: ''
        });
    }


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/site/${name}`).then((resp) => {
            console.log(resp.data.data.plots)
            setPlots(resp.data.data.plots)
        })
    }, [name, booking])

    return (
        <>
            <div className='d-flex justify-content-end m-4'>
                <button className='btn btn-outline-dark' data-toggle="modal" data-target="#exampleModal">Add Plot +</button>
            </div>
            {/* <tbody> */}
            <div className='container'>
                {
                    plots.length === 0 ? 'No plots' :
                        plots.map((data, index) => {
                            return <div className='col-md-10 mx-auto'>
                                <PlotCard data={data} setCurrPlot={setCurrPlot} />
                            </div>
                            // return <tr>
                            //     <th scope="row">{index + 1}</th>
                            //     <th>{data?.plotNo}</th>
                            //     <td>{data?.facing}</td>
                            //     <td>{data?.area}</td>
                            //     <td>
                            //         <button type="button" style={{ cursor: `${data?.isBooked ? 'no-drop' : 'pointer'}` }} class={`pointer btn btn-outline-${data?.isBooked ? 'success' : 'danger'}`} onClick={() => setCurrPlot(data?.plotNo)} data-toggle="modal" data-target={`#${data?.isBooked ? '' : 'plotBooking'}`} data-plot={data?.plotNo}>{data?.isBooked ? 'Booked' : 'Available'}</button>
                            //     </td>
                            // </tr>
                        })
                }
            </div>
            {/* </tbody> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add a plot</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Plot No</label>
                                    <input type="text" class="form-control" name='plotNo' value={plot?.plotNo} onChange={handlePlotChange} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Plot Facing</label>
                                    <input type="text" class="form-control" name='facing' value={plot?.facing} onChange={handlePlotChange} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Area</label>
                                    <input type="text" class="form-control" name='area' value={plot?.area} onChange={handlePlotChange} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">North</label>
                                    <input type="text" class="form-control" name='north' value={plot?.north} onChange={handlePlotChange} />
                                    <label for="exampleInputPassword1">South</label>
                                    <input type="text" class="form-control" name='south' value={plot?.south} onChange={handlePlotChange} />
                                    <label for="exampleInputPassword1">East</label>
                                    <input type="text" class="form-control" name='east' value={plot?.east} onChange={handlePlotChange} />
                                    <label for="exampleInputPassword1">West</label>
                                    <input type="text" class="form-control" name='west' value={plot?.west} onChange={handlePlotChange} />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={handlePlotInputs}>{loading ? <div class="spinner-border text-light" role="status">
                            </div> : "Add"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="plotBooking" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{`Book plot : ${currPlot}`}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Name</label>
                                    <input type="text" class="form-control" name='name' value={userDetails?.name} onChange={handleBookPlot} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Email</label>
                                    <input type="email" class="form-control" name='email' value={userDetails?.email} onChange={handleBookPlot} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Address</label>
                                    <textarea type="text" class="form-control" name='address' value={userDetails?.address} onChange={handleBookPlot}></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Phone</label>
                                    <input type="text" class="form-control" name='phone' value={userDetails?.phone} onChange={handleBookPlot} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Amount</label>
                                    <input type="text" class="form-control" name='amount' value={userDetails?.amount} onChange={handleBookPlot} />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={() => handleBooking(currPlot)}>{booking ? <div class="spinner-border text-light" role="status">
                            </div> : "Book"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Plot;