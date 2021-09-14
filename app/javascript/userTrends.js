import Trends from "../modules/Trends.js";

const trends = new Trends();

const url = new URLSearchParams(document.location.search);
const userId = url.get("userId");
const trendId = url.get("trendId");

trends.listUserConfiguredTrends(trendId, userId);
