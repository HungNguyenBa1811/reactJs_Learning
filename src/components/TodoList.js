const TodoList = (props) => {
    return (
        <div className={"task_" + props.order}>
            <input name={"check_" + props.order} type="checkbox" className={"checkbox_" + props.order}></input>
            <label htmlFor={"check_" + props.order}>Task 1</label>
        </div>
    );
}

export default TodoList