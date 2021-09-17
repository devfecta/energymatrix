import Charting from "../modules/Charting.js";
import Trends from "../modules/Trends.js";

class Dashboard {

    constructor() {
        //super();
        
    }

    buildDashboard = (dashboard) => {

        const userId = document.cookie.split('; ').find(c => c.startsWith('userId')).split('=')[1];

        //console.log(userId);

        let userType = 0;
        if (document.cookie.includes('; ') && document.cookie.includes('userType')) {
            userType = document.cookie.split('; ').find(c => c.startsWith('userType')).split('=')[1];
            
        }

        if (userType < 1) {
            const charting = new Charting();
            const trends = new Trends();

            
            trends.getConfiguredTrends (null, userId)
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
                            durationEndDateTime = durationEndDateTime.toLocaleDateString("fr-CA") + " " + durationEndDateTime.getHours() + ":" + durationEndDateTime.getMinutes() + ":" + durationEndDateTime.getSeconds();

                            let durationStartDateTime = new Date(trend.operationalStartTime);
                            durationStartDateTime = durationStartDateTime.setHours(durationStartDateTime.getHours() - trend.operationalDuration);
                            durationStartDateTime = new Date(durationStartDateTime);
                            durationStartDateTime = durationStartDateTime.toLocaleDateString("fr-CA") + " " + durationStartDateTime.getHours() + ":" + durationStartDateTime.getMinutes() + ":" + durationStartDateTime.getSeconds();

                            console.log("visibleTrend.id", visibleTrend.id, "Start Date", durationStartDateTime, "End Date", durationEndDateTime);

                            
                            
                           
                            trends.getConfiguredTrendAverages(visibleTrend.id, durationStartDateTime, durationEndDateTime)
                            .then(response => {

                                console.log("visibleTrend.id", visibleTrend.id, "response", response);
                            
                                trend.currentAverageValue = (response.currentAverage) ? response.currentAverage : Math.floor((Math.random() * (parseFloat(trend.highestLevel) - parseFloat(trend.lowestLevel + 1))) + parseFloat(trend.lowestLevel));
    
                                //trend.currentAverageValue = Math.floor((Math.random() * (parseFloat(trend.highestLevel) - parseFloat(trend.lowestLevel + 1))) + parseFloat(trend.lowestLevel));
                                trend.averageValue = (response.average) ? response.average : Math.floor((Math.random() * (parseFloat(trend.highestLevel) - parseFloat(trend.lowestLevel + 1))) + parseFloat(trend.lowestLevel));
    
                                trend.unit = visibleTrend.unit;
                                
                                const bulletChartDiv = document.createElement("div");
                                bulletChartDiv.setAttribute("id", "bulletChart" + trend.id);
                                bulletChartDiv.setAttribute("class", "col-md-6 p-1");
                                bulletChartDiv.innerHTML = `<p style="font-weight: bold">` + visibleTrend.trendName + ` <span style="color: #e8ab02">(Current Average: ` + trend.currentAverageValue + visibleTrend.unit + `)</span></p>`;
        
                                dashboard.append(bulletChartDiv);
        
                                charting.getBulletChart(bulletChartDiv, trend);


                                
                            })
                            .catch(e => console.error(e));

                            

                        });

                    })
                    .catch(e => console.error(e));

                });

                


                
            })
            .catch(e => console.error(e));
            
        }

        
        
    }
}

export default Dashboard;