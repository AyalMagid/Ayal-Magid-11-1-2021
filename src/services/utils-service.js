export const utilsService = {
    getDayByWord
};

function getDayByWord(dayNum){
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return week[dayNum]
}