
import moment from 'moment';

const diffDays =  (date) => {  
    
    let firstDate = moment(); //Create date using string-format constructor
    let secondDate = moment(date);
    let duration = moment.duration(secondDate.diff(firstDate));
    let days = duration.asDays();

    console.log(days);
    return days;
    
}

const diffYears =  (date) => {   
    
    let firstDate = moment(); //Create date using string-format constructor
    let secondDate = moment(date);
    let duration = moment.duration(secondDate.diff(firstDate));
    let years = duration.asYears();
    return years;
    
}

const daysToYears =  (days) => {   
    
    let firstDate = moment(); //Create date using string-format constructor
    let secondDate = moment().add(days, 'days');
    let duration = moment.duration(secondDate.diff(firstDate));
    let years = duration.asYears();
    return years;
    
}
 
 export default {diffDays: diffDays, diffYears: diffYears, daysToYears:daysToYears};