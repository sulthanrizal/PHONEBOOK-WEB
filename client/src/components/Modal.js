import { useDispatch } from "react-redux"
import { deleteContact } from "../actions/contacts"

export default function Modal({id, setShow}) {
    const dispatch = useDispatch()
    return (
        <div className="modal" tabindex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Delete Confirmation</h3>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure to remove this data?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {setShow(false)}}>No</button>
                        <button type="button" className="btn btn-primary" onClick={() => {dispatch(deleteContact(id)); setShow(false)}}>Yes</button>
                    </div>
                </div>
            </div>
        </div>

    )
}