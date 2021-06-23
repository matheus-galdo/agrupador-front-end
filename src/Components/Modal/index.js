import { useEffect } from 'react';
import './modal.css'

const Modal = ({ show, close, className = null, children = null, geolocation }) => {
    useEffect(() => { }, [geolocation])

    if (!show) return ''

    console.log(geolocation);

    return <div className={`modal` + (className ? ` ${className}` : "")}>

        <div className='modal-content'>
            <button onClick={close}>X</button>

            <div className='form-wrapper'>
                <form>
                    <fieldset>
                        <label htmlFor='group-name'>Nome do grupo</label>
                        <input id="group-name" type="text" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor='description'>Descrição</label>
                        <input id="description" type="text" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor='url'>Link do convite do grupo</label>
                        <input id="url" type="url" />
                    </fieldset>

                    <button type='submit'>Salvar</button>

                </form>
            </div>
        </div>
    </div>
}

export default Modal