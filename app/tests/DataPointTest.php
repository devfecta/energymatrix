<?php 
declare(strict_types=1);
require_once('./configuration/DataPoint.php');
use PHPUnit\Framework\TestCase;

final class DataPointTest extends TestCase
{
    private $dataPoint;

    public function testGetDataPoint(): void
    {
        $this->assertInstanceOf(DataPoint::class, DataPoint::getDataPoint(80));

        $this->assertEquals('Fahrenheit', DataPoint::getDataPoint(80)->getDataType());

    }
}
?>