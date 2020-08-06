import { Injectable } from "@angular/core";
import { isMoment } from "moment";

@Injectable({
  providedIn: "root",
})
export class DateFormatService {
  constructor() {}

  dateToArray(date: Date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  }

  arrayToDate(array) {
    if (!array) {
      return;
    }
    return new Date(array[0], array[1] - 1, array[2]);
  }

  arrayOrStringToDate(elem) {
    if (isMoment(elem)) {
      return elem.toDate();
    }
    if (elem && elem instanceof Date) {
      return elem;
    }
    if (elem && typeof elem === "string") {
      return new Date(elem);
    }
    return this.arrayToDate(elem);
  }

  returnDate(item) {
    if (item && item._isAMomentObject) {
      return new Date(item);
    }
    if ((item && !item[0]) || !item) {
      return item;
    }
    return new Date(item[0], item[1] - 1, item[2]);
  }
  monthStringToNumber(month: string): number | string {
    switch (month.toLowerCase()) {
      case "janeiro": {
        return 0;
      }
      case "fevereiro": {
        return 1;
      }
      case "março": {
        return 2;
      }
      case "abril": {
        return 3;
      }
      case "maio": {
        return 4;
      }
      case "junho": {
        return 5;
      }
      case "julho": {
        return 6;
      }
      case "agosto": {
        return 7;
      }
      case "setembro": {
        return 8;
      }
      case "outubro": {
        return 9;
      }
      case "novembro": {
        return 10;
      }
      case "dezembro": {
        return 11;
      }
      default:
        return month;
    }
  }
}
