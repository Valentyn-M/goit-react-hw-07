import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.jsx'
import Modal from 'react-modal';
// Імпортуємо провайдер
import { Provider } from 'react-redux'
// Імпортуємо створений стор
import { store } from "./redux/store";

// Установка кореневого елемента для бібліотеки React Modal.
Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
)
