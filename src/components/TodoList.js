const TodoList = (props) => {
    return (
        <div className={"task task_" + props.order}>
            <input 
                name={"check_" + props.order}
                type="checkbox"
                className={"checkbox_" + props.order}
            />

            <label htmlFor={"check_" + props.order}>
                <div className="icon-manager">
                    &nbsp;
                    <i className="fas fa-edit"></i>
                    &nbsp;
                    <i className="fad fa-trash eliminate"></i>
                </div>
                <input
                    className="input"
                    type="text"
                    placeholder={"Task " + props.order}
                    onChange={props.function}
                    onKeyDown={props.keyDown}
                />
            </label>
        </div>
    );
}

export default TodoList