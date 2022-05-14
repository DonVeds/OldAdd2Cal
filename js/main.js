function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

let Title = getQueryVariable("T");
let TAD = getQueryVariable("TAD");
let D = getQueryVariable("D");
let FH = getQueryVariable("FH");
let SH = getQueryVariable("SH");
let MID = getQueryVariable("MID");
let P = getQueryVariable("P");
let Dur = getQueryVariable("Dur");

if (Title == false || TAD == false || D == false || FH == false || SH == false || MID == false || P == false || Dur == false) {
  document.getElementById("MeetingContainer").classList.add("is-hidden");
  throw new Error("Not full data in URL");
} else {
  document.getElementById("WarningContainer").classList.add("is-hidden");
}

let DateURL = TAD.substr(0, 2);
let MonthURL = TAD.substr(2, 2);
let YearURL = "20"+TAD.substr(4, 2);

let HourURL = parseInt(TAD.substr(6, 2));
let MinutesURL = parseInt(TAD.substr(8, 2));

let TADElement = document.getElementById("TADElement").innerHTML = `Время: ${DateURL}.${MonthURL}.${YearURL} ${HourURL}:${MinutesURL} Москва`;

let LinkElement = document.getElementById("LinkElement").innerHTML = `https://${D}.zoom.us/j/${FH}?pwd=${SH}`;

let MIDElement = document.getElementById("MIDElement").innerHTML = `Идентификатор конференции: ${MID.substr(0, 3)} ${MID.substr(3, 4)} ${MID.substr(7, 4)}`;

let PElement = document.getElementById("PElement").innerHTML = `Код доступа: ${P}`;


// Устанавливаем начальное время(Start Time)
let ST = `${HourURL}${MinutesURL}00`;

// Устанавливаем конечное время(End Time) сходя из параметра Dur из URL
let ET = ""

function CalcEndTime() {
  switch (Dur) {
    case "30":
      if (MinutesURL < 30) {
        ET = `${HourURL}${MinutesURL + 30}00`
      } else if(MinutesURL > 30) {
        ET = `${HourURL + 1}${MinutesURL - 30}00`
      } else {
        ET = `${HourURL + 1}${MinutesURL - 30}00`
      }
      break;
    case "60":
      ET = `${HourURL + 1}${MinutesURL}00`
      break;
    case "90":
      if (MinutesURL < 30) {
        ET = `${HourURL + 1}${MinutesURL + 30}00`
      } else if(MinutesURL > 30) {
        ET = `${HourURL + 2}${MinutesURL - 30}00`
      } else {
        ET = `${HourURL + 2}${MinutesURL - 30}00`
      }
      break;
    case "120":
      ET = `${HourURL + 2}${MinutesURL}00`
      break;
  }
}

CalcEndTime();

let TElement = document.getElementById("TElement").innerHTML = `${decodeURI(Title)}`;
let TimeElement = document.getElementById("TimeElement").innerHTML = `${HourURL}:${MinutesURL} - ${ET.substr(0, 2)}:${ET.substr(2, 2)}`;
let DateElement = document.getElementById("DateElement").innerHTML = `${DateURL}.${MonthURL}.${YearURL}`;

function AddToGoogleCalendar() {

  // Также нужно установить часовой пояс в ссылку
  window.location = `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${YearURL}${MonthURL}${DateURL}T${ST}MSK/${YearURL}${MonthURL}${DateURL}T${ET}MSK&text=${Title}&location&details=Подключиться+к+конференции+Zoom%0Ahttps://${D}.zoom.us/j/${FH}?pwd%3D${SH}%0AИдентификатор+конференции:+${MID.substr(0, 3)}+${MID.substr(3, 4)}+${MID.substr(7, 4)}%0AКод+доступа:+${P}&sf=true`;
};


function AddToICal(){

  // window.location = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0AURL:https://${D}.zoom.us/j/${FH}?pwd%3D${SH}%0ADTSTART:ST+'MSK'%0ADTEND:ET+'MSK'%0ASUMMARY:Zoom+meeting%0ADESCRIPTION:Подключиться+к+конференции+Zoom%0Ahttps://${D}.zoom.us/j/${FH}?pwd%3D${SH}%0AИдентификатор+конференции:+${MID.substr(0, 3)}+${MID.substr(3, 4)}+${MID.substr(7, 4)}%0AКод+доступа:+${P}%0ALOCATION:''%0AEND:VEVENT%0AEND:VCALENDAR`

  // window.location = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:https://avito.zoom.us/j/98620948242?pwd%253DVEcvcm5CeXRqVkV1QzdrYlBYOWVPQT09%0ADTSTART:20210603T160000MSK%0ADTEND:20210603T163000MSK%0ASUMMARY:Zoom%20meeting%0ADESCRIPTION:%D0%9F%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C%D1%81%D1%8F%20%D0%BA%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B8%20Zoom%20https://avito.zoom.us/j/98620948242?pwd%253DVEcvcm5CeXRqVkV1QzdrYlBYOWVPQT09%0A%D0%98%D0%B4%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B8:%20986+2094+8242%0A%D0%9A%D0%BE%D0%B4+%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0:+433077%0ALOCATION:%0AEND:VEVENT%0AEND:VCALENDAR`
  //                    data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:https://avito.zoom.us/j/91099365091?pwd%253DNVA1K05rbklkVldyMmx0QmxNNmZ2dz09%0ADTSTART:20210611153000MSK%0ADTEND:2021061117000MSK%0ASUMMARY:Zoom%20meeting%0ADESCRIPTION:%D0%9F%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C%D1%81%D1%8F%20%D0%BA%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B8%20Zoom%20https://avito.zoom.us/j/91099365091?pwd%253DNVA1K05rbklkVldyMmx0QmxNNmZ2dz09%20%D0%98%D0%B4%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B8:%20910%209936%205091%20%D0%9A%D0%BE%D0%B4%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0:%20743209%0ALOCATION:%0AEND:VEVENT%0AEND:VCALENDAR

  window.location = encodeURI(
    'data:text/calendar;charset=utf8,' + [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    'URL:' + `https://${D}.zoom.us/j/${FH}?pwd%3D${SH}`,
    'DTSTART:' + YearURL + MonthURL + DateURL + "T" + ST + 'MSK',
    'DTEND:' + YearURL + MonthURL + DateURL + "T" + ET + 'MSK',
    'SUMMARY:' + decodeURI(Title),
    'DESCRIPTION:' + `Подключиться к конференции Zoom https://${D}.zoom.us/j/${FH}?pwd%3D${SH} Идентификатор конференции: ${MID.substr(0, 3)} ${MID.substr(3, 4)} ${MID.substr(7, 4)} Код доступа: ${P}`,
    'LOCATION:' + '',
    'END:VEVENT',
    'END:VCALENDAR'].join('\n'))
};

function copyZoomLinkToClipboard(){
  var text = `Время: ${DateURL}.${MonthURL}.${YearURL} ${HourURL}:${MinutesURL} Москва\nПодключиться к конференции Zoom\nhttps://${D}.zoom.us/j/${FH}?pwd=${SH}\nИдентификатор конференции: ${MID.substr(0, 3)} ${MID.substr(3, 4)} ${MID.substr(7, 4)}\nКод доступа: ${P}`;
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}