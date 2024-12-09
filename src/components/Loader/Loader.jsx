import { HashLoader } from "react-spinners"
import s from "./Loader.module.css"
import { useEffect } from "react"

const Loader = () => {

	useEffect(() => {
		document.body.classList.add("lock");
		return () => {
			document.body.classList.remove("lock");
		};
	}, []);

	return (
		<div className={s.overlay}>
			<div className={s.loader}>
				<HashLoader
					color="#0866FF"
					size={80}
					aria-label="Loading Spinner"
				/>
			</div>
		</div>
	)
}

export default Loader
