import Trends from "../modules/Trends.js";

const trends = new Trends();

const url = new URLSearchParams(document.location.search);
const trendId = url.get("trendId");
const sensorId = url.get("sensorId");
const userId = url.get("userId");

trends.listConfiguredTrend(trendId, sensorId, userId);
