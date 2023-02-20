export type subjectType = {["1st"] : string[], ["2nd"] : string[], ["subjectName"] : string}

const physics: subjectType = {
    "subjectName": "Physics",
    "1st" : ["2nd", "4th", "5th", "6th", "7th", "8th", "10th"],
    "2nd" : ["1st", "2nd", "3rd", "7th", "8th", "9th", "10th"],
}

const chemistry: subjectType = {
    "subjectName": "Chemistry",
    "1st" : ["2nd", "3rd", "4th", "5th"],
    "2nd" : ["1st", "2nd", "3rd", "4th"],
}
const higherMath: subjectType = {
    "subjectName": "Higher math",
    "1st" : ["1st", "3rd", "4th", "7th", "9th", "10th"],
    "2nd" : ["3rd", "4th", "6th", "7th", "8th", "9th"],
}
export const subjectRef = [physics, chemistry, higherMath];

export type stateType = {
    [key: string] : {
        "1st" : string[]
        "2nd" : string[]
    }
}

export const emptyState: stateType = {
    "Physics": {"1st": [], "2nd": []},
    "Chemistry": {"1st": [], "2nd": []},
    "Higher math": {"1st": [], "2nd": []},
}

export const cqCount = 4;
export const timeInMin = 40;


export const defaultAppData = {
    loginStreak: {
        lastLoggedIn : '',
        streak: 1,
    },

    "chapter wise": {
        "Physics": { "1st" : [], "2nd" : [] },
        "Chemistry": { "1st" : [], "2nd" : [] },
        "Higher math": { "1st" : [], "2nd" : [] }
    },

    "subject wise": {
        "Physics": { "1st" : [], "2nd" : [] },
        "Chemistry": { "1st" : [], "2nd" : [] },
        "Higher math": { "1st" : [], "2nd" : [] }
    },

    "quick start": {
        "Physics": { "1st" : ["all"], "2nd" : ["all"] },
        "Chemistry": { "1st" : ["all"], "2nd" : ["all"] },
        "Higher math": { "1st" : ["all"], "2nd" : ["all"] }
    },
}

export const defaultPracticeData =  {
    date: undefined,

    "chapter wise": {
        "Physics": { correct: 0, wrong: 0 },
        "Chemistry": { correct: 0, wrong: 0 },
        "Higher math": { correct: 0, wrong: 0 },
    },

    "subject wise": {
        "Physics": { correct: 0, wrong: 0 },
        "Chemistry": { correct: 0, wrong: 0 },
        "Higher math": { correct: 0, wrong: 0 },
    },

    "quick start": {
        "Physics": { correct: 0, wrong: 0 },
        "Chemistry": { correct: 0, wrong: 0 },
        "Higher math": { correct: 0, wrong: 0 },
    }
}


