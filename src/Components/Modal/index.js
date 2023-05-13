import { useEffect, useState } from 'react';
import './modal.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../service';


const Modal = ({ defaultData = null, show, close, className = null, updateGroupInList, addNewGroupToGroupList }) => {

    let baseClassName = `modal` + (className ? ` ${className}` : "")

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [invite_url, setInviteUrl] = useState("")

    useEffect(() => { }, [show])

    useEffect(() => {
        let mounted = true

        if (mounted) {
            setName(defaultData ? defaultData.name || "" : "")
            setDescription(defaultData ? defaultData.description || "" : "")
            setInviteUrl(defaultData ? defaultData.invite_url || "" : "")
        }

        return () => mounted = false
    }, [defaultData, show])

    const clearModalData = () => {
        setName("")
        setDescription("")
        setInviteUrl("")
    }

    const toastError = message => toast.error(message);
    const sucess = message => toast.success(message);

    const submit = async ev => {
        ev.preventDefault()

        let payload = { name, description, invite_url }
        let error = null

        if (name === "") error = { message: "O campo nome é obrigatório" }
        if (description === "") error = { message: "O campo descrição é obrigatório" }
        if (invite_url === "") error = { message: "O campo link do convite é obrigatório" }


        if (error) {
            toastError(error.message)
            return ''
        }

        if ('id' in defaultData) {
            payload = { ...defaultData, ...payload }
            
            await api.patch(`/groups/${payload.id}`, payload)
                .then(result => {
                    sucess('Grupo editado com sucesso')
                    setTimeout(close, 1500);
                    clearModalData()
                    updateGroupInList(result.data, true)
                })
                .catch(error => toastError(error.response.data.message))

            return
        }

        payload = { ...payload, latitude: defaultData.lat, longitude: defaultData.lng }

        api.post('/groups', payload)
            .then(result => {
                sucess('Grupo criado com sucesso')
                setTimeout(close, 1500);
                clearModalData()
                addNewGroupToGroupList(result.data)
            })
            .catch(error => toastError(error.response.data.message))
    }

    if (!show) return ''

    return <div className={baseClassName}>
        <ToastContainer position="bottom-right" />
        <div className='modal-content'>
            <button className='close-btn' onClick={close}>X</button>

            <div className='form-wrapper'>
                <form>
                    <h1>Crie um novo grupo</h1>
                    <fieldset>
                        <label htmlFor='group-name'>Nome do grupo</label>
                        <input value={name} onChange={e => setName(e.target.value)} id="group-name" type="text" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor='description'>Descrição</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} id="description"></textarea>
                    </fieldset>

                    <fieldset>
                        <label htmlFor='url'>Link do convite do grupo</label>
                        <input value={invite_url} onChange={e => setInviteUrl(e.target.value)} id="url" type="url" />
                    </fieldset>

                    <span></span>

                    <button onClick={submit} className='submit-btn' type='submit'>Salvar</button>

                </form>
            </div>
        </div>
    </div>
}

export default Modal