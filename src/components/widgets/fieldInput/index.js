const fieldInput = (props) => {
    return(
        <div className={props.className}>
            <label htmlFor={props.id}>{props.label}</label>
            <input placeholder={props.placeholder} id={props.id} name={props.name} value={props.value} onChange={props.onChange} required={props.required} />
        </div>
    )
}

export default fieldInput;