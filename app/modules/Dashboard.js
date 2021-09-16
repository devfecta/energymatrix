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

            
            trends.getConfiguredTrends(null, userId)
            .then(userTrends => {
                // Array of only visible trends.
                const visibleTrends = userTrends.filter(userTrend => parseInt(userTrend.isVisible));

                //console.log(visibleTrends);

                visibleTrends.forEach(visibleTrend => {

                    trends.getUserConfiguredTrends(visibleTrend.id)
                    .then(userConfiguredTrend => {

                        //console.log(userConfiguredTrend);

                        const visibleUserTrends = userConfiguredTrend.filter(userTrend => parseInt(userTrend.isVisible));

                        visibleUserTrends.forEach(trend => {

                                // console.log(trend.lowestLevel);

                                trend.currentAverageValue = Math.floor((Math.random() * (parseFloat(trend.highestLevel) - parseFloat(trend.lowestLevel + 1))) + parseFloat(trend.lowestLevel));
                                trend.averageValue = Math.floor((Math.random() * (parseFloat(trend.highestLevel) - parseFloat(trend.lowestLevel + 1))) + parseFloat(trend.lowestLevel));

                                
                                const bulletChartDiv = document.createElement("div");
                                bulletChartDiv.setAttribute("id", "bulletChart" + trend.id);
                                bulletChartDiv.setAttribute("class", "col-md-6 p-1");
                                bulletChartDiv.innerHTML = visibleTrend.trendName + " " + trend.currentAverageValue + visibleTrend.unit;
        
                                dashboard.append(bulletChartDiv);
        
                                charting.getBulletChart(bulletChartDiv, trend);
    

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