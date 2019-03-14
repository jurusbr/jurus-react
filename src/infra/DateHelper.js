
import moment from 'moment';

const diffDays =  (date) => {   
    
    console.log(date)

    let firstDate = moment(); //Create date using string-format constructor
    let secondDate = moment(date);
    let duration = moment.duration(secondDate.diff(firstDate));
    let days = duration.asDays();

    console.log(days);
    return days;
    
}
 
 export default {diffDays: diffDays};