/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2020-04-07
 */
import Services from "./Services.js";
import Charting from "../modules/Charting.js";
import Trends from "../modules/Trends.js";

class Dashboard extends Services {

    constructor() {
        super();
    }

    getConfiguredTrends = () => {
        return this.configuredTrends;
    }
    setConfiguredTrends = (t) => {
        this.configuredTrends = t;
    }


    buildDashboard = (dashboard) => {
        // Refresh Page after 5 minutes
        setTimeout(() => {
            alert("Reloading Page");
            location.reload();
        }, 300000);

        
        let userId = "";

        if (document.cookie.split('; ').find(c => c.startsWith('userId'))) {
            userId = document.cookie.split('; ').find(c => c.startsWith('userId')).split('=')[1];
        }

        let userType = 0;
        if (document.cookie.includes('; ') && document.cookie.includes('userType')) {
            userType = document.cookie.split('; ').find(c => c.startsWith('userType')).split('=')[1];
            
        }

        /*
        setInterval(() => {
            this.checkDataPoints(1,1);
        }, 3000);
        */
        if (userType < 1) {
            const charting = new Charting();
            const trends = new Trends();

            let visibleTrends = [];
            
            let userTrend = trends.getConfiguredTrends (null, userId)
            .then(userTrends => {
                // Array of only visible trends under Trends.
                const visibleTrends = userTrends.filter(userTrend => parseInt(userTrend.isVisible));

                visibleTrends.forEach(visibleTrend => {

                    trends.getUserConfiguredTrends(visibleTrend.id)
                    .then(userConfiguredTrend => {

                        const visibleUserTrends = userConfiguredTrend.filter(userTrend => parseInt(userTrend.isVisible));
                        
        
                        if (visibleUserTrends.length) {
                            visibleUserTrends.forEach(trend => {

                                let durationEndDateTime = "2022-02-01 16:00:00";

// NEED to work on the bullet chart so the duration matches.

                                let durationStartDateTime = new Date(durationEndDateTime);
                                durationStartDateTime = durationStartDateTime.setHours(durationStartDateTime.getHours() - trend.operationalDuration);
                                durationStartDateTime = new Date(durationStartDateTime);
                                durationStartDateTime = durationStartDateTime.toLocaleDateString("fr-CA") + " " + durationStartDateTime.getHours() + ":" + ("0" +durationStartDateTime.getMinutes()).slice(-2) + ":" + ("0" + durationStartDateTime.getSeconds()).slice(-2);
                                
                                
                                trend.operationalEndTime = durationStartDateTime;

                                trend.operationalStartTime = durationEndDateTime;


                                /*
                                let durationEndDateTime = new Date(trend.operationalStartTime);
                                durationEndDateTime = durationEndDateTime.toLocaleDateString("fr-CA") + " " + durationEndDateTime.getHours() + ":" + ("0" + durationEndDateTime.getMinutes()).slice(-2) + ":" + ("0" + durationEndDateTime.getSeconds()).slice(-2);

                                let durationStartDateTime = new Date(trend.operationalStartTime);
                                durationStartDateTime = durationStartDateTime.setHours(durationStartDateTime.getHours() - trend.operationalDuration);
                                durationStartDateTime = new Date(durationStartDateTime);
                                durationStartDateTime = durationStartDateTime.toLocaleDateString("fr-CA") + " " + durationStartDateTime.getHours() + ":" + ("0" +durationStartDateTime.getMinutes()).slice(-2) + ":" + ("0" + durationStartDateTime.getSeconds()).slice(-2);

                                trend.operationalEndTime = durationStartDateTime;
                                */
                                // Draws Bullet Charts Once
                                trends.getUserConfiguredTrendAverages(trend)
                                .then(response => {
                                    
                                    if (response) {

                                        trend.latestDataPointValue = response.latestDataPoint;
                                        trend.currentAverageValue = response.currentAverage;
                                        trend.averageValue = response.average;
                                        
                                        trend.unit = visibleTrend.unit;
                                        trend.trendName = visibleTrend.trendName;
                                        trend.durationStartDateTime = durationStartDateTime;
                                        trend.durationEndDateTime = durationEndDateTime;

                                        const bulletChartDiv = document.createElement("div");
                                        bulletChartDiv.setAttribute("id", "bulletChart" + trend.id);
                                        bulletChartDiv.setAttribute("class", "col-md-6 m-2 p-1");
                                        bulletChartDiv.innerHTML = `<p style="font-weight: bold">` + trend.trendName + ` <span style="color: #e8ab02">(Latest Data Point: ` + trend.latestDataPointValue + trend.unit
                                                                + `)</span><br/><span style="font-size: 85%; color: #aaa">Duration: ${trend.durationStartDateTime} - ${trend.durationEndDateTime}</span></p>`;
                                        // Need to append to dashboard to get the clientWidth.                        
                                        dashboard.append(bulletChartDiv);

                                        // Creates Bullet Chart
                                        let bulletChart = charting.getBulletChart(bulletChartDiv, trend);
                                        dashboard.append(bulletChart);
                                        /*
                                        const bulletChartDiv = document.createElement("div");
                                        bulletChartDiv.setAttribute("id", "bulletChart" + trend.id);
                                        bulletChartDiv.setAttribute("class", "col-md-6 m-2 p-1");
                                        bulletChartDiv.innerHTML = `<p style="font-weight: bold">` + visibleTrend.trendName + ` <span style="color: #e8ab02">(Latest Data Point: ` + trend.latestDataPointValue + trend.unit
                                                                + `)</span><br/><span style="font-size: 85%; color: #aaa">Duration: ${durationStartDateTime} - ${durationEndDateTime}</span></p>`;
                
                                        dashboard.append(bulletChartDiv);

                                        console.log(trend);
                
                                        charting.getBulletChart(bulletChartDiv, trend);
                                        */
                                        //console.log(visibleTrend.sensorId, trend.operationalEndTime, trend.operationalStartTime);
                                        // Creates Line Chart
                                        let trendRawDataChart = document.createElement("div");
                                        trendRawDataChart.setAttribute("id", "lineChartTrend" + trend.id);
                                        trendRawDataChart.setAttribute("class", "col-md-5");
                                        
                                        ////let sesnorChart = charting.getSensorChart(trendRawDataChart, visibleTrend.sensorId, trend.operationalEndTime, trend.operationalStartTime);

                                        let sesnorChart = charting.getTrendLineChart(trendRawDataChart, trend.trendId, trend.operationalStartTime, trend.operationalEndTime);

                                        //console.log(sesnorChart);
                                        //trendRawDataChart.append(sesnorChart);
                                        dashboard.append(trendRawDataChart);
                                                    

                                    }
                                    else {
                                        alert("invalid date");
                                    }
                                    
                                })
                                .catch(e => console.error(e));

                            });
                        }
                        

                        // Redraw
                        let i = 0; // REMOVE in Production

                        const refreshRate = 10; // Seconds

                        let trendsInterval = setInterval(() => {
                            i++; // REMOVE in Production
                            //console.log("check", visibleUserTrends); // REMOVE in Production

                            //document.querySelector("#bulletChart" + trend.id)
                            
                                // Check to see if there was a change to the sensors data point count.
                                //console.log("check", visibleTrend.id, visibleTrend.userId, visibleTrend.sensorId);
                                this.checkDataPointCount(visibleTrend.id, visibleTrend.userId, visibleTrend.sensorId)
                                .then(result => {
                                    //console.log("check", visibleTrend.id);
                                    console.log("result", result.changed);
                                    // There's a change in the data point count, re-draw bullet charts.
                                    //console.log(result.changed);
                                    if (result.changed == 'true') {
                                        
                                        //console.log("Change");
                                        // Gets new trend bullet charts.
                                        visibleUserTrends.forEach(trend => {
                                            console.log("trend.length", trend);
                                            //if (trend.length) {
                                                result.maximum = "2022-02-01 16:00:00";

                                                let durationStartDateTime = new Date(result.maximum);
                                                durationStartDateTime = durationStartDateTime.setHours(durationStartDateTime.getHours() - trend.operationalDuration);
                                                durationStartDateTime = new Date(durationStartDateTime);
                                                durationStartDateTime = durationStartDateTime.toLocaleDateString("fr-CA") + " " + durationStartDateTime.getHours() + ":" + ("0" +durationStartDateTime.getMinutes()).slice(-2) + ":" + ("0" + durationStartDateTime.getSeconds()).slice(-2);
                                                
                                                
                                                trend.operationalEndTime = durationStartDateTime;

                                                trend.operationalStartTime = result.maximum;


                                                /*
                                                let durationEndDateTime = new Date(trend.operationalStartTime);
                                            //    durationEndDateTime.setSeconds(durationEndDateTime.getSeconds() + 10);
                                                durationEndDateTime = durationEndDateTime.toLocaleDateString("fr-CA") + " " + durationEndDateTime.getHours() + ":" + ("0" + durationEndDateTime.getMinutes()).slice(-2) + ":" + ("0" + durationEndDateTime.getSeconds()).slice(-2);
                    
                                                //trend.operationalStartTime = result.maximum;

                                                let durationStartDateTime = new Date(trend.operationalStartTime);
                                                durationStartDateTime = durationStartDateTime.setHours(durationStartDateTime.getHours() - trend.operationalDuration);
                                                durationStartDateTime = new Date(durationStartDateTime);
                                                durationStartDateTime = durationStartDateTime.toLocaleDateString("fr-CA") + " " + durationStartDateTime.getHours() + ":" + ("0" +durationStartDateTime.getMinutes()).slice(-2) + ":" + ("0" + durationStartDateTime.getSeconds()).slice(-2);
                    
                                                //trend.operationalStartTime = trend.operationalEndTime;

                                                trend.operationalEndTime = durationStartDateTime;
                                                */
                                                

                                                document.querySelector("#bulletSvgChart" + trend.id).remove();

                                                //console.log("trend", trend);
                                                //console.log("durationEndDateTime", durationEndDateTime, "durationStartDateTime", durationStartDateTime);

                                                trends.getUserConfiguredTrendAverages(trend)
                                                .then(response => {

                                                    console.log(trend.operationalStartTime, trend.operationalEndTime);
                                                    
                                                    if (response) {

                                                        trend.latestDataPointValue = response.latestDataPoint;
                                                        trend.currentAverageValue = response.currentAverage;
                                                        trend.averageValue = response.average;
                                                        trend.unit = visibleTrend.unit;
                                                        const bulletChartDiv = document.querySelector("#bulletChart" + trend.id);
                                                        // Recreates Bullet Chart
                                                        charting.getBulletChart(bulletChartDiv, trend);

                                                        // Recreates Line Chart
                                                        //console.log(visibleTrend.sensorId, trend.operationalEndTime, trend.operationalStartTime);
                                                        let trendRawDataChart = document.querySelector("#lineChartTrend" + trend.id);
                                                        //console.log(trendRawDataChart);
                                                        //let sesnorChart = charting.getSensorChart(trendRawDataChart, visibleTrend.sensorId, trend.operationalEndTime, trend.operationalStartTime);
                                                        //trendRawDataChart.append(sesnorChart);

                                                        //console.log("durationEndDateTime", durationEndDateTime, "durationStartDateTime", durationStartDateTime);
                                                        let sesnorChart = charting.getTrendLineChart(trendRawDataChart, trend.trendId, trend.operationalStartTime, trend.operationalEndTime);
                                                        
                                                        //dashboard.append(trendRawDataChart);

                                                        
                                                    }
                                                    else { alert("invalid date"); }
                                                    
                                                })
                                                .catch(e => console.error(e));
                                            //}
                                            
                                        });

                                    }
                                    else {
                                        //console.log("No Change");
                                    }
                                })
                                .catch(e => console.error(e));
                            

                            // REMOVE in Production
                            /*
                            if (i == 10) {
                                clearInterval(trendsInterval);
                            }
                            */
                            // Checks every 3 seconds
                        }, refreshRate * 1000);

                    })
                    .catch(e => console.error(e));

                })
                
            })
            .catch(e => console.error(e));
            
        }
        
    }

    checkDataPointCount = async (trendId, userId, sensorId) => {
        //console.log("check");
        return await this.getApi("DataPoints", "checkDataPointCount", "trendId=" + trendId + "&userId=" + userId + "&sensorId=" + sensorId)
        .then(response => response)
        .catch(e => console.error(e));
    }
    
}

export default Dashboard;