<?php 
declare(strict_types=1);
require_once('./configuration/Trends.php');
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

    public function testGetTrends(): void
    {
        $trends = new Trends();
        $this->assertIsArray($trends->getTrends(2, 111111));
    }
    
    
}
?>