<?php 
declare(strict_types=1);
require_once('./configuration/Trends.php');

require_once('./configuration/DataPoints.php');
use PHPUnit\Framework\TestCase;

final class TrendsTest extends TestCase
{

    public function testLastAverage(): void
    {
        $trends = new Trends();
        //$this->assertInstanceOf(Trends::class, Tren::getSensor(528889));
        //$this->assertEquals('Current Meter 20 Amp', Sensor::getSensor(528889)->getSensorName());
        $this->assertFalse($trends->formulas->lastAverage(0, 0, 0));
    }

    public function testInsertTrend(): void
    {
        $trend = '{
            "userId": 2,
            "sensorId": 333,
            "lowestLevel": 0 ,
            "highestLevel": 10 ,
            "operationalMinimum": 33,
            "operationalMaximum": 66,
            "operationalStartTime": "2021-06-10 8:00:00",
            "operationalDuration": 8 
        }';

        $trends = new Trends();
        $this->assertEquals(1, $trends->insertTrend($trend));

    }

    public function testInsertCalculatedTrend(): void
    {
        $trend = '{
            "class": "Trends",
            "method": "insertCalculatedTrend",
            "userId": "2",
            "trendName": "test",
            "trendFormula": "maConversion",
            "inputs": "{\"heatCapacity\":null,\"averagingFactor\":null,\"mAMin\":\"1\",\"mAMax\":\"2\",\"processMin\":\"3\",\"processMax\":\"4\",\"density\":null,\"voltage\":null,\"powerFactor\":null}",
            "sensorId": "111111",
            "associatedTrends": "[\"1\",\"2\"]"
        }';

        $trends = new Trends();
        $this->assertIsArray($trends->insertCalculatedTrend($trend));
    }

    public function testGetTrends(): void
    {
        $trends = new Trends();
        $this->assertIsArray($trends->getTrends(2, 111111));
    }
    
    public function OtestGetConfiguredTrends(): void
    {
        $trends = new Trends();
        //var_dump($trends->getConfiguredTrends(array("sensorId" => 4, "userId" => 2)));
        $this->assertIsArray($trends->getConfiguredTrends(array("sensorId" => 4, "userId" => 2)));
    }

    
    public function testGetConfiguredTrend(): void
    {
        $trends = new Trends();
        //var_dump($trends->getConfiguredTrends(array("sensorId" => 4, "userId" => 2)));
        $trendId['trendId'] = 16;
        $trend = json_decode('{
                "class": "Trends",
                "method": "getConfiguredTrend",
                "trendId": "2",
                "startDate": "2021-07-01 12:0:0",
                "endDate": "2021-10-02 0:0:0"
            }', false);

            var_dump("test");
        var_dump($trends->getConfiguredTrend($trend));
        $this->assertIsArray($trends->getConfiguredTrend($trend));
    }

    public function testGetUserConfiguredTrends(): void 
    {
        $trends = new Trends();

        $trend["trendId"] = 83;
        var_dump($trends->getUserConfiguredTrends($trend));
        $this->assertIsArray($trends->getUserConfiguredTrends($trend));
    }

    
    public function OtestGetConfiguredTrendCurrentAverage(): void
    {
        $trends = new Trends();
        //var_dump($trends->getConfiguredTrends(array("sensorId" => 4, "userId" => 2)));
        $trend['trendId'] = 29;
        $trend['startDate'] = "2021-08-04 12:00:00";
        $trend['endDate'] = "2021-08-04 21:00:00";

        $trend['startDate'] = "null";
        $trend['endDate'] = "null";

        $this->assertIsArray($trends->getConfiguredTrendCurrentAverage($trend));
    }

    
}
?>