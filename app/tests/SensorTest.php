<?php 
declare(strict_types=1);
require_once('./configuration/Sensor.php');
use PHPUnit\Framework\TestCase;

final class SensorTest extends TestCase
{
    private $sensor;

    public function testGetSensor(): void
    {
        $this->assertInstanceOf(Sensor::class, Sensor::getSensor(528889));

        $this->assertEquals('Current Meter 20 Amp', Sensor::getSensor(528889)->getSensorName());

    }
    
}
?>