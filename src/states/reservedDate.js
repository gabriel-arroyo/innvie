import { atom } from "jotai";
import { getTomorrowDate, getCurrentDate } from "tools/getDate";

export const reservedStartDate = atom(getCurrentDate());
export const reservedEndDate = atom(getTomorrowDate());
export const reservedDays = atom(1);
