import { useDispatch, useSelector } from 'react-redux';
import s from './SearchBox.module.css';
import { changeFilter } from '../../redux/filtersSlice';
import { MdOutlinePersonSearch } from 'react-icons/md';
import { selectNameFilter } from '../../redux/selectors';

const SearchBox = () => {

	// Отримуємо початкове значення зі стора
	const filterValue = useSelector(selectNameFilter);

	const dispatch = useDispatch();

	return (
		<div className={s.searchWrap}>
			<div className={s.search}>
				<h3 className={s.title}>Search by name</h3>
				<label className={s.label}>
					<div className={s.fieldWrap}>
						<input
							className={s.field}
							type="text"
							value={filterValue}
							autoComplete="off"
							onChange={(evt) => dispatch(changeFilter(evt.target.value))}
						/>
						<MdOutlinePersonSearch className={s.fieldIcon} />
					</div>
				</label>
			</div>
		</div>
	)
}

export default SearchBox
