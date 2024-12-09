import { useEffect } from 'react';
import './App.css'
import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Footer from './Footer/Footer';
import Header from './Header/Header';
import SearchBox from './SearchBox/SearchBox'
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/contactsOps';
import Loader from './Loader/Loader';
import { selectContacts, selectError, selectLoading } from '../redux/selectors';
import ErrorMessage from './ErrorMessage/ErrorMessage';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// Після монтування компоннета отримуємо дані з бекенда
		dispatch(fetchContacts());
	}, [dispatch]);

	// Отримуємо зі стану Redux дані про стан loading та error
	const isLoading = useSelector(selectLoading);
	const error = useSelector(selectError);

	const allContacts = useSelector(selectContacts).length;

	return (
		<>
			<header className='header'>
				<Header />
			</header>

			<main className='main'>
				<ContactForm />
				{allContacts > 1 && <SearchBox />}
				<ContactList />
			</main>

			<footer className='footer'>
				<Footer />
			</footer>

			{isLoading && <Loader />}
			{error && <ErrorMessage />}
		</>
	)
}

export default App
