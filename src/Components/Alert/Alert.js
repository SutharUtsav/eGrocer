import React from 'react'
import { useDispatch } from 'react-redux';
import { removeAlert } from '../../Model/action/alertAction';

const Alert = (props) => {

    // const [timeout, settimeout] = useState(false)

    // useEffect(() => {
    //     const timer = setTimeout(() => console.log('Initial timeout!'), 1000);
    //     clearTimeout(timer)
    // }, [])

    const dispatch = useDispatch();

    return (
        <>
            {props.type === 'error' ? (
                <div className="alert" style={{ position: "absolute", background: "#F88379" }}>
                    <p>{props.message}</p>
                    <button type="button" onClick={() => {
                        dispatch(removeAlert())
                    }}><i className="bi bi-x-circle"></i></button>
                </div>
            ) : (
                <>
                    {props.type === 'success' ? (
                        <div className="alert" style={{ position: "absolute", background: "#50C878" }}>
                            <p>{props.message}</p>
                            <button type="button" onClick={() => {
                                dispatch(removeAlert())
                            }}><i className="bi bi-x-circle"></i></button>
                        </div>
                    ) : ""}
                </>
            )}
        </>
    )
}

export default Alert
