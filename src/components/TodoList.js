const TodoList = (props) => {
    return (
        <div className={"task task_" + props.order}>
            <label htmlFor={"check_" + props.order}>
                <i className="fas fa-edit"></i>
                &nbsp;
                <input
                    className="input"
                    type="text"
                    placeholder={"Task " + props.order}
                    onChange={props.function}
                    onKeyDown={props.keyDown}
                />
            </label>
            <input 
                name={"check_" + props.order}
                type="checkbox"
                className={"checkbox_" + props.order}
            />
        </div>
    );
}

export default TodoList