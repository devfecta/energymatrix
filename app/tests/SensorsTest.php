<?php 
declare(strict_types=1);
require_once('./configuration/Sensors.php');
use PHPUnit\Framework\TestCase;

final class SensorsTest extends TestCase
{
    private $sensors;

    public function testGetUserSensors(): void
    {
        $sensors = new Sensors();
        $this->assertIsArray($sensors->getUserSensors(2));

        $this->assertInstanceOf(Sensor::class, $sensors->getUserSensors(2)[0]);

        $this->assertEquals(222222, $sensors->getUserSensors(2)[1]->getSensorId());
    }

    public function testGetSensors(): void
    {
        $sensors = new Sensors();
        $this->assertIsArray($sensors->getSensors());

        $this->assertInstanceOf(Sensor::class, $sensors->getSensors()[0]);

        var_dump($sensors->getSensors());

        //$this->assertEquals(222222, $sensors->getUserSensors(2)[1]->getSensorId());
    }

    public function testAddSensor(): void
    {
        $sensors = new Sensors();
        $test = [
            "class" => "Sensors"
            , "method" => "addSensor"
            , "company" => 5
            , "sensorId" => 333
            , "sensorName" => "Test Sensor"
            , "sensorAttributes" => '["type" => "testType", "value" => 3]'
        ];
        $this->assertEquals(true, $sensors->addSensor($test));

        

        //$this->assertInstanceOf(Sensor::class, $sensors->getSensor());

    }

    
    
}
?>