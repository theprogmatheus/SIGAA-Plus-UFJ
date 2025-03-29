const DAYS = { // 2 3 4 5 6 7 8
    2: "Segunda",
    3: "Terça",
    4: "Quarta",
    5: "Quinta",
    6: "Sexta",
    7: "Sábado",
    8: "Domingo"
}

const TURNS = {// M, T, N
    M: {
        1: {
            min: "07:30",
            max: "08:20"
        },
        2: {
            min: "08:20",
            max: "09:10"
        },
        3: {
            min: "09:30",
            max: "10:20"
        },
        4: {
            min: "10:20",
            max: "11:10"
        },
        5: {
            min: "11:10",
            max: "12:00"
        }
    }, // 07:30-08:20, 08:20-09:10, 09:30-10:20, 10:20-11:10, 11:10-12:00

    T: {
        1: {
            min: "13:30",
            max: "14:20"
        },
        2: {
            min: "14:20",
            max: "15:10"
        },
        3: {
            min: "15:30",
            max: "16:20"
        },
        4: {
            min: "16:20",
            max: "17:10"
        },
        5: {
            min: "17:10",
            max: "18:00"
        },
        6: {
            min: "18:00",
            max: "18:50"
        }
    }, // 13:30-14:20, 14:20-15:10, 15:30-16:20, 16:20-17:10, 17:10-18:00, 18:00-18:50

    N: {
        1: {
            min: "19:00",
            max: "19:50"
        },
        2: {
            min: "19:50",
            max: "20:40"
        },
        3: {
            min: "21:00",
            max: "21:50"
        },
        4: {
            min: "21:50",
            max: "22:40"
        }
    } // 19:00-19:50, 19:50-20:40, 21:00-21:50, 21:50-22:40
}


export function parse(input) {

    console.log(`Processando o horário: ${input}`)

    let o = p(input);
    if (o) {
        console.log(`Horário processado:`)
        console.log(o)

        let days = o.days;
        let schedules = o.schedules;


        let stringBuilder = "";

        for (let i = 0; i < days.length; i++) {
            let day = days[i];
            if (i != 0) {
                stringBuilder += ", ";
            }
            stringBuilder += day;
        }

        stringBuilder += " ";

        for (let i = 0; i < schedules.length; i++) {
            let schedule = schedules[i];
            if (i != 0) {
                stringBuilder += ", ";
            }
            stringBuilder += `das ${schedule.min} as ${schedule.max}`;
        }

        return stringBuilder;
    }

    return input;
}

export function p(input) {

    if (!isValidSIGAASchedule(input)) return null;

    let turn;
    let days = [];
    let schedules = [];

    for (let i = 0; i < input.length; i++) {
        let theChar = input.charAt(i);

        if (isValidInteger(theChar)) {

            if (turn) {
                let schedule = { ...turn[theChar] };
                if (schedule && Object.keys(schedule).length > 0) {


                    if (schedules.length > 0) {
                        let lastSchedule = schedules[schedules.length - 1]

                        if (lastSchedule.max == schedule.min) { // horario seguido do outro
                            schedules[schedules.length - 1].max = schedule.max;
                        } else {
                            schedules.push(schedule)
                        }
                    } else {
                        schedules.push(schedule)
                    }
                }


            } else {
                let day = DAYS[theChar];
                if (day)
                    days.push(day)
            }

        } else {
            turn = TURNS[theChar];
        }
    }
    return { days, schedules };
}

function isValidSIGAASchedule(scheduleString) {
    const regex = /^\d+[MTN]\d+$/;
    return regex.test(scheduleString);
}

function isValidInteger(integer) {
    const regex = /^\d+$/;
    return regex.test(integer);
}

// Essa parte do código serve para testes através do Node.js
/*
const args = process.argv.slice(2);
if (args.length > 0) {
    console.log(parse(args[0]))
} else {
    console.log("Informe um horário no formato do SIGAA");
}
*/
