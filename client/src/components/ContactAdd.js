import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addContact } from "../actions/contacts"
import { useDispatch } from "react-redux"


export default function ContactAdd() {

    const navigate = useNavigate()
    const [newContatc, setNewContatc] = useState({ name: '', phone: '' })
    const dispatch = useDispatch()
    const submit = () => {
        dispatch(addContact(newContatc))
        navigate('/')
    }

    return (
        <div className="add-contact">
            <form onSubmit={submit}>
                <input type="text" id="name" name="name" placeholder="name" onChange={(e) => setNewContatc({ ...newContatc, name: e.target.value })} />
                <input type="text" id="phone" name="phone" placeholder="phone" onChange={(e) => setNewContatc({ ...newContatc, phone: e.target.value })} />
                <div className="btn-form-add">
                    <button type="submit">save</button>
                    <Link to="/">cancel</Link>
                </div>
            </form>
        </div>
    )
}