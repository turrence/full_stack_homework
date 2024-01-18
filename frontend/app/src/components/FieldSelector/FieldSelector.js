import './style.css'

export default function FieldSelector({ fields, setField , currentField }){

    let buttonClick = (fstr) => {
        setField(fstr)
    }

    return <div>
        <h1>Search files by: {currentField}</h1>
        {fields.map((field, index) => (
            <button key={index} 
                onClick={() => buttonClick(field)}
                className="field-button">
                {field}
            </button>
        ))}
    </div>
}