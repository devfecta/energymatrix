<?php 
declare(strict_types=1);
require_once('./configuration/DataPoint.php');
require_once('./configuration/DataPoints.php');
use PHPUnit\Framework\TestCase;

final class DataPointsTest extends TestCase
{
    private $dataPoints;
    

    public function testCompanyExists(): void
    {
        $dataPoints = new DataPoints();
        $this->assertEquals(2, $dataPoints->companyExists(2));
    }

    public function testProcessWebhook(): void
    {
        $dataPoints = new DataPoints();

        $sensorMessages = json_decode('[
                            {
                                "sensorID":"528876","sensorName":"528876 | Thermocouple | 2 | Test Company","applicationID":"86","networkID":"3","dataMessageGUID":"9b65ec35-d972-4827-8c3d-fb3a1e04ce3f","state":"0","messageDate": "'. date("Y-m-d H:i:s") .'","rawData":"23.6","dataType":"TemperatureData","dataValue":"23.6","plotValues":"74.48","plotLabels":"Fahrenheit","batteryLevel":"97","signalStrength":"100","pendingChange":"True","voltage":"2.49"
                            }
                            ,{
                                "sensorID":"528879" , "sensorName":"528879 | 0-20mA Current | 2 | Test Company", "applicationID":"22", "networkID":"3", "dataMessageGUID":"72feb5dc-08a9-4b65-8beb-278311e0499b", "state": "2", "messageDate": "'. date("Y-m-d H:i:s") .'", "rawData":"0", "dataType": "MilliAmps", "dataValue": "0", "plotValues": "0", "plotLabels": "mA", "batteryLevel": "0", "signalStrength": "0", "pendingChange": "False", "voltage": "2.15"
                            }
                            ,{
                                "sensorID":"528889" , "sensorName":"528889 | Current Meter 20 Amp | 2 | Test Company", "applicationID":"93", "networkID":"3", "dataMessageGUID":"fa8bebb7-6e48-4a08-afb8-9846b926585d", "state": "0", "messageDate": "'. date("Y-m-d H:i:s") .'", "rawData":"0.05%2c0.16%2c0.17%2c0.16", "dataType": "AmpHours|Amps|Amps|Amps", "dataValue": "0.05|0.16|0.17|0.16", "plotValues": "0.05|0.16|0.17|0.16", "plotLabels": "Amp Hours|AvgCurrent|MaxCurrent|MinCurrent", "batteryLevel": "100", "signalStrength": "0", "pendingChange": "False", "voltage": "2.94"
                            }
                            ,{
                                "sensorID":"528911","sensorName":"528911 - Temperature - 2 - Test Company","applicationID":"2","networkID":"3","dataMessageGUID":"51d54ec3-c19e-4e06-803c-9f4776948efd","state":"17","messageDate": "'. date("Y-m-d H:i:s") .'","rawData":"24.7","dataType":"TemperatureData","dataValue":"24.7","plotValues":"76.46","plotLabels":"Fahrenheit","batteryLevel":"100","signalStrength":"94","pendingChange":"True","voltage":"3.15"
                            }
                            ,{
                                "sensorID":"528888","sensorName":"528888 | Current Meter 20 Amp | 13 | Test Company","applicationID":"93","networkID":"3","dataMessageGUID":"8b7fc2d6-2364-48d1-97c4-d7ab801c3baf","state": "1","messageDate": "'. date("Y-m-d H:i:s") .'","rawData":"0%2c0%2c0%2c0","dataType": "AmpHours|Amps|Amps|Amps","dataValue": "0|0|0|0","plotValues": "0.3|0.4|0.2|0.1","plotLabels": "Amp Hours|AvgCurrent|MaxCurrent|MinCurrent","batteryLevel": "100","signalStrength": "96","pendingChange": "True","voltage": "3.03"
                            }
                        ]', true);

        $this->assertNull($dataPoints->processWebhook($sensorMessages));
    }

    public function testInsertDataPoint(): void
    {
        $dataPoints = new DataPoints();
        
        $sensor = json_decode('{
                "sensorID":"111111","sensorName":"111111 | Temperature | 2 | Test Company","applicationID":"2","networkID":"3","dataMessageGUID":"51d54ec3-c19e-4e06-803c-9f4776948efd","state":"17","messageDate":"2020-11-19 20:50:43","rawData":"24.7","dataType":"TemperatureData","dataValue":"24.7","plotValues":"76.46","plotLabels":"Fahrenheit","batteryLevel":"100","signalStrength":"94","pendingChange":"True","voltage":"3.15"
        }', true);

        $this->assertEquals(
            true,
            $dataPoints->insertDataPoint(2, $sensor)
        );
        
        $sensor = json_decode('{
                "sensorID":"222222" , "sensorName":"222222 | Current Meter 20 Amp | 2 | Test Company", "applicationID":"93", "networkID":"3", "dataMessageGUID":"fa8bebb7-6e48-4a08-afb8-9846b926585d", "state": "0", "messageDate": "2020-10-14 22:18:03", "rawData":"0.05%2c0.16%2c0.17%2c0.16", "dataType": "AmpHours|Amps|Amps|Amps", "dataValue": "0.05|0.16|0.17|0.16", "plotValues": "0.05|0.16|0.17|0.16", "plotLabels": "Amp Hours|AvgCurrent|MaxCurrent|MinCurrent", "batteryLevel": "100", "signalStrength": "0", "pendingChange": "False", "voltage": "2.94"
            }', true);

        $this->assertEquals(
            true,
            $dataPoints->insertDataPoint(2, $sensor)
        );
        
    }

    public function testGetSensorDataPoints()
    {
        $dataPoints = new DataPoints();
        $this->assertIsArray($dataPoints->getSensorDataPoints(2, 528889, "2020-09-01", "null"));

        //var_dump($dataPoints->getSensorDataPoints(2, 528889, "2020-09-01", "null"));

        //$this->assertInstanceOf(DataPoint::class, $dataPoints->getSensorDataPoints(2, 528889, "2020-10-1", "null")[0]);
    }

    public function testGetSensorDataTypes() {
        $dataPoints = new DataPoints();
        $this->assertIsArray($dataPoints->getSensorDataTypes(528889));
        //var_dump($dataPoints->getSensorDataTypes(528889));
    }
    
    /*
    public function testCannotBeCreatedFromInvalidEmailAddress(): void
    {
        $this->expectException(InvalidArgumentException::class);

        Email::fromString('invalid');
    }

    public function testCanBeUsedAsString(): void
    {
        $this->assertEquals(
            'user@example.com',
            Email::fromString('user@example.com')
        );
    }
    */
}
?>