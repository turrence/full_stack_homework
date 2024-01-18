export default function FieldSelector({ fields, setField }){

    let buttonClick = (fstr) => {
        setField(fstr)
        console.log("click()" + fstr)
    }

    return <div>
        {fields.map((field, index) => (
            <button key={index} onClick={() => buttonClick(field)}>{field}</button>
        ))}
    </div>
}