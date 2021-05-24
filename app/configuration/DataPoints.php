<?php

require_once('Configuration.php');
require_once('DataPoint.php');

class DataPoints extends DataPoint {

    private $id;
    private $report_id;
    private $date_time;
    private $flow_rate;
    private $total_volume;
    private $steam;
    private $feedwater;
    private $fahrenheit;
    private $celsius;
    private $current;
    private $relative_humidity;
    private $voltage_detected;
    private $error;
    private $velocity_reading;
    private $velocity_low_limit;
    private $velocity_high_limit;
    private $velocity_ma_custom;
    private $velocity_ma;
    private $inwc;
    private $pressure_reading;
    private $pressure_low_limit;
    private $pressure_high_limit;
    private $pressure_ma_custom;
    private $pressure_ma;
    private $psig;

    function __construct() {}
    /**
     * Processes the data received from the webhook.
     *
     * @param   string  $webhookData  Data received from the webhook.
     *
     * @return  null  Returns nothing.
     */
    public function processWebhook($webhookData) {
        // Loops through each data point.
        foreach($webhookData as $sensor) {
            
            if (isset($sensor['sensorName']) && strpos($sensor['sensorName'], " | ") != false) {
                // Gets the user ID from the sensor name property.
                $userId = (int)explode(' | ', $sensor['sensorName'])[3];
                
                if ($this->companyExists($userId) > 0) {
                    // Needed to convert the time stamp from UTC to CST
                    $utcDateTime = new DateTime($sensor['messageDate'], new DateTimeZone('UTC'));
                    $utcDateTime->setTimezone(new DateTimeZone('America/Chicago'));
                    $sensor['messageDate'] = $utcDateTime->format('Y-m-d H:i:s');
                    
                    $result = $this->insertDataPoint($userId, $sensor);
                    
                }
                else {
                    error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " Sensor ID: " . $sensor['sensorID'] . " - User does NOT exist.\n", 3, "/var/www/html/app/php-errors.log");
                }

            }
            else {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " Sensor ID: " . $sensor['sensorID'] . " - Sensor Name NOT Formatted Properly\n", 3, "/var/www/html/app/php-errors.log");
                //return false;
            }

        }

    }
    /**
     * Checks to see if a user exists based on the user ID.
     *
     * @param   int  $userId  User ID
     *
     * @return  boolean  Returns true if user exists.
     */
    public function companyExists($userId) {

        $result = false;

        try {

            $connection = Configuration::openConnection();

            $statement = $connection->prepare("SELECT * FROM `users` WHERE `id`=:id");
            $statement->bindParam(":id", $userId, PDO::PARAM_INT);
            $statement->execute();

            $result = $statement->rowCount() > 0 ? $statement->fetch(PDO::FETCH_ASSOC)["id"] : false;

        }
        catch (PDOException $pdo) {
            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        catch (Exception $e) {
            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            Configuration::closeConnection();
        }

        return $result;

    }
    /**
     * This inserts the data point information from the webhook.
     *
     * @param   int  $userId  User ID
     * @param   json  $sensor  Specific sensor data from the webhook.
     *
     * @return  boolean  Returns the last boolean of the last inserted data point.
     */
    public function insertDataPoint($userId, $sensor) {

        $result = false;

        try {
            
            $connection = Configuration::openConnection();

            $statement = $connection->prepare("SELECT * FROM `sensors` WHERE `id`=:sensor_id");
            $statement->bindParam(":sensor_id", $sensor['sensorID'], PDO::PARAM_INT);
            $statement->execute();

            if ($statement->rowCount() < 1) {

                $sensorName =  explode(' | ', $sensor['sensorName'])[1];

                $statement = $connection->prepare("INSERT INTO `sensors` (
                    `id`,
                    `user_id`,
                    `sensor_name`
                ) 
                VALUES (
                    :sensor_id,
                    :user_id,
                    :sensor_name
                )");
                $statement->bindParam(":sensor_id", $sensor['sensorID'], PDO::PARAM_INT);
                $statement->bindValue(":user_id", $userId, PDO::PARAM_INT);
                $statement->bindParam(":sensor_name", $sensorName, PDO::PARAM_STR);
                $statement->execute();

            }

            $plotLabels = $sensor['plotLabels'];
            $plotValues = $sensor['plotValues'];

            $statement = $connection->prepare("INSERT INTO `dataPoints` (
                `user_id`,
                `sensor_id`,
                `date_time`,
                `data_type`,
                `data_value`
            ) 
            VALUES (
                :user_id,
                :sensor_id,
                :date_time,
                :data_type,
                :data_value
            )");


            if (strpos($plotLabels, '|')) {
                
                $plotLabelArray = explode('|', $plotLabels);
                $plotValueArray = explode('|', $plotValues);

                for ($i = 0; $i < count($plotLabelArray); $i++) {

                    $statement->bindValue(":user_id", $userId, PDO::PARAM_INT);
                    $statement->bindValue(":sensor_id", $sensor['sensorID'], PDO::PARAM_INT);
                    $statement->bindParam(":date_time", $sensor['messageDate'], PDO::PARAM_STR);
                    $statement->bindParam(":data_type", $plotLabelArray[$i]);
                    $statement->bindValue(":data_value", $plotValueArray[$i]);
                    $result = $statement->execute() ? true : false;
                    
                }
            }
            else {

                $statement->bindValue(":user_id", $userId, PDO::PARAM_INT); 
                $statement->bindValue(":sensor_id", $sensor['sensorID'], PDO::PARAM_INT);
                $statement->bindParam(":date_time", $sensor['messageDate'], PDO::PARAM_STR); 
                $statement->bindParam(":data_type", $plotLabels);
                $statement->bindValue(":data_value", $plotValues); 
                $result = $statement->execute() ? true : false;
                
            }

        }
        catch(PDOException $pdo) {
            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        catch (Exception $e) {
            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            Configuration::closeConnection();
        }

        return $result;
    }
    /**
     * Gets specific user and sensor data points based off of a selected start and end date.
     *
     * @param   int  $userId         Logged in user ID
     * @param   int  $sensorId       Specific user's sensor ID
     * @param   string  $startDateTime  Selected start search date
     * @param   string  $endDateTime    Selected end search date
     *
     * @return  array  Returns an array of DataPoint objects
     */
    public function getSensorDataPoints($userId, $sensorId, $startDateTime, $endDateTime) {

        $dataPoints = array();

        try {
            
            $connection = Configuration::openConnection();  

            if ($endDateTime != "null") {
                $statement = $connection->prepare("SELECT * FROM `dataPoints` WHERE `dataPoints`.`sensor_id`=:sensor_id AND `dataPoints`.`user_id`=:user_id AND `dataPoints`.`date_time`>=:startDateTime AND `dataPoints`.`date_time`<=:endDateTime ORDER BY `date_time` ASC");
                $statement->bindParam(":user_id", $userId, PDO::PARAM_INT);
                $statement->bindParam(":sensor_id", $sensorId, PDO::PARAM_INT);
                $statement->bindParam(":startDateTime", $startDateTime, PDO::PARAM_STR); 
                $statement->bindParam(":endDateTime", $endDateTime, PDO::PARAM_STR); 
            }
            else {
                $statement = $connection->prepare("SELECT * FROM `dataPoints` WHERE `dataPoints`.`sensor_id`=:sensor_id AND `dataPoints`.`user_id`=:user_id ORDER BY `date_time` ASC LIMIT 0, 50");
                $statement->bindParam(":user_id", $userId, PDO::PARAM_INT);
                $statement->bindParam(":sensor_id", $sensorId, PDO::PARAM_INT);
            }
            
            $statement->execute();

            $results = $statement->fetchAll(PDO::FETCH_ASSOC);

            foreach ($results as $result) {

                $dataPoint = new DataPoint();

                $dataPoint->setDataPointId($result['id']);
                $dataPoint->setUserId($result['user_id']);
                $dataPoint->setSensorId($result['sensor_id']);
                $dataPoint->setDate($result['date_time']);
                $dataPoint->setDataType($result['data_type']);

                /* mA - using the sensor_id and data_type to determine what sensor attributes to use.
                    Need to use the sensor ID because the attributes can differ from sensor to sensor.
                    Once calculated set the data value.
                */

                if ($result['data_type'] == "mA") {
                    $sensor = Sensor::getSensor($result['sensor_id']);
                    $attributes = json_decode($sensor->getSensorAttributes(), false);
                    
                    $outputProcess = $this->calculateMaProcess($sensor->getSensorAttributes(), $result['data_value']);

                    $dataPoint->setDataValue($outputProcess);
                }
                else {
                    
                    $dataPoint->setDataValue($result['data_value']);
                }

                $dataPoint->setCustomValue($result['custom_value']);

                array_push($dataPoints, $dataPoint);
            }

            //error_log(var_dump($dataPoints), 0);
        }
        catch(PDOException $pdo) {
            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        catch (Exception $e) {
            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            Configuration::closeConnection();
        }

        return $dataPoints;

    }

    public function calculateMaProcess($attributes, $storedValue) {
        
        $attributes = json_decode($attributes, false);
        return (($storedValue - $attributes->mAMin) / ($attributes->mAMax - $attributes->mAMin)) * ($attributes->processMax - $attributes->processMin);
    }

    public function getSensorDataTypes($sensorId) {

        $dataTypes = array();

        try {
            
            $connection = Configuration::openConnection();

            $statement = $connection->prepare("SELECT `dataPoints`.`data_type` FROM `dataPoints` WHERE `dataPoints`.`sensor_id`=:sensor_id GROUP BY `dataPoints`.`data_type`");
            $statement->bindParam(":sensor_id", $sensorId, PDO::PARAM_INT);
            
            $statement->execute();

            $results = $statement->fetchAll(PDO::FETCH_ASSOC);

            foreach($results as $dataType) {
                array_push($dataTypes, $dataType);
            }
            //error_log(var_dump($dataPoints), 0);
        }
        catch(PDOException $pdo) {
            error_log(date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        catch (Exception $e) {
            error_log(date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            Configuration::closeConnection();
        }

        return $dataTypes;

    }
    /**
     * This inserts the data point JSON from the webhook, along with the sensor ID, 
     * company/user ID, and the datetime of the sensor reading.
     *
     * @param   int  $userId  User ID
     * @param   json  $sensor  JSON from the webhook
     *
     * @return  json           JSON of the new data point ID
     */
    public function addDataPoint($userId, $sensor) {

        try {
            
            $connection = Configuration::openConnection();
            
            $statement = $connection->prepare("INSERT INTO `data_points` (
                `user_id`,
                `sensor_id`,
                `date_time`,
                `data_point`
            ) 
            VALUES (
                :user_id,
                :sensor_id,
                :date_time,
                :data_point
            )");

            $statement->bindValue(":user_id", $userId, PDO::PARAM_INT); 
            $statement->bindValue(":sensor_id", (int)$sensor['sensorID'], PDO::PARAM_INT); 
            $statement->bindParam(":date_time", $sensor['messageDate'], PDO::PARAM_STR); 
            $statement->bindParam(":data_point", json_encode($sensor));
            $statement->execute();

            $dataPointId = $connection->lastInsertId();

            $result['dataPointId'] = $dataPointId;

        }
        catch(PDOException $pdo) {
            $result['error'] =  $pdo->getMessage();
            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            Configuration::closeConnection();
        }

        return json_encode($result, JSON_PRETTY_PRINT);
    }
    /**
     * Returns the minimum and maximum dates based on a specific sensor's data points.
     *
     * @param   int  $userId    Logged in user ID
     * @param   int  $sensorId  Selected sensor ID
     *
     * @return  json  JSON string containing the minimum and maximum dates based on a specific sensor's data points.
     */
    public function getMinMaxDates($userId, $sensorId) {
        try {

            $connection = Configuration::openConnection();

            $statement = $connection->prepare("SELECT MIN(date_time) AS minDate, MAX(date_time) AS maxDate FROM dataPoints WHERE user_id=:userId AND sensor_id=:sensorId");
            $statement->bindParam(":userId", $userId, PDO::PARAM_STR);
            $statement->bindParam(":sensorId", $sensorId, PDO::PARAM_STR);
            $statement->execute();
            $results = $statement->fetch(PDO::FETCH_ASSOC);

            $dates['minimum'] = $results['minDate'];
            $dates['maximum'] = $results['maxDate'];

            return json_encode($dates, JSON_PRETTY_PRINT);
        }
        catch(PDOException $pdo) {
            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        catch (Exception $e) {
            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            Configuration::closeConnection();
        }
    }

}
?>