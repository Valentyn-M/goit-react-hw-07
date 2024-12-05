import { useDispatch, useSelector } from 'react-redux';
import s from './SearchBox.module.css';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import { MdOutlinePersonSearch } from 'react-icons/md';

const SearchBox = () => {

	// Отримуємо початкове значення зі стора
	const filterValue = useSelector(selectNameFilter);

	const dispatch = useDispatch();

	return (
		<div className={s.searchWrap}>
			<div className={s.search}>
				<label className={s.label}>
					<span>Search by name</span>
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
