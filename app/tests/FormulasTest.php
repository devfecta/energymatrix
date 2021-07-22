<?php 
declare(strict_types=1);
require_once('./configuration/Formulas.php');
require_once('./configuration/DataPoints.php');
use PHPUnit\Framework\TestCase;

final class FormulasTest extends TestCase
{
    private $Formulas;
    private $DataPoints;

    public function testCurrentAverage(): void
    {
        $Formulas = new Formulas();
        $DataPoints = new DataPoints();
        //$this->assertIsArray($sensors->getUserSensors(2));

        //$this->assertInstanceOf(Sensor::class, $sensors->getUserSensors(2)[0]);

        // Array of all the numbers within the range.
        

        $dataPoints = $DataPoints->getSensorDataPoints(2, 1, "null", "null");

          

        $this->assertEquals(2, $Formulas->currentAverage($dataPoints, 70.3));
    }
    /*
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
    */
    
    
}
?>