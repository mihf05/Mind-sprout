export default function disableBtn(state: any): boolean{
    for (const subjectKey in state) {
        const subject = state[subjectKey];
        for (const paperKey in subject) {
            const paper = subject[paperKey];
            if(paper.length !== 0) return false; 
        }
    }
    return true
};
