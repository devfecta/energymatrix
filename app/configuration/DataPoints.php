<?php
/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2020-04-07
 */
require_once('Configuration.php');
require_once('Sensor.php');
require_once('DataPoint.php');
require_once('Formulas.php');

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
                    error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " Sensor ID: " . $sensor['sensorID'] . " - User does NOT exist.\n", 3, "/var/www/html/app/php-errors.log");
                }

            }
            else {
                error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " Sensor ID: " . $sensor['sensorID'] . " - Sensor Name NOT Formatted Properly\n", 3, "/var/www/html/app/php-errors.log");
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
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        catch (Exception $e) {
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            $connection = Configuration::closeConnection();
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

            $statement = $connection->prepare("SELECT * FROM `sensors` WHERE `sensorId`=:sensorId AND `userId`=:userId");
            $statement->bindParam(":sensorId", $sensor['sensorID'], PDO::PARAM_INT);
            $statement->bindParam(":userId", $userId, PDO::PARAM_INT);
            $statement->execute();
            $sensorData = $statement->fetch(PDO::FETCH_ASSOC);

            // Gets the data type and value.
            if (strpos($sensor['plotLabels'], '|')) {
                $plotLabelArray = explode('|', $sensor['plotLabels']);
                $dataType = $plotLabelArray[0];

                $plotValueArray = explode('|', $sensor['plotValues']);
                $dataValue = $plotValueArray[0];
            }
            else {
                $dataType = $sensor['plotLabels'];
                $dataValue = $sensor['plotValues'];
            }
            // Creates a new sensor record if it doesn't exist.
            if ($statement->rowCount() < 1) {

                $sensorName =  explode(' | ', $sensor['sensorName'])[1];

                $statement = $connection->prepare("INSERT INTO `sensors` (
                    `sensorId`,
                    `userId`,
                    `sensor_name`,
                    `dataType`
                ) 
                VALUES (
                    :sensorId,
                    :userId,
                    :sensor_name,
                    :dataType
                )");

                $statement->bindParam(":sensorId", $sensor['sensorID'], PDO::PARAM_INT);
                $statement->bindValue(":userId", $userId, PDO::PARAM_INT);
                $statement->bindParam(":sensor_name", $sensorName, PDO::PARAM_STR);
                $statement->bindParam(":dataType", $dataType, PDO::PARAM_STR);
                $statement->execute();

            }
            else {
                
                if (!$sensorData["dataType"]) {
                    $statement = $connection->prepare("UPDATE `sensors` SET `dataType`=:dataType WHERE `id`=:id");
                    $statement->bindParam(":id", $sensorData['id'], PDO::PARAM_INT);
                    $statement->bindParam(":dataType", $dataType, PDO::PARAM_STR);
                    $statement->execute();
                }
                
            }
            // NOT NEEDED anymore
            //$plotLabels = $sensor['plotLabels'];
            //$plotValues = $sensor['plotValues'];

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

            $statement->bindValue(":user_id", $userId, PDO::PARAM_INT); 
            $statement->bindValue(":sensor_id", $sensor['sensorID'], PDO::PARAM_INT);
            $statement->bindParam(":date_time", $sensor['messageDate'], PDO::PARAM_STR);
            $statement->bindParam(":data_type", $dataType, PDO::PARAM_STR);
            $statement->bindValue(":data_value", $dataValue);

            // Insert Raw Data Point
            $connection->beginTransaction();
            $result = $statement->execute() ? true : false;
            $lastInsertId = $connection->lastInsertId();
            $connection->commit();

        }
        catch(PDOException $pdo) {
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        catch (Exception $e) {
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            $connection = Configuration::closeConnection();
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

        /*
        error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') 
        . " userId=" . $userId
        . " sensorId=" . $sensorId
        . " startDateTime=" . $startDateTime
        . " endDateTime=" . $endDateTime . "\n", 3, "/var/www/html/app/php-errors.log");
        */
        try {
            
            $connection = Configuration::openConnection();

            $sensorId = Sensor::getSensor($sensorId)->getSensorId();

            if ($endDateTime != "null") {
                $statement = $connection->prepare("SELECT * FROM `dataPoints` WHERE `dataPoints`.`sensor_id`=:sensor_id AND `dataPoints`.`user_id`=:user_id AND `dataPoints`.`date_time`>=:startDateTime AND `dataPoints`.`date_time`<=:endDateTime ORDER BY `date_time` DESC");
                /* REVISIT
                $statement = $connection->prepare("
                    SELECT dataSet.* 
                    FROM (
                        SELECT @rowNumber:=@rowNumber+1 rowNumber, `dataPoints`.* 
                        FROM (SELECT @rowNumber:=0) r, `dataPoints` WHERE `dataPoints`.`sensor_id`=:sensor_id AND `dataPoints`.`user_id`=:user_id AND `dataPoints`.`date_time`>=:startDateTime AND `dataPoints`.`date_time`<=:endDateTime ORDER BY `date_time` DESC 
                    ) dataSet 
                    WHERE MOD(dataSet.rowNumber, 5) = 0 LIMIT 0, 50
                ");
                */
                $statement->bindParam(":user_id", $userId, PDO::PARAM_INT);
                $statement->bindParam(":sensor_id", $sensorId, PDO::PARAM_INT);
                $statement->bindParam(":startDateTime", $startDateTime, PDO::PARAM_STR); 
                $statement->bindParam(":endDateTime", $endDateTime, PDO::PARAM_STR); 
            }
            else {
                $statement = $connection->prepare("SELECT * FROM `dataPoints` WHERE `dataPoints`.`sensor_id`=:sensor_id AND `dataPoints`.`user_id`=:user_id ORDER BY `date_time` DESC LIMIT 0, 50");
                /* REVISIT
                $statement = $connection->prepare("
                    SELECT dataSet.* 
                    FROM (
                        SELECT @rowNumber:=@rowNumber+1 rowNumber, `dataPoints`.* 
                        FROM (SELECT @rowNumber:=0) r, `dataPoints` WHERE `dataPoints`.`sensor_id`=:sensor_id AND `dataPoints`.`user_id`=:user_id ORDER BY `date_time` DESC
                    ) dataSet 
                    WHERE MOD(dataSet.rowNumber, 5) = 0 LIMIT 0, 50
                ");
                */
                $statement->bindParam(":user_id", $userId, PDO::PARAM_INT);
                $statement->bindParam(":sensor_id", $sensorId, PDO::PARAM_INT);
            }
            
            $statement->execute();

            $resultsTemp = $statement->fetchAll(PDO::FETCH_ASSOC);
            
            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') 
            //. " resultsTemp sizeof " . sizeof($resultsTemp) . "\n", 3, "/var/www/html/app/php-errors.log");
            
            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($resultsTemp, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");

            $columns = array_column($resultsTemp, 'date_time');
            array_multisort($columns, SORT_ASC, $resultsTemp);

            $results = array();

            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " Before: " . sizeof($resultsTemp) . "\n", 3, "/var/www/html/app/php-errors.log");

            if (sizeof($resultsTemp) > 1) {

                $previousDate = $resultsTemp[0]["date_time"];

                foreach ($resultsTemp as $result) {

                    $currentDate = $result["date_time"];
                    //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " currentDate: " . $currentDate . " previousDate: " . $previousDate . "\n", 3, "/var/www/html/app/php-errors.log");

                    if ($currentDate >= $previousDate) {
                        
                        $currentDate = new DateTime($currentDate);
                        $previousDate = new DateTime($previousDate);
                        //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " compare: " . $currentDate->diff($previousDate)->d . "\n", 3, "/var/www/html/app/php-errors.log");
                        if ($currentDate->diff($previousDate)->d > 0) {
                            unset($results);
                            $results = array();
                            array_push($results, $result);
                        }
                        else {
                            array_push($results, $result);
                        }

                    }

                    $previousDate = $result["date_time"];
                    
                }

            }


            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " results: " . sizeof($results) . "\n", 3, "/var/www/html/app/php-errors.log");

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
                /* TOOK OUT BECAUSE THIS IS NOT NEEDED ANYMORE
                if ($result['data_type'] == "mA") {
                    $sensor = Sensor::getSensor($result['sensor_id']);
                    $attributes = json_decode($sensor->getSensorAttributes(), false);
                    
                    $outputProcess = $this->calculateMaProcess($sensor->getSensorAttributes(), $result['data_value']);

                    $dataPoint->setDataValue($outputProcess);
                }
                else {
                    
                    $dataPoint->setDataValue($result['data_value']);
                }
                */

                $dataPoint->setDataValue($result['data_value']);

                $dataPoint->setCustomValue($result['custom_value']);

                //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $sensorId ." Datapoints: " . json_encode((array)$dataPoints, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");

                array_push($dataPoints, $dataPoint);
            }

            
            //error_log(var_dump($dataPoints), 0);
        }
        catch(PDOException $pdo) {
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        catch (Exception $e) {
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            $connection = Configuration::closeConnection();
        }

        

        return $dataPoints;

    }

    public function getUserSensorDataPoints($userId, $sensorId) {

        $dataPoints = array();

        try {
            
            $connection = Configuration::openConnection();

            if (isset($sensorId)) {
                $sensorId = Sensor::getSensor($sensorId)->getSensorId();

                $statement = $connection->prepare("SELECT * FROM `dataPoints` WHERE `dataPoints`.`user_id`=:userId AND `dataPoints`.`sensor_id`=:sensorId ORDER BY `date_time`");
                $statement->bindParam(":userId", $userId, PDO::PARAM_INT);
                $statement->bindParam(":sensorId", $sensorId, PDO::PARAM_INT);
            }
            else {
                $statement = $connection->prepare("SELECT * FROM `dataPoints` WHERE `dataPoints`.`user_id`=:user_id ORDER BY `date_time`");
                $statement->bindParam(":user_id", $userId, PDO::PARAM_INT);
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
                $dataPoint->setDataValue($result['data_value']);
                $dataPoint->setCustomValue($result['custom_value']);

                array_push($dataPoints, $dataPoint);
            }
        }
        catch(PDOException $pdo) {
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        catch (Exception $e) {
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            $connection = Configuration::closeConnection();
        }

        return $dataPoints;

    }

    public function getSensorDataTypes($sensorId) {

        $dataTypes = array();

        try {
            
            $connection = Configuration::openConnection();

            $sensorId = Sensor::getSensor($sensorId)->getSensorId();

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
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        catch (Exception $e) {
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            $connection = Configuration::closeConnection();
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
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            $connection = Configuration::closeConnection();
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

            $sensorId = Sensor::getSensor($sensorId)->getSensorId();

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
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        catch (Exception $e) {
            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
        }
        finally {
            $connection = Configuration::closeConnection();
        }
    }

    public function checkDataPointCount($sensorInfo) {

        $changed = false;
        // Array of Raw Data Points
        $dataPointsArray = $this->getUserSensorDataPoints($sensorInfo['userId'], $sensorInfo['sensorId']);

        //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . sizeof($dataPointsArray) . "=" . sizeof($_SESSION["sensorDataPoints"]) . "\n", 3, "/var/www/html/app/php-errors.log");

        if (sizeof($dataPointsArray) != sizeof($_SESSION["sensorDataPoints"])) {
            unset($_SESSION["sensorDataPoints"]);
            $_SESSION["sensorDataPoints"] = $dataPointsArray;
            $changed = true;
        }

        //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . "test" . "\n", 3, "/var/www/html/app/php-errors.log");

        return boolval($changed) ? 'true' : 'false';
    }

}
?>