const TodoList = (props) => {
    return (
        <div className={"task task_" + props.order}>
            <label htmlFor={"check_" + props.order}>{"Task " + props.order}</label>
            <input name={"check_" + props.order} type="checkbox" className={"checkbox_" + props.order}></input>
        </div>
    );
}

export default TodoList