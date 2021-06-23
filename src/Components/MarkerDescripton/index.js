import { AiOutlineWhatsApp } from "react-icons/ai";
import './description.css'

const MarkerDescripton = ({ group }) => {

    return <div className='group-marker-description'>
        <h1>{group.name}</h1>
        <p className='description'>{group.name}</p>

        <a className='group-btn' href={group.invite_url} rel="noreferrer" target="_blank">
            <AiOutlineWhatsApp /> Entrar no grupo
        </a>
    </div>
}

export default MarkerDescripton