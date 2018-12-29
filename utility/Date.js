import React, { Component } from "react";
import { Alert } from "react-native";

export default class DateFinder extends Component {
  showDaily = () => {
    var datearray = [];
    var currentDate;

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    currentDate = year + "-" + month + "-" + date;
    datearray.push({ firstDate: currentDate, lastDate: currentDate });

    return datearray;
  };

  showWeekly = () => {
    var datearray = [];
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));

    var currentDate;

    var fdate = firstday.getDate();
    var fmonth = firstday.getMonth() + 1;
    var fyear = firstday.getFullYear();

    var ldate = lastday.getDate();
    var lmonth = new Date().getMonth() + 1;
    var lyear = lastday.getFullYear();

    firstday = fyear + "-" + fmonth + "-" + fdate;
    lastday = lyear + "-" + lmonth + "-" + ldate;
    datearray.push({ firstDate: firstday, lastDate: lastday });

    return datearray;
  };

  showMonthly = () => {
    var datearray = [];
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstday = new Date(y, m + 1, 1);
    var lastday = new Date(y, m + 1, 0);

    var fdate = firstday.getDate();
    var fmonth = lastday.getMonth() + 1;
    var fyear = new Date().getFullYear();

    var ldate = lastday.getDate();
    var lmonth = lastday.getMonth() + 1;
    var lyear = lastday.getFullYear();

    firstday = fyear + "-" + fmonth + "-" + fdate;
    lastday = lyear + "-" + lmonth + "-" + ldate;
    datearray.push({ firstDate: firstday, lastDate: lastday });

    return datearray;
  };

  showAll = () => {
    var datearray = [];
    firstday = "1970-1-1";
    lastday = "2199-1-1";
    datearray.push({ firstDate: firstday, lastDate: lastday });
    return datearray;
  };
}
