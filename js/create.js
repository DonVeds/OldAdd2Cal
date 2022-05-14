function create(){
  let ZoomTitle = document.getElementById("ZoomTitle").value;

  let ZoomLink = document.getElementById("ZoomLink").value.split(/\r?\n/);

  //Выделил нужные строчки для последующей обработки
  let TimeAndDateLine = ZoomLink[0];
  let LinkLine = ZoomLink[2];
  let MeetingIDLine = ZoomLink[3];
  let PasscodeLine = ZoomLink[4];

  let TimeAndDateArr = TimeAndDateLine.split(/[ ]+/);
  let TimeAndDate = "";
  //Начинаем преобразовывать строку с временем, сразу убираем первый и последний элемент
  for (i = 1; i <= 4; i++) {
    //Преобразуем односимвольные числа месяца в двусимвольные
    if (i == 1) {
      switch (TimeAndDateArr[1]) {
        case "1":
          TimeAndDateArr[1] = "01";
          break;
        case "2":
          TimeAndDateArr[1] = "02";
          break;
        case "3":
          TimeAndDateArr[1] = "03";
          break;
        case "4":
          TimeAndDateArr[1] = "04";
          break;
        case "5":
          TimeAndDateArr[1] = "05";
          break;
        case "6":
          TimeAndDateArr[1] = "06";
          break;
        case "7":
          TimeAndDateArr[1] = "07";
          break;
        case "8":
          TimeAndDateArr[1] = "08";
          break;
        case "9":
          TimeAndDateArr[1] = "09";
          break;
      }
    }

    //Преобразуем литеральные названия месяцев в числовые двусимвольные
    if (i == 2) {
      switch (TimeAndDateArr[2]) {
        case "янв.":
          TimeAndDateArr[2] = "01";
          break;
        case "фев.":
          TimeAndDateArr[2] = "02";
          break;
        case "мар.":
          TimeAndDateArr[2] = "03";
          break;
        case "апр.":
          TimeAndDateArr[2] = "04";
          break;
        case "мая":
          TimeAndDateArr[2] = "05";
          break;
        case "июн.":
          TimeAndDateArr[2] = "06";
          break;
        case "июл.":
          TimeAndDateArr[2] = "07";
          break;
        case "авг.":
          TimeAndDateArr[2] = "08";
          break;
        case "сен.":
          TimeAndDateArr[2] = "09";
          break;
        case "окт.":
          TimeAndDateArr[2] = "10";
          break;
        case "ноя.":
          TimeAndDateArr[2] = "11";
          break;
        case "дек.":
          TimeAndDateArr[2] = "12";
          break;
      }
    }

    //сократил год до 2 символов
    if (i == 3) {
      TimeAndDateArr[3] = TimeAndDateArr[3].slice(2);
    }

    //убрал двоеточие у времени до обеда
    if ((i == 4) & (TimeAndDateArr[5] == "AM")) {
      TimeAndDateArr[4] = TimeAndDateArr[4].replace(/[:]/g, "");
    }

    //перевел 12 часовой формат в 24 часовой + убрал двоеточие
    if ((i == 4) & (TimeAndDateArr[5] == "PM")) {
      let time = TimeAndDateArr[4].split(/[:]+/);

      switch (time[0]) {
        case "01":
          TimeAndDateArr[4] = "13" + time[1];
          break;
        case "02":
          TimeAndDateArr[4] = "14" + time[1];
          break;
        case "03":
          TimeAndDateArr[4] = "15" + time[1];
          break;
        case "04":
          TimeAndDateArr[4] = "16" + time[1];
          break;
        case "05":
          TimeAndDateArr[4] = "17" + time[1];
          break;
        case "06":
          TimeAndDateArr[4] = "18" + time[1];
          break;
        case "07":
          TimeAndDateArr[4] = "19" + time[1];
          break;
        case "08":
          TimeAndDateArr[4] = "20" + time[1];
          break;
        case "09":
          TimeAndDateArr[4] = "21" + time[1];
          break;
        case "10":
          TimeAndDateArr[4] = "22" + time[1];
          break;
        case "11":
          TimeAndDateArr[4] = "23" + time[1];
          break;
        case "12":
          TimeAndDateArr[4] = "00" + time[1];
          break;
      }
    }

    //получил готовый набор цифр(дата и время) для передачи в URL
    TimeAndDate += TimeAndDateArr[i];
  }

  // получил домен аккаунта зума
  let Domain = LinkLine.substring(
    LinkLine.lastIndexOf("://") + 3,
    LinkLine.lastIndexOf(".zoom")
  );

  // получил первую часть символов ссылки
  let FirstHash = LinkLine.substring(
    LinkLine.lastIndexOf("/j/") + 3,
    LinkLine.lastIndexOf("?pwd=")
  );

  // получил вторую часть символов ссылки
  let SecondHash = LinkLine.substring(LinkLine.lastIndexOf("?pwd=") + 5);

  // получил идентификатор конференции без пробелов 
  // как-то заработало, но нужно будет сделать более лаконично 
  let MeetingID = MeetingIDLine.substring(
    LinkLine.lastIndexOf("конференции:") + 27
    ).replace(/\s+/g, "");

  let Passcode = PasscodeLine.split(/[ ]+/)[2];

  let Duration = document.getElementById("DurationSelect").value.split(/[ ]+/)[0];
  console.log(Duration)

  window.location = `index.html?T=${ZoomTitle}&TAD=${TimeAndDate}&D=${Domain}&FH=${FirstHash}&SH=${SecondHash}&MID=${MeetingID}&P=${Passcode}&Dur=${Duration}`;
};

// input.oninput = function () {
//   document.getElementById("result").innerHTML = input.value;
// };
