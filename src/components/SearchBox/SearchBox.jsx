import { useDispatch, useSelector } from 'react-redux';
import s from './SearchBox.module.css';
import { changeFilter } from '../../redux/filtersSlice';
import { MdOutlinePersonSearch } from 'react-icons/md';
import { selectContacts, selectFilteredContacts, selectValueFilter } from '../../redux/selectors';

const SearchBox = () => {

	// Отримуємо початкове значення зі стора
	const filterValue = useSelector(selectValueFilter);

	const dispatch = useDispatch();

	const allContacts = useSelector(selectContacts).length;
	const filteredContacts = useSelector(selectFilteredContacts).length;

	return (
		<div className={s.searchWrap}>
			<div className={s.search}>
				<h3 className={s.title}>Search by name or number</h3>
				<label className={s.label}>
					<div className={s.fieldWrap}>
						<input
							className={s.field}
							type="text"
							value={filterValue}
							autoComplete="off"
							placeholder={`Search amoung ${allContacts} contacts`}
							onChange={(evt) => dispatch(changeFilter(evt.target.value))}
						/>
						<MdOutlinePersonSearch className={s.fieldIcon} />
						<span className={`${s.floatingLabel} ${filterValue ? s.isActive : ''}`}><span>{filteredContacts}</span> contact{filteredContacts === 1 ? "" : "s"} found</span>
					</div>
				</label>
			</div>
		</div>
	)
}

export default SearchBox
