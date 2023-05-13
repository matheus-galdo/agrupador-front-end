import { AiOutlineWhatsApp } from "react-icons/ai";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

import './details.css'
import './newMarker.css'

const MarkerDetails = ({ group, ...props }) => {

    return <div className='group-marker-details'>
        <header>
            <h1>{group.name}</h1>
        </header>

        <main>
            <p className='description'>{group.description}</p>
        </main>

        <footer>
            <a className='group-btn' href={group.invite_url} rel="noreferrer" target="_blank">
                <AiOutlineWhatsApp /> Entrar no grupo
            </a>

            <div className='buttons-container'>
                <button onClick={e => props.showModalWithSomeData(group)} className='edit-group-btn'>
                    <FaEdit/>
                </button>
                <button onClick={e => props.deleteGroup(group)} className='edit-group-btn delete-group-btn'>
                    <FaRegTrashAlt />
                </button>
            </div>
        </footer>
    </div>
}



const NewMarkerDetails = ({ coords, ...props }) => {

    if(!('lat' in coords)) return ''

    coords = {lat: coords.lat(), lng: coords.lng()}
    
    return <div className='group-marker-details'>
        <header>
            <h1>Novo marcador</h1>
        </header>

        <main>
            <p className='description'>{Number(coords.lat).toFixed(7)}, {Number(coords.lng).toFixed(7)}</p>
        </main>

        <footer>
            <button className='group-btn' onClick={() => props.showModalWithSomeData(coords)}>
                + Adicionar novo grupo
            </button>
        </footer>
    </div>
}

export {MarkerDetails, NewMarkerDetails}
