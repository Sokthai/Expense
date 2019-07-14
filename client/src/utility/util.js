import {getMonthByName} from './convertToMonthName';

export const sortArray = (array) => {
    
    
    // console.log(array);
    array.sort((a, b) => {
        let aa = a.month.split(" ");
        let bb = b.month.split(" ");
        let am = new Date(aa[1], getMonthByName(aa[0]));
        // console.log(am);
        let bm = new Date(bb[1], getMonthByName(bb[0]));
        // console.log(bm);
        // console.log('bm %s , am %s , %s', bm, am, bm > am);

        return (bm < am)? -1 : ((bm > am)? 0 : 1);
    })
    // console.log(array);

}