import moment from "moment";
import "moment/locale/pt-br";

export const calculateTimeDifference = (launchDate, includeDays = true, includeHours = true, includeMinutes = true, includeSeconds = true) => {
    const currentDate = moment();
    const launchMoment = moment(launchDate);
    const duration = moment.duration(currentDate.diff(launchMoment));

    const seconds = duration.seconds();
    const minutes = duration.minutes();
    const hours = duration.hours();
    const days = duration.days();

    let timeDifference = "";

    if (includeDays && days > 0) {
        timeDifference += `${days} ${days === 1 ? "day" : "days"}`;
    }

    if (includeHours && hours > 0) {
        timeDifference += `${timeDifference.length > 0 ? ", " : ""}${hours} ${hours === 1 ? "hour" : "hours"}`;
    }

    if (includeMinutes && minutes > 0) {
        timeDifference += `${timeDifference.length > 0 ? ", " : ""}${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    }

    if (includeSeconds && seconds > 0) {
        timeDifference += `${timeDifference.length > 0 ? ", " : ""}${seconds} ${seconds === 1 ? "second" : "seconds"}`;
    }

    return timeDifference.length > 0 ? `${timeDifference} ago` : "Just now";
};
