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
                // Array of only visible trends.
                const visibleTrends = userTrends.filter(userTrend => parseInt(userTrend.isVisible));

                visibleTrends.forEach(visibleTrend => {

                    trends.getUserConfiguredTrends(visibleTrend.id)
                    .then(userConfiguredTrend => {

                        const visibleUserTrends = userConfiguredTrend.filter(userTrend => parseInt(userTrend.isVisible));

                        visibleUserTrends.forEach(trend => {

                            let durationEndDateTime = new Date(trend.operationalStartTime);
                            durationEndDateTime = durationEndDateTime.toLocaleDateString("fr-CA") + " " + durationEndDateTime.getHours() + ":" + ("0" + durationEndDateTime.getMinutes()).slice(-2) + ":" + ("0" + durationEndDateTime.getSeconds()).slice(-2);

                            let durationStartDateTime = new Date(trend.operationalStartTime);
                            durationStartDateTime = durationStartDateTime.setHours(durationStartDateTime.getHours() - trend.operationalDuration);
                            durationStartDateTime = new Date(durationStartDateTime);
                            durationStartDateTime = durationStartDateTime.toLocaleDateString("fr-CA") + " " + durationStartDateTime.getHours() + ":" + ("0" +durationStartDateTime.getMinutes()).slice(-2) + ":" + ("0" + durationStartDateTime.getSeconds()).slice(-2);

                            trend.operationalEndTime = durationStartDateTime;

                            // Draws Bullet Charts Once
                            trends.getUserConfiguredTrendAverages(trend)
                            .then(response => {

                                if (response) {

                                    trend.latestDataPointValue = response.latestDataPoint;
                                    trend.currentAverageValue = response.currentAverage;
                                    trend.averageValue = response.average;
                                    
                                    trend.unit = visibleTrend.unit;
                                    
                                    const bulletChartDiv = document.createElement("div");
                                    bulletChartDiv.setAttribute("id", "bulletChart" + trend.id);
                                    bulletChartDiv.setAttribute("class", "col-md-6 m-2 p-1");
                                    bulletChartDiv.innerHTML = `<p style="font-weight: bold">` + visibleTrend.trendName + ` <span style="color: #e8ab02">(Latest Data Point: ` + trend.latestDataPointValue + visibleTrend.unit
                                                            + `)</span><br/><span style="font-size: 85%; color: #aaa">Duration: ${durationStartDateTime} - ${durationEndDateTime}</span></p>`;
            
                                    dashboard.append(bulletChartDiv);
            
                                    charting.getBulletChart(bulletChartDiv, trend);

                                }
                                else {
                                    alert("invalid date");
                                }
                                
                            })
                            .catch(e => console.error(e));
                            

                        });


                        //let i = 0; // REMOVE in Productions
                        let trendsInterval = setInterval(() => {
                            //i++; 
                            
                            // Check to see if there was a change to the sensors data point count.
                            this.checkDataPointCount(visibleTrend.userId, visibleTrend.sensorId)
                            .then(result => {
                                // There's a change in the data point count, re-draw bullet charts.
                                if (result) {

                                    //console.log("Change");
                                    // Gets new trend bullet charts.
                                    visibleUserTrends.forEach(trend => {

                                        let durationEndDateTime = new Date(trend.operationalStartTime);
                                        durationEndDateTime = durationEndDateTime.toLocaleDateString("fr-CA") + " " + durationEndDateTime.getHours() + ":" + ("0" + durationEndDateTime.getMinutes()).slice(-2) + ":" + ("0" + durationEndDateTime.getSeconds()).slice(-2);
            
                                        let durationStartDateTime = new Date(trend.operationalStartTime);
                                        durationStartDateTime = durationStartDateTime.setHours(durationStartDateTime.getHours() - trend.operationalDuration);
                                        durationStartDateTime = new Date(durationStartDateTime);
                                        durationStartDateTime = durationStartDateTime.toLocaleDateString("fr-CA") + " " + durationStartDateTime.getHours() + ":" + ("0" +durationStartDateTime.getMinutes()).slice(-2) + ":" + ("0" + durationStartDateTime.getSeconds()).slice(-2);
            
                                        trend.operationalEndTime = durationStartDateTime;
            
                                        document.querySelector("#bulletSvgChart" + trend.id).remove();

                                        trends.getUserConfiguredTrendAverages(trend)
                                        .then(response => {
                                            
                                            if (response) {

                                                trend.latestDataPointValue = response.latestDataPoint;
                                                trend.currentAverageValue = response.currentAverage;
                                                trend.averageValue = response.average;
                                                trend.unit = visibleTrend.unit;
                                                const bulletChartDiv = document.querySelector("#bulletChart" + trend.id);
                        
                                                charting.getBulletChart(bulletChartDiv, trend);

                                            }
                                            else { alert("invalid date"); }
                                            
                                        })
                                        .catch(e => console.error(e));
                                        
                                    });

                                }
                                else {
                                    //console.log("No Change");
                                }
                            })
                            .catch(e => console.error(e));
                            /*
                            if (i == 10) {
                                clearInterval(trendsInterval);
                            }
                            */
                            // Checks every 3 seconds
                        }, 3000);

                    })
                    .catch(e => console.error(e));

                })
                
            })
            .catch(e => console.error(e))
            
        }
        
    }

    checkDataPointCount = async (userId, sensorId) => {
        //console.log("check");
        return await this.getApi("DataPoints", "checkDataPointCount", "userId=" + userId + "&sensorId=" + sensorId)
        .then(response => response)
        .catch(e => console.error(e));
    }
    
}

export default Dashboard;