import React from "react";
import ReactToPdf from "react-to-pdf";
import { Link } from "react-router-dom";
// untuk menampilkan icon, install dulu (npm i react-icons)
import * as FaIcons from "react-icons/fa"
import * as BiIcons from "react-icons/bi";
 
export default class TransaksiList extends React.Component {
    getAmount = paket => {
        let total = 0
        // eslint-disable-next-line array-callback-return
        paket.map(item => {
            total += Number(item.paket.harga) * Number(item.qty)
        })
        return total
    }
 
    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()} `
    }
    
    ref = React.createRef();
 
    // untuk menampilkan status paket
    displayStatus = (status, id) => {
        if (status === 1) {
            return (
                <div className="badge badge-primary">Baru</div>
            )
        } else if (status === 2) {
            return (
                <div className="badge badge-warning">Proses</div>
            )
        } else if (status === 3 ) {
            return (
                <div className="badge badge-success">Selesai</div>
            )
        } else if (status === 4 ) {
            return (
                <div className="badge badge-info">Diambil</div>
            )
        }
    }
 
    // untuk menampilkan status bayar
    displayBayar = (bayar, id) => {
        if (bayar === 0) {
            return (
                // <button className="btn btn-sm btn-danger" onClick={this.props.onBayar}>Belum Bayar</button>
                <div className="badge badge-success">Belum Bayar</div>
            )
        } else if (bayar === 1 ) {
            return (
                <div className="badge badge-danger">Sudah Bayar</div>
            )
        }
    } 
    render() { 

        return(
            <>
                {/* list */}
                <div className="card col-sm-12 my-1">
                    <div className="card-body row">
                        {/* nama member */}
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-info">Member</small>
                            <h6>{this.props.nama_member}</h6>
                        </div>
 
                        {/* alamat */}
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-info">Alamat</small>
                            <h6>{this.props.alamat}</h6>
                        </div>
 
                        {/* status */}
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-info">Status Paket</small>
                            <h6>{ this.displayStatus(this.props.status, this.props.id_transaksi) }</h6>
                        </div>
 
                        {/* pembayaran */}
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-info">Pembayaran</small>
                            <h6>{ this.displayBayar(this.props.dibayar, this.props.id_transaksi) }</h6>
                        </div>
 
                        {/* total bayar */}
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-info">Total</small>
                            <h6 className="text-danger">Rp { this.getAmount(this.props.paket) }</h6>
                        </div>
 
                        {/* tanggal order */}
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-bold text-info">
                                Tanggal Masuk: { this.convertTime(this.props.tgl) }
                            </small>
                            <br></br>
 
                            {/* button untuk detail */}
                            <button className="btn btn-sm btn-success m-1" data-toggle="modal"
                            data-target={`#modalDetail${this.props.id_transaksi}`}>
                                <BiIcons.BiDetail />
                            </button>
                            
                            {/* button untuk mengedit */}
                            <button className="btn btn-sm btn-primary m-1">
                                <FaIcons.FaEdit onClick={this.props.onEdit} />
                            </button>
 
                            {/* button untuk menghapus */}
                            <button className="btn btn-sm btn-danger m-1">
                                <FaIcons.FaTrashAlt onClick={this.props.onDrop} />
                            </button>

                            {/* <Link to="/detail" className="btn btn-sm btn-dark m-1">
                                <FaIcons.FaFileDownload />
                            </Link> */}
                        </div>
                    </div>
                </div>
 
                {/* modal component */}
                <div className="modal fade" id={`modalDetail${this.props.id_transaksi}`}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5>Detail of Transaksi</h5>
                                <ReactToPdf targetRef={this.ref} filename="detail-transaksi.pdf"> 
                                    {({ toPdf }) =>
                                        <button className="btn btn-sm btn-info m-1">
                                            <FaIcons.FaFileDownload onClick={toPdf} />
                                        </button>
                                    }
                                </ReactToPdf>   
                            </div>
                            <div className="modal-body" ref={this.ref}>
                                <h5>Member: {this.props.nama_member}</h5>
                                <h6>Tanggal Masuk: {this.convertTime(this.props.tgl)}</h6>
                                <h6>Tanggal Bayar: {this.convertTime(this.props.tgl_bayar)}</h6>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Paket</th>
                                            <th>Harga</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
 
                                    <tbody>
                                        {this.props.paket.map((item, index) => (
                                            <tr key={item.id_paket}>
                                                <td>{`${index + 1}`}</td>
                                                <td>{item.paket.jenis_paket}</td>
                                                <td>Rp {item.paket.harga}</td>
                                                <td>{item.qty}</td>
                                                <td className="text-right">Rp {item.paket.harga * item.qty}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" className="text-danger text-bold">
                                                <h4>Total</h4>
                                            </td>
                                            <td className="text-right text-danger text-bold">
                                                <h4>
                                                    Rp {this.getAmount(this.props.paket)}
                                                </h4>  
                                            </td>
                                        </tr>
                                    </tbody> 
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}