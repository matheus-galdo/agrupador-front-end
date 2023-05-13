import './newMarker.css'

const NewMarker = ({ coords, ...props }) => {

    if(!('lat' in coords)) return ''

    coords = {lat: coords.lat(), lng: coords.lng()}
    
    return <div className='new-group-marker'>
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

export default NewMarker