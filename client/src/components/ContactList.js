import { useDispatch, useSelector } from "react-redux";
import ContactData from "./ContactData"
import { useCallback, useEffect, useState } from "react";
import { loadContact, loadPage } from "../actions/contacts";

export default function ContactList({ filter }) {

    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const [pageNum, setPageNum] = useState({ page: 2 })
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
            return;
        }
        setIsLoading(true);
        setError(null);
        if (contacts.page >= contacts.pages) return setIsLoading(false);
        dispatch(loadPage({ ...filter, ...pageNum, limit: contacts.limit }))
        setPageNum({ page: (pageNum.page + 1) })
        setIsLoading(false)
    }, [pageNum, dispatch, contacts.page, contacts.pages, filter, isLoading, contacts.limit]);

    useEffect(() => {
        setPageNum({page: 2})
        dispatch(loadContact({...filter, limit: contacts.limit}))
    }, [dispatch, filter, contacts.limit])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, handleScroll]);

    

   

    const contactsNode = contacts.phonebooks.map((item, index) => (<ContactData contact={item} key={index} />));
    return (
        <div className="contact-list">
            {contactsNode}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    )
}