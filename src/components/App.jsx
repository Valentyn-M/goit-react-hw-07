import './App.css'
import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Footer from './Footer/Footer';
import Header from './Header/Header';
import SearchBox from './SearchBox/SearchBox'

function App() {

	return (
		<>
			<header className='header'>
				<Header />
			</header>

			<main className='main'>
				<ContactForm />
				<SearchBox />
				<ContactList />
			</main>

			<footer className='footer'>
				<Footer />
			</footer>
		</>
	)
}

export default App
