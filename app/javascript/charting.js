import Sensor from "../modules/Sensor.js";
import Charting from "../modules/Charting.js";

const sensor = new Sensor();
const charting = new Charting();

charting.getMinMaxDates();

charting.getSensorChart(null, null);


