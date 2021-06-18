import Trends from "../modules/Trends.js";

const trends = new Trends();

const url = new URLSearchParams(document.location.search);
const userId = url.get("userId");
const sensorId = url.get("sensorId");

trends.listTrends(sensorId, userId);
    

