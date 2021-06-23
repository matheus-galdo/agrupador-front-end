import { useEffect, useState } from 'react';
import './modal.css'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Modal = ({ show, close, className = null, updateGroupsList, geolocation }) => {

    let baseClassName = `modal` + (className ? ` ${className}` : "")


    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [invite_url, setInviteUrl] = useState("")

    useEffect(() => { }, [geolocation, show])

    const toastError = message => toast.error(message);
    const sucess = message => toast.success(message);

    const submit = ev => {
        ev.preventDefault()

        let payload = { name, description, invite_url, latitude: geolocation.lat, longitude: geolocation.lng }
        let error = null

        if (name === "") error = { message: "O campo nome é obrigatório" }
        if (description === "") error = { message: "O campo descrição é obrigatório" }
        if (invite_url === "") error = { message: "O campo link do convite é obrigatório" }


        if (error) {
            toastError(error.message)
            return ''
        }

        axios.post('http://localhost:5000/groups', payload)
            .then(result => {
                sucess('Grupo criado com sucesso')
                setTimeout(close, 2500);
                
                setName("")
                setDescription("")
                setInviteUrl("")
            })
            .catch(error => toastError(error.response.data.message))
    }

    if (!show) return ''

    return <div className={baseClassName}>
        <ToastContainer position="bottom-right"/>
        <div className='modal-content'>
            <button className='close-btn' onClick={close}>X</button>

            <div className='form-wrapper'>
                <form>
                    <h1>Crie um novo grupo</h1>
                    <fieldset>
                        <label htmlFor='group-name'>Nome do grupo</label>
                        <input onChange={e => setName(e.target.value)} id="group-name" type="text" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor='description'>Descrição</label>
                        <input onChange={e => setDescription(e.target.value)} id="description" type="text" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor='url'>Link do convite do grupo</label>
                        <input onChange={e => setInviteUrl(e.target.value)} id="url" type="url" />
                    </fieldset>

                    <span></span>

                    <button onClick={submit} type='submit'>Salvar</button>

                </form>
            </div>
        </div>
    </div>
}

export default Modal