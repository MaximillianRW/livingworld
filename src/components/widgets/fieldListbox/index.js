const fieldListbox = (props) => {
    return (
        <div className={props.className}>
            <label htmlFor={props.id}>{props.label}</label>
            <select
                id={props.id}
                name={props.name}
                value={props.value ?? ""}
                required={props.required}
                onChange={props.onChange}
            >   
                {(props.placeholder || props.placeholder === "") && (
                    console.log("placeholder renderized"),
                    <option value="" disabled hidden>
                        {props.placeholder}
                    </option>
                )}

                {props.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default fieldListbox;