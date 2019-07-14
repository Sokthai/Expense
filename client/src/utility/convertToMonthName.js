const month = [
    "January", "Feburday", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

export function getMonthName(m){
    return month[m];
}

export function getMonthYear(date){
    let year = date.getFullYear();
    let m = date.getMonth();
    return getMonthName(m) + " " + year;
}

export function getMonthByName(mName){
    for (let i = 0 ; i < month.length; i++){
        if (month[i] === mName){
            return i;
        }
    }
    return -1;
}




