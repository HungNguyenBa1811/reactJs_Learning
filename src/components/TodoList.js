const TodoList = (props) => {
    return (
        <div className={"task task_" + props.order}>
            <input 
                name={"check_" + props.order}
                type="checkbox"
                className={"checkbox_" + props.order}
                checked={props.isChecked}
            />

            <label htmlFor={"check_" + props.order}>
                <div className="icon-manager">
                    &nbsp;
                    <i className="fas fa-edit"></i>
                    &nbsp;
                    <i className="fad fa-trash invisible" onClick={props.removeFunction} id={props.order}></i>
                </div>
                <input
                    className="input"
                    type="text"
                    placeholder={"Task " + props.order}
                    // onChange={props.function}
                    onKeyDown={props.keyDown}
                    id={props.order}
                    defaultValue={props.text_value}
                    disabled={props.isDisabled}
                />
            </label>
        </div>
    );
}

export default TodoList