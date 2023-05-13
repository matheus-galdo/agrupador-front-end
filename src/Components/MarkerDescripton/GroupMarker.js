import { AiOutlineWhatsApp } from "react-icons/ai";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

import './description.css'

const MarkerDescripton = ({ group, ...props }) => {

    return <div className='group-marker-description'>
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
                    {/* <p className='name'>Editar</p> */}
                </button>
                <button onClick={e => props.deleteGroup(group)} className='edit-group-btn delete-group-btn'>
                    <FaRegTrashAlt />
                    {/* <p className='name'>Excluir</p> */}
                </button>
            </div>
        </footer>
    </div>
}

export default MarkerDescripton