const compare = (a, b) => {
    if ( a.points < b.points ){
        return 1;
    }
    if ( a.points > b.points ){
        return -1;
    }
    return 0;
}

export const sheetProcessing = (text) => {
    //text = text.replaceAll('\n', ' ').split(' ')
    const id_accounts = [];
    text = text.split('\n')
    for (let i = 0; i < text.length; i++) {
        let temp = text[i].split(' ')
        if (temp.length === 4) {
            id_accounts.push({id: temp[0], points: Number(temp[1]), hall: temp[2] + ' ' + temp[3]})
        }
        else if (temp.length === 5) { // Great Basin
            id_accounts.push({id: temp[0], points: Number(temp[1]), hall: temp[2] + ' ' + temp[3] + ' ' + temp[4]})
        }
    }
    return id_accounts.sort( compare );
}

export const monthProcessing = (text) => {
    let dict = {}
    text = text.split('\n')
    for (let i = 0; i < text.length; i++) {
        let temp = text[i].split(' ')
        // id_accounts.push({id: temp[0], points: Number(temp[1]), hall: temp[2] + ' ' + temp[3]})
        dict[temp[0]] = Number(temp[1]);
    }
    return dict;
}

export const monthSetter = (dict, users) => {
    let monthAccounts = [];
    for (let i = 0; i < users.length; i++) {
        let temp = JSON.parse(JSON.stringify(users[i]));
        monthAccounts.push(temp)
        if (monthAccounts[monthAccounts.length - 1]['id'] in dict) {
            monthAccounts[monthAccounts.length - 1]['points'] = monthAccounts[monthAccounts.length - 1]['points'] - dict[monthAccounts[monthAccounts.length - 1]['id']];
        }
    }
    return monthAccounts.sort( compare );
}

export const sortByHall = (data, hall) => {
    // console.log('Hello?')
    hall = hall['value']
    // console.log(hall)
    // console.log(data);
    let output = []
    for (let i = 0; i < data.length; i++) {
        if (data[i]['hall'] === hall || hall === 'All Halls') {
            // console.log('?')
            output.push(data[i]);
        }
    }
    return output;
}

// THE FUNCTIONS BELOW ARE USE FOR CALENDAR //

const timeProcessing = (date, time) => {
    date = date.split('T')[0].split('-')
    time = time.replaceAll(' ', '').split('-')
    let start = time[0].split(':')
    let end = time[1].split(':')
    return [new Date(date[0], date[1] - 1, date[2], start[0], start[1], 0), new Date(date[0], date[1] - 1, date[2], end[0], end[1], 0)]
}


export const grabStudyHours = (data) => {
    let events = []
    data = data[0]
    for (let i = 1; i < data.length; i++) {
        let event = data[i]
        let startAndEnd = timeProcessing(event[2], event[3])
        events.push({
            title: event[0],
            location: event[1],
            start: startAndEnd[0],
            end: startAndEnd[1],
            descr: event[4],
            tier: event[5]
        })
    }
    return events
}
