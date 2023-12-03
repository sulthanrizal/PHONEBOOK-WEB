import { faFloppyDisk, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../actions/contacts";
import { useNavigate } from "react-router-dom";


export default function ContactData({ contact, setShow, setId }) {

    const navigate = useNavigate()
    const [isEdite, setIsEdite] = useState(false);
    const dispatch = useDispatch();
    const [newData, setNewData] = useState({ name: contact.name, phone: contact.phone });

    useEffect(() => {
        setNewData({ name: contact.name, phone: contact.phone })
    }, [contact])

    const submit = (e) => {
        e.preventDefault();
        dispatch(updateContact(contact.id, newData));
        setIsEdite(!isEdite);
    }

    const toAvatar = () => {
        navigate('/avatar', { state: { id: contact.id, avatar: contact.avatar } })
    }

    if (isEdite) {
        return (
            <div className="contact-data">
                <div className="btn-image">
                    <button className="btn-avatar">
                        <img src={"http://localhost:3000/images/" +
                            (contact.avatar ? contact.avatar : "user-tie-solid.svg")}
                            alt="avatar" />
                    </button>
                </div>
                <div className="identity">
                    <form onSubmit={submit}>
                        <input type="text" name="name"
                            value={newData.name}
                            onChange={e => setNewData({ ...newData, name: e.target.value })} />
                        <input type="text" name="phone"
                            value={newData.phone}
                            onChange={e => setNewData({ ...newData, phone: e.target.value })} />
                        <div className="btn-identity">
                            <button type="submit"><FontAwesomeIcon icon={faFloppyDisk} /></button>
                        </div>
                    </form>
                </div>
            </div>)
    } else {
        return (
            <div className="contact-data">
                <div className="btn-image">
                    <button className="btn-avatar" onClick={toAvatar}>
                        <img src={"http://localhost:3000/images/" +
                            (contact.avatar ? contact.avatar : "user-tie-solid.svg")}
                            alt="avatar" />
                    </button>
                </div>
                <div className="identity">
                    <p>{contact.name}</p>
                    <p>{contact.phone}</p>
                    <div className="btn-identity">
                        <button onClick={() => setIsEdite(!isEdite)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button type="button" onClick={() => {setId(contact.id); setShow(true)}}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}