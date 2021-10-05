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

        const userId = document.cookie.split('; ').find(c => c.startsWith('userId')).split('=')[1];

        //console.log(userId);

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

                //console.log(visibleTrends);

                visibleTrends.forEach(visibleTrend => {

                    //console.log(visibleTrend.id);

                    trends.getUserConfiguredTrends(visibleTrend.id)
                    .then(userConfiguredTrend => {

                        //console.log(userConfiguredTrend);

                        const visibleUserTrends = userConfiguredTrend.filter(userTrend => parseInt(userTrend.isVisible));

                        visibleUserTrends.forEach(trend => {

                            let durationEndDateTime = new Date(trend.operationalStartTime);
                            durationEndDateTime = durationEndDateTime.toLocaleDateString("fr-CA") + " " + durationEndDateTime.getHours() + ":" + ("0" + durationEndDateTime.getMinutes()).slice(-2) + ":" + ("0" + durationEndDateTime.getSeconds()).slice(-2);

                            let durationStartDateTime = new Date(trend.operationalStartTime);
                            durationStartDateTime = durationStartDateTime.setHours(durationStartDateTime.getHours() - trend.operationalDuration);
                            durationStartDateTime = new Date(durationStartDateTime);
                            durationStartDateTime = durationStartDateTime.toLocaleDateString("fr-CA") + " " + durationStartDateTime.getHours() + ":" + ("0" +durationStartDateTime.getMinutes()).slice(-2) + ":" + ("0" + durationStartDateTime.getSeconds()).slice(-2);

                            //console.log("visibleTrend.id", visibleTrend.id, "Start Date", durationStartDateTime, "End Date", durationEndDateTime);
                            trend.operationalEndTime = durationStartDateTime;

                            let i = 0;
                            let trendsInterval = setInterval(() => {
                                i++;
                                //console.log(trend.id);
                                //console.log("userId", visibleTrend.userId);
                                //console.log("sensorId", visibleTrend.sensorId);

                                this.checkDataPointCount(visibleTrend.userId, visibleTrend.sensorId)
                                .then(result => {
                                    if (result) {
                                        console.log("Change");
                                    }
                                    else {
                                        console.log("No Change");
                                    }
                                })
                                .catch(e => console.error(e));

                                if (i == 3) {
                                    clearInterval(trendsInterval);
                                }

                            }, 10000);

                            trends.getUserConfiguredTrendAverages(trend)
                            .then(response => {

                                //console.log("latestDataPoint", response.latestDataPoint, "currentAverage", response.currentAverage, "average", response.average, "response", response);
                                //console.log("latestDataPoint", response.latestDataPoint, "currentAverage", response.currentAverage, "average", response.average, "response", response);

                                if (response) {

                                    trend.latestDataPointValue = response.latestDataPoint;
                                    trend.currentAverageValue = response.currentAverage;
                                    trend.averageValue = response.average;
                                    /*
                                    trend.latestDataPointValue = (response.latestDataPoint) ? response.latestDataPoint : Math.floor((Math.random() * (parseFloat(trend.highestLevel) - parseFloat(trend.lowestLevel + 1))) + parseFloat(trend.lowestLevel));
                                    trend.currentAverageValue = (response.currentAverage) ? response.currentAverage : Math.floor((Math.random() * (parseFloat(trend.highestLevel) - parseFloat(trend.lowestLevel + 1))) + parseFloat(trend.lowestLevel));
                                    trend.averageValue = (response.average) ? response.average : Math.floor((Math.random() * (parseFloat(trend.highestLevel) - parseFloat(trend.lowestLevel + 1))) + parseFloat(trend.lowestLevel));
                                    */
                                    trend.unit = visibleTrend.unit;
                                    
                                    const bulletChartDiv = document.createElement("div");
                                    bulletChartDiv.setAttribute("id", "bulletChart" + trend.id);
                                    bulletChartDiv.setAttribute("class", "col-md-6 p-1");
                                    bulletChartDiv.innerHTML = `<p style="font-weight: bold">` + visibleTrend.trendName + ` <span style="color: #e8ab02">(Latest Data Point: ` + trend.latestDataPointValue + visibleTrend.unit
                                                             + `)</span><br/><span style="font-size: 85%; color: #aaa">Duration: ${durationStartDateTime} - ${durationEndDateTime}</span></p>`;
            
                                    dashboard.append(bulletChartDiv);

                                    //console.log("trend", trend);
            
                                    charting.getBulletChart(bulletChartDiv, trend);

                                }
                                else {
                                    alert("invalid date");
                                }
                                
                            })
                            .catch(e => console.error(e));

                            

                        });

                    })
                    .catch(e => console.error(e));

                    

                })
                
            })
            .catch(e => console.error(e))
            
        }
        
    }

    checkDataPointCount = async (userId, sensorId) => {
        console.log("check");
        return await this.getApi("DataPoints", "checkDataPointCount", "userId=" + userId + "&sensorId=" + sensorId)
        .then(response => response)
        .catch(e => console.error(e));
    }
    
}

export default Dashboard;