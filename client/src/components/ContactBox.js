import ContactList from './ContactList';
import ContactBar from './ContactBar';
import { useState } from 'react';
import Modal from './Modal';

export default function ContactBox() {

    const [filter, setFilter] = useState({ keyword: '', sort: 'asc' });
    const [id, setId] = useState(0)
    const [show, setShow] = useState(false)

    const filterContact = (keyword) => {
        setFilter({ ...filter, keyword });
    }

    const sortContatc = (sort) => {
        setFilter({ ...filter, sort })
    }

    return (
        <div className="App-header">
            <ContactBar find={filterContact} sort={sortContatc} />
            <ContactList filter={filter} setShow={setShow} setId={setId}/>
            {show && <Modal id={id} setShow={setShow}/>}            
        </div>
    )
}