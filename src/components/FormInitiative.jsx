import React,  { useState} from 'react';
import PropTypes from 'prop-types';
import './formInitiative.css';
import { sendInitiative } from '../API/crud';

const FormInitiative = (props) => {
    const { sheets } = props;
    console.log(sheets);
    const initialState = {
        application_number: '',
        status: '',
        leader: sheets[0].data[4].__EMPTY_9,
        name: sheets[0].data[3].__EMPTY_11,
        release_date: '',
        request_area: sheets[0].data[4].__EMPTY_32,
        responsible_manager: sheets[0].data[5].__EMPTY_10,
        target: sheets[0].data[11].__EMPTY_2,
        description: sheets[0].data[13].__EMPTY_2,
        target_market: sheets[0].data[15].__EMPTY_2,
        associated_operational_process: sheets[0].data[17].__EMPTY_2,
        ppt_url:'',
        pdf_url:'',
        lawyers: [],
        tags:[],
        comments: [],
        notes: [],
        type_of_change:''
    };
    const [initiative, setInitiative] = useState(initialState);  
    // useEffect(() => {
    //     console.log('render1');
    // }, []);

    const updateValue = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value);
        setInitiative({ ...initiative, [name]: value });
    };   
    const comma = ',';
    
    const separateString = (string, separator) => string.split(separator);

    const updateArray = (e) => {
        const { name } = e.target;
        const valueString = e.target.value;
        const newValue = separateString(valueString, comma);
        setInitiative({ ...initiative, [name]: newValue });
    };

    const sendToDb= (obj) => {
        sendInitiative(obj);
        return setInitiative({...initialState})
    };
    return (
        <div className="container-initiative">
            <h3 className="form-title">Información de la iniciativa:</h3>
            <form action="" name="formInitiative">
                <div className="flex-column form-container-input">
                    <label htmlFor="">Nº de Solicitud: </label>
                    <input className="form-input" type="text" name="application_number" onChange={(e)=> updateValue(e)} />
                </div>
                <div className="flex-column form-container-input">
                    <label htmlFor="">Nombre de la Iniciativa: </label>
                    <input className="form-input" type="text" name="name" value={initiative.name} onChange={(e)=> updateValue(e)} />
                </div>
                <div className="flex-column form-container-input">
                    <label htmlFor="">Fecha aproximada de Lanzamiento: </label>
                    <input className="form-input" type="text" name="release_date" onChange={(e)=> updateValue(e)} />
                </div>
                <div className="flex-column form-container-input">
                    <label htmlFor="">Líder / Responsable: </label>
                    <input className="form-input" type="text" name="leader" value={initiative.leader} onChange={(e)=> updateValue(e)} />
                </div>
                <div className="flex-column form-container-input">
                    <label htmlFor="">Asignar abogados a esta iniciativa: </label>
                    <input className="form-input" placeholder="Ejemplo: Juana López, Mario Moncada" type="text" name="lawyers" onChange={(e)=> updateArray(e)}/>
                </div>
                <div className="flex-column form-container-input">
                    <label htmlFor="">Agregar tags a esta iniciativa: </label>
                    <input className="form-input" placeholder="Ejemplo: pagos móviles, tarjetas de crédito" type="text" name="tags" onChange={(e)=> updateArray(e)}/>
                </div>
                <div className="flex-column form-container-input">
                    <label htmlFor="">Qué tipo de cambio es esta iniciativa: </label>
                    <select onChange={(e)=> updateValue(e)} name="type_of_change" id="">
                        <option value="Cambio menor">Cambio Menor</option>
                        <option value="Cambio importante">Cambio Importante</option>
                        <option value="Nuevo producto">Nuevo Producto</option>
                    </select>
                </div>
                <div className="flex-column form-container-input">
                    <label htmlFor="">Agregar enlace a ppt de la iniciativa: </label>
                    <input className="form-input" placeholder="Ejemplo: https://" type="text" name="ppt_url" onChange={(e)=> updateValue(e)}/>
                </div>
                <div className="flex-column form-container-input">
                    <label htmlFor="">Agregar enlace a pdf de la iniciativa: </label>
                    <input className="form-input" placeholder="Ejemplo: https://" type="text" name="pdf_url" onChange={(e)=> updateValue(e)}/>
                </div>
                <button className="form-submit-button" onClick={() => (sendToDb(initiative))} type="button">Subir Iniciativa</button>
            </form>
        </div>
    )
};

FormInitiative.propTypes = {
   sheets: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
export default FormInitiative;
