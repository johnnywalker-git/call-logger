import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import fetchByDate from '../utility/fetchByDate';
import getSearchableDate from '../utility/getSearchableDate';

const SearchCalendar = ({setSearchActive, setFilteredCalls, setShowCalendar}) => {

    const searchByDate = async (e) => {
        const selectedDate = e.format('YYYY-MM-DD'); // Format the Day.js object to match the expected format
        try {
          const dateData = await fetchByDate(selectedDate);
          setFilteredCalls(dateData)
          setSearchActive("Yes")
          setShowCalendar(false)
        } catch (error) {
          console.log(error);
        }
      }

    return <div className='calendar-mui'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar defaultValue={dayjs(getSearchableDate())}  onChange={(e) => {searchByDate(e)}} />
    
      </LocalizationProvider> 
      </div>
}

export default SearchCalendar