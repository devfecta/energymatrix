<?php
    // Needed to make the connection to the database.
    require_once('Configuration.php');
    
    // Contains sensor getters and setters.
    require_once('Sensor.php');
    require_once('Trend.php');
    require_once('Formulas.php');

    class Trends {

        public $Formulas;
        //public $trend;

        function __construct() {
            // Brings the formulas into this class.
            $this->Formulas = new Formulas();
        }

        /* 
            // Used to establish a database connection.
            $connection = Configuration::openConnection();

            // Create a SQL statement.
            $statement = $connection->prepare("SELECT `id`, `user_id` FROM `sensors` WHERE `user_id`=:user_id AND `sensorName`=:sensorName");

            // Binds values to the SQL statement. There can be more than one bindValue if needed.
            $statement->bindValue(":user_id", $userId, PDO::PARAM_INT);
            $statement->bindValue(":sensorName", $sensorName, PDO::PARAM_STR);

            // Executes the SQL statement.
            $statement->execute();

            // fetchAll gets all of the returned records and puts them into an associative array.
            // rowCount just get the number of returned records.
            // In this example I'm checking to see if there is more than 0 records returned, 
            // and if so assign the associative array to the variable, if not just assign an empty array.
            $results = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();
        */

        /**
         * Gets the information for a specific trend.
         *
         * @param   int $trendId  The ID of a trend.
         *
         * @return  array   An array of trend information.
         */
        public function getTrend($trendId) {

            $trend = array();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `trends` WHERE `id`=:trendId");

                $statement->bindValue(":trendId", $trendId, PDO::PARAM_INT);

                $statement->execute();

                $trend = $statement->rowCount() > 0 ? $statement->fetch(PDO::FETCH_ASSOC) : array();

            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }
            
            return $trend;
        }



        public function getUserConfiguredTrends($trend) {

            $trends = array();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `trendsUserConfigurations` WHERE `trendId`=:trendId ORDER BY `id` DESC");
                $statement->bindValue(":trendId", $trend["trendId"], PDO::PARAM_INT);

                $statement->execute();

                $trends = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }
            
            return $trends;


        }


        public function getConfiguredTrendAverages($trendSearchData) {

            $average = 0;

            //error_log("File: " . __FILE__ . "\nLine: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode($trendSearchData, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");

            $data = $this->getConfiguredTrend($trendSearchData);

            //error_log("File: " . __FILE__ . "\nLine: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode($data, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");

            $dataPoints = array();

            foreach ($data["points"] as $point) {

                /*
                "id": "4040",
                "user_id": "2",
                "sensor_id": "528911",
                "date_time": "2021-07-01 17:05:54",
                "data_type": "kW",
                "data_value": 1.0911920087683924,
                "custom_value": "0.000"
                 */ 

                //error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($point, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
                
                $dataPoint = new DataPoint();
                $dataPoint->setDataPointId($point["id"]);
                $dataPoint->setUserId($point["user_id"]);
                $dataPoint->setSensorId($point["sensor_id"]);
                $dataPoint->setDate($point["date_time"]);
                $dataPoint->setDataType($point["data_type"]);
                $dataPoint->setDataValue($point["data_value"]);
                $dataPoint->setCustomValue($point["custom_value"]);

                array_push($dataPoints, $dataPoint);
                
            }

            $average = $this->Formulas->currentAverage($dataPoints, 0);

            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($average, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");

            // Sets the data and time to get data points up to the current date and time.
            $trendSearchData["startDate"] = "2000-01-01 00:00:00";
            $trendSearchData["endDate"] = date("Y-m-d h:m:s");

            $currentAverage = 0;

            $data = $this->getConfiguredTrend($trendSearchData);

            $dataPoints = array();

            foreach ($data["points"] as $point) {

                /*
                "id": "4040",
                "user_id": "2",
                "sensor_id": "528911",
                "date_time": "2021-07-01 17:05:54",
                "data_type": "kW",
                "data_value": 1.0911920087683924,
                "custom_value": "0.000"
                 */ 

                //error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($point, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
                
                $dataPoint = new DataPoint();
                $dataPoint->setDataPointId($point["id"]);
                $dataPoint->setUserId($point["user_id"]);
                $dataPoint->setSensorId($point["sensor_id"]);
                $dataPoint->setDate($point["date_time"]);
                $dataPoint->setDataType($point["data_type"]);
                $dataPoint->setDataValue($point["data_value"]);
                $dataPoint->setCustomValue($point["custom_value"]);

                array_push($dataPoints, $dataPoint);
                
            }

            $currentAverage = $this->Formulas->currentAverage($dataPoints, 0);
            
            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($currentAverage, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");

            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode(count($dataPoints), JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($dataPoints[0]->getDataValue(), JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");

            return ["latestDataPoint" => $dataPoints[count($dataPoints)-1]->getDataValue(), "currentAverage" => $currentAverage, "average" => $average];
        }



        /**
         * Inserts a new trend into the database and returns an array of the new trend information.
         *
         * @param   json  $formData  JSON string
         *
         * @return  array            An array of new trend information.
         */
        public function insertUserConfiguredTrend($formData) {

            error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($formData, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");

            $result = array();

            $data = json_decode(json_encode($formData), false);

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("INSERT INTO `trendsUserConfigurations` (
                    `trendId`,
                    `lowestLevel`,
                    `highestLevel`,
                    `operationalMinimum`,
                    `operationalMaximum`,
                    `operationalStartTime`,
                    `operationalDuration`
                ) 
                VALUES (
                    :trendId,
                    :lowestLevel,
                    :highestLevel,
                    :operationalMinimum,
                    :operationalMaximum,
                    :operationalStartTime,
                    :operationalDuration
                )");
                $statement->bindParam(":trendId", $data->trendId, PDO::PARAM_INT);
                $statement->bindParam(":lowestLevel", $data->lowestLevel, PDO::PARAM_INT);
                $statement->bindParam(":highestLevel", $data->highestLevel, PDO::PARAM_INT);
                $statement->bindParam(":operationalMinimum", $data->operationalMinimum, PDO::PARAM_INT);
                $statement->bindValue(":operationalMaximum", $data->operationalMaximum, PDO::PARAM_INT);
                $statement->bindParam(":operationalStartTime", $data->operationalStartTime, PDO::PARAM_STR);
                $statement->bindParam(":operationalDuration", $data->operationalDuration, PDO::PARAM_INT);

                $connection->beginTransaction();
                $statement->execute();
                $lastInsertId = $connection->lastInsertId();
                $connection->commit();


                $statement = $connection->prepare("SELECT * FROM `trendsUserConfigurations` WHERE `id`=:trendId");
                $statement->bindValue(":trendId", $lastInsertId, PDO::PARAM_INT);
                $statement->execute();

                $result = $statement->rowCount() > 0 ? $statement->fetch(PDO::FETCH_ASSOC) : array();
                
            }
            catch(PDOException $pdo) {
                $connection->rollback();
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }

            return $result;
        }

        public function getConfiguredTrends($sensor) {

            $trends = array();

            try {

                $connection = Configuration::openConnection();

                if (isset($sensor['sensorId']) && !empty(trim($sensor['sensorId'])) && $sensor['sensorId'] != "null") {
                    $statement = $connection->prepare("SELECT * FROM `trendsConfigurations` WHERE `userId`=:userId AND `sensorId`=:sensorId ORDER BY `id` DESC");
                    $statement->bindValue(":userId", $sensor['userId'], PDO::PARAM_INT);
                    $statement->bindValue(":sensorId", $sensor['sensorId'], PDO::PARAM_INT);
                }
                else {
                    $statement = $connection->prepare("SELECT * FROM `trendsConfigurations` WHERE `userId`=:userId ORDER BY `id` DESC");
                    $statement->bindValue(":userId", $sensor['userId'], PDO::PARAM_INT);
                }

                $statement->execute();

                $trends = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

                foreach ($trends as $trendIndex => $trend) {
                    // Associated Trends
                    $associatedTrends = json_decode($trend['associatedTrends'], true);

                    $associatedTrendsArray = array();

                    foreach ($associatedTrends as $associatedTrend) {

                        $trendSensorId = $associatedTrend["sensorId"];
                        $trendTrendId = $associatedTrend["trendId"];

                        if (isset($trendTrendId)) {
                            $statement = $connection->prepare("SELECT * FROM `trendsConfigurations` WHERE `id`=:id");
                            $statement->bindValue(":id", $trendTrendId, PDO::PARAM_INT);
                            $statement->execute();

                            $trendArray = $statement->rowCount() > 0 ? $statement->fetch(PDO::FETCH_ASSOC) : array();
                        }
                        else {

                            $DataPoints = new DataPoints();
                            // Array of Raw Data Points
                            $dataPointsArray = $DataPoints->getSensorDataPoints($sensor['userId'], $trendSensorId, "null", "null");

                            $sensorArray = Sensor::getSensor($trendSensorId);

                            $trendArray = array(
                                "sensor" => array(
                                    "id"=> $sensorArray->getId()
                                    , "sensor_name" => $sensorArray->getSensorName()
                                    , "dataType" => $sensorArray->getSensorDataType()
                                )
                                , "dataPoints" => array()
                            );

                            //$sensorArray->getSensorId();
                            //$sensorArray->getUserId();
                            //$sensorArray->getSensorName();
                            //$sensorArray->getSensorDataType();

                            foreach($dataPointsArray as $dataPoint) {
                                
                                array_push($trendArray["dataPoints"], 
                                    array(
                                        "id" => $dataPoint->getDataPointId()
                                        , "user_id" => $dataPoint->getUserId()
                                        , "sensor_id" => $dataPoint->getSensorId()
                                        , "date_time" => $dataPoint->getDate()
                                        , "data_type" => $dataPoint->getDataType()
                                        , "data_value" => $dataPoint->getDataValue()
                                        , "custom_value" => $dataPoint->getCustomValue()
                                    )
                                );
                                
                            }
                        }
                        
                        $associatedTrendsArray[] = $trendArray;
                    }

                    $trends[$trendIndex]["associatedTrends"] = $associatedTrendsArray;

                    // Inputs
                    $inputs = json_decode($trend['inputs'], true);

                    $inputsArray = array();

                    foreach ($inputs as $inputName => $inputValue) {
                        if (isset($inputValue)) {
                            $inputsArray[$inputName] = $inputValue;
                        }
                    }

                    $trends[$trendIndex]["inputs"] = $inputsArray;

                }

            }
            catch(PDOException $pdo) {
                error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }
            
            return $trends;
        }

        public function getConfiguredTrend($trendSearchData) {

            //error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($trendSearchData['trendId'], JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
            $trend = array();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `trendsConfigurations` WHERE `id`=:trendId");
                $statement->bindValue(":trendId", $trendSearchData['trendId'], PDO::PARAM_INT);

                $statement->execute();

                $trend = $statement->rowCount() > 0 ? $statement->fetch(PDO::FETCH_ASSOC) : array();

                //error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . json_encode($trend, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");

                // Associated Trends
                $associatedTrends = json_decode($trend['associatedTrends'], true);

                $associatedTrendsArray = array();

                foreach ($associatedTrends as $associatedTrend) {

                    

                    $statement = $connection->prepare("SELECT * FROM `trendsConfigurations` WHERE `id`=:id");
                    $statement->bindValue(":id", $associatedTrend["trendId"], PDO::PARAM_INT);
                    $statement->execute();

                    $trendArray = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

                    //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode($trendArray, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
                    
                    foreach ($trendArray as $associatedTrendTemp) {
                        $tempTrendSearchData['trendId'] = (int) $associatedTrendTemp["id"];
                        $tempTrendSearchData['startDate'] = $trendSearchData['startDate'];
                        $tempTrendSearchData['endDate'] = $trendSearchData['endDate'];
                        //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode($this->getConfiguredTrend($tempID), JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
                
                        $associatedTrendsArray[] = $this->getConfiguredTrend($tempTrendSearchData);
                    }
                    
                }

                //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode($associatedTrendsArray) . "\n", 3, "/var/www/html/app/php-errors.log");
                $trend["associatedTrends"] = $associatedTrendsArray;
                //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode($trend, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
                            
                // Inputs
                $inputs = json_decode($trend['inputs'], true);

                $inputsArray = array();

                foreach ($inputs as $inputName => $inputValue) {
                    if (isset($inputValue)) {
                        $inputsArray[$inputName] = $inputValue;
                    }
                }

                $trend["inputs"] = $inputsArray;

                //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode($trend, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");
                
                $sensor = Sensor::getSensor($trend["sensorId"]);
                /*
                error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . 
                    "StartDate: " . $trendSearchData['startDate'] . " EndDate: " . $trendSearchData['endDate']
                    . "\n", 3, "/var/www/html/app/php-errors.log");
                */
                $DataPoints = new DataPoints();
                // Array of Raw Data Points
                $rawDataPoints = $DataPoints->getSensorDataPoints($trend["userId"], $trend["sensorId"], $trendSearchData['startDate'], $trendSearchData['endDate']);

                $trendDataPoints = array(
                    "trend" => $trend
                    , "id" => $sensor->getId()
                    , "sensorId" => $sensor->getSensorId()
                    , "sensor_name" => $sensor->getSensorName()
                    , "user_id" => $sensor->getUserId()
                    , "points" => array()
                );

                
                $tempTrendSearchData['startDate'] = $trendSearchData['startDate'];
                $tempTrendSearchData['endDate'] = $trendSearchData['endDate'];

                if (!isset($trend["inputs"]["general"]["firstParameter"])) {
                    if (isset($trend["inputs"]["general"]["firstTrendParameter"]) && $trend["inputs"]["general"]["firstTrendParameter"] == $trend["associatedTrends"][0]["trend"]["id"]) {
                        $tempTrendSearchData['trendId'] = (int) $trend["inputs"]["general"]["firstTrendParameter"];
                    }
                    else {
                        $tempTrendSearchData['trendId'] = (int) $trend["inputs"]["general"]["firstSensorParameter"];
                    }

                    $associatedTrendsArray1 = ($tempTrendSearchData['trendId']) ? $this->getConfiguredTrend($tempTrendSearchData) : array();
                }

                if (!isset($trend["inputs"]["general"]["secondParameter"])) {
/*
                    error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . 
                    "1 TrendData: " . json_encode($trend, JSON_PRETTY_PRINT)
                    . "\n", 3, "/var/www/html/app/php-errors.log");
                  error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . 
                    "1 TrendData: " . json_encode($trend["inputs"]["general"]["secondTrendParameter"] .",". $trend["associatedTrends"][1]["trend"]["id"], JSON_PRETTY_PRINT)
                    . "\n", 3, "/var/www/html/app/php-errors.log");
*/
/*
                    error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . 
                    "1 TrendData: " . json_encode($tempTrendSearchData, JSON_PRETTY_PRINT)
                    . "\n", 3, "/var/www/html/app/php-errors.log");
*/
                    if (isset($trend["inputs"]["general"]["secondTrendParameter"]) && $trend["inputs"]["general"]["secondTrendParameter"] == $trend["associatedTrends"][1]["trend"]["id"]) {
                        $tempTrendSearchData['trendId'] = (int) $trend["inputs"]["general"]["secondTrendParameter"];
                    }
                    else {
                        $tempTrendSearchData['trendId'] = (int) $trend["inputs"]["general"]["secondSensorParameter"];
                    }

                    //$tempTrendSearchData['trendId'] = (int) $trend["inputs"]["general"]["secondTrendParameter"];

                    //$tempTrendSearchData['trendId'] = (int) $trend['id'];
/*
                    error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . 
                    "1 TrendData: " . json_encode($tempTrendSearchData, JSON_PRETTY_PRINT)
                    . "\n", 3, "/var/www/html/app/php-errors.log");
*/
                    $associatedTrendsArray2 = ($tempTrendSearchData['trendId']) ? $this->getConfiguredTrend($tempTrendSearchData) : array();
                }


                // Sensor Data Points
                foreach ($rawDataPoints as $index => $rawDataPoint) {

                    $firstValue = 0;
                    $secondValue = 0;

                    //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode($trend["inputs"]["general"], JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");

                    if (isset($trend["inputs"]["general"])) {
                        if (!isset($trend["inputs"]["general"]["firstParameter"])) {
                            //$firstValue = $associatedTrendsArray1["points"][$index]["data_value"];
                            
                            if (isset($trend["inputs"]["general"]["firstTrendParameter"]) && !empty($trend["inputs"]["general"]["firstTrendParameter"]) && $trend["inputs"]["general"]["firstTrendParameter"] == $trend["associatedTrends"][0]["trend"]["id"]) {
                                $firstValue = $associatedTrendsArray1["points"][$index]["data_value"];
                            }
                            else {
                                $firstValue = $rawDataPoint->getDataValue();
                            }
                            
                        }
                        else {
                            $firstValue = $trend["inputs"]["general"]["firstParameter"];
                        }
        
                        if (!isset($trend["inputs"]["general"]["secondParameter"])) {
                            /*
                            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" 
                                    . json_encode($associatedTrendsArray2, JSON_PRETTY_PRINT) 
                                    . "\n", 3, "/var/www/html/app/php-errors.log");
                            */
                            $secondValue = $associatedTrendsArray2["points"][$index]["data_value"];
// ADD BACK IN
                            if (isset($trend["inputs"]["general"]["secondTrendParameter"]) && $trend["inputs"]["general"]["secondTrendParameter"] == $trend["associatedTrends"][0]["trend"]["id"]) {
                                $secondValue = $associatedTrendsArray2["points"][$index]["data_value"];
                            }
                            else {
                                $secondValue = $rawDataPoint->getDataValue();
                            }
                            
                        }
                        else {
                            $secondValue = $trend["inputs"]["general"]["secondParameter"];
                        }
                    }
                    else {
                        $firstValue = $trend["associatedTrends"][0]["points"][$index]["data_value"];
                    }
                    
                    /*
                    error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . 
                        "F: " . $firstValue . " S: " . $secondValue
                        . "\n", 3, "/var/www/html/app/php-errors.log");
                    */
                    /*
                    error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . 
                        json_encode($trend["inputs"], JSON_PRETTY_PRINT)
                        . "\n", 3, "/var/www/html/app/php-errors.log");
                    */
                    switch ($trend["trendFormula"]) {
                        case "maConversion":
                        case "mAConversion":
                            $dataPointValue = $this->Formulas->maConversion($rawDataPoint->getDataValue(), $trend["inputs"]["mAMin"], $trend["inputs"]["mAMax"], $trend["inputs"]["processMin"], $trend["inputs"]["processMax"]);
                            break;
                        case "current":
                            $dataPointValue = $this->Formulas->current($rawDataPoint->getDataValue(), $trend["inputs"]["averagingFactor"]);
                            break;
                        case "power":
                            $dataPointValue = $this->Formulas->power($firstValue, $trend["inputs"]["voltage"], $trend["inputs"]["phaseNumber"], $trend["inputs"]["powerFactor"]);
                            break;
                        case "addition":
                            $dataPointValue = $this->Formulas->addition($firstValue, $secondValue);
                            break;
                        case "subtraction":
                            $dataPointValue = $this->Formulas->subtraction($firstValue, $secondValue);
                            break;
                        case "multiplication":
                            $dataPointValue = $this->Formulas->multiplication($firstValue, $secondValue);
                            break;
                        case "division":
                            $dataPointValue = $this->Formulas->division($firstValue, $secondValue);
                            break;
                        case "exponentiation":
                            $dataPointValue = $this->Formulas->exponentiation($firstValue, $secondValue);
                            break;
                        case "massFlow":
                            // WIP massFlow($volumetricFlow, $density);
                        case "chillerEfficiency":
                            // WIP chillerEfficiency($massFlow, $heatCapacity, $chilledMediaReturn, $chilledMediaSupply, $power);
                        default:
                            error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $trend["trendFormula"] . " Formula Not Found" . "\n", 3, "/var/www/html/app/php-errors.log");
                            break;
                    }
                    /*
                    error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . 
                                "DataPointValue: " . json_encode($trendDataPoints["points"], JSON_PRETTY_PRINT)
                                . "\n", 3, "/var/www/html/app/php-errors.log");
                    */
                    $dataPointType = ($trend["unit"]) ? $trend["unit"] : 'undefined';

                    array_push($trendDataPoints["points"], 
                        array(
                            "id" => $rawDataPoint->getDataPointId()
                            , "user_id" => $rawDataPoint->getUserId()
                            , "sensor_id" => $rawDataPoint->getSensorId()
                            , "date_time" => $rawDataPoint->getDate()
                            , "data_type" => $dataPointType
                            , "data_value" => $dataPointValue
                            , "custom_value" => $rawDataPoint->getCustomValue()
                        )
                    );
                }
                
                $trend = $trendDataPoints;
                //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode($trend) . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch(PDOException $pdo) {
                error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }

            //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . "\n" . json_encode($trend, JSON_PRETTY_PRINT) . "\n", 3, "/var/www/html/app/php-errors.log");

            return $trend;
        }

        public function insertConfiguredTrend($formData) {
            $result = array();

            $data = json_decode(json_encode($formData), false);

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("INSERT INTO `trendsConfigurations` (
                    `userId`,
                    `sensorId`,
                    `trendName`,
                    `trendFormula`,
                    `inputs`,
                    `unit`,
                    `associatedTrends`
                ) 
                VALUES (
                    :userId,
                    :sensorId,
                    :trendName,
                    :trendFormula,
                    :inputs,
                    :unitType,
                    :associatedTrends
                )");
                
                $statement->bindParam(":userId", $data->userId, PDO::PARAM_INT);
                $statement->bindValue(":sensorId", $data->sensorId, PDO::PARAM_INT);
                $statement->bindParam(":trendName", $data->trendName, PDO::PARAM_STR);
                $statement->bindParam(":trendFormula", $data->trendFormula, PDO::PARAM_STR);
                $statement->bindParam(":inputs", $data->inputs, PDO::PARAM_STR);
                $statement->bindParam(":unitType", $data->unitType, PDO::PARAM_STR);
                $statement->bindValue(":associatedTrends", $data->associatedTrends, PDO::PARAM_STR);

                $connection->beginTransaction();
                $statement->execute();
                $lastInsertId = $connection->lastInsertId();
                $connection->commit();


                $statement = $connection->prepare("SELECT * FROM `trendsConfigurations` WHERE `id`=:trendId");
                $statement->bindValue(":trendId", $lastInsertId, PDO::PARAM_INT);
                $statement->execute();

                $result = $statement->rowCount() > 0 ? $statement->fetch(PDO::FETCH_ASSOC) : array();
                
            }
            catch(PDOException $pdo) {
                $connection->rollback();
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
         * Deletes a configured trend and associated trends from the database.
         *
         * @param   int  $trendId  Trend ID.
         *
         * @return  boolean    Boolean about the deleted trend.
         */
        public function deleteConfiguredTrend($trendId) {

            $result = false;
            //error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " Trend ID: " . $trendId . "\n", 3, "/var/www/html/app/php-errors.log");
           
            try {
                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `trendsConfigurations` WHERE `id`=:trendId");
                $statement->bindValue(":trendId", $trendId, PDO::PARAM_INT);
                $statement->execute();

                $configuredTrend = $statement->fetch(PDO::FETCH_ASSOC);

                $associatedTrends = json_decode($configuredTrend["associatedTrends"], false);

                foreach ($associatedTrends as $associatedTrend) {
                    if(isset($associatedTrend->trendId)) {
                        //error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " Associated Trend ID: " . $associatedTrend->trendId . "\n", 3, "/var/www/html/app/php-errors.log");
                        $this->deleteConfiguredTrend($associatedTrend->trendId);
                    }
                }

                $statement = $connection->prepare("DELETE FROM `trendsConfigurations` WHERE `id`=:trendId");
                $statement->bindParam(":trendId", $trendId, PDO::PARAM_INT);
                $result = $statement->execute() ? true : false;
                
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
         * Sets the visibility of a configured trend on the customer side of the app.
         *
         * @param   array  $formData  An array with the trend ID and visibility boolean.
         */
        public function setTrendVisibility($formData) {

            $result = false;
            $data = json_decode(json_encode($formData), false);

            try {
                $connection = Configuration::openConnection();

                $statement = $connection->prepare("UPDATE `trendsConfigurations` SET `isVisible`=:isVisible WHERE `id`=:trendId");

                $isVisible = ($data->isVisible === 'true')? 1 : 0;

                //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $data->trendId . " == " . $data->isVisible . " == " . $isVisible . "\n", 3, "/var/www/html/app/php-errors.log");

                $statement->bindParam(":trendId", $data->trendId, PDO::PARAM_INT);
                $statement->bindParam(":isVisible", $isVisible, PDO::PARAM_INT);
                $result = $statement->execute() ? true : false;
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
         * Sets the visibility of a user configured trend on the customer dashboard.
         *
         * @param   array  $formData  An array with the trend ID and visibility boolean.
         */
        public function setDashboardVisibility($formData) {

            $result = false;
            $data = json_decode(json_encode($formData), false);

            try {
                $connection = Configuration::openConnection();

                $statement = $connection->prepare("UPDATE `trendsUserConfigurations` SET `isVisible`=:isVisible WHERE `id`=:trendId");

                $isVisible = ($data->isVisible === 'true')? 1 : 0;

                //error_log(__FILE__ . " Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $data->trendId . " == " . $data->isVisible . " == " . $isVisible . "\n", 3, "/var/www/html/app/php-errors.log");

                $statement->bindParam(":trendId", $data->trendId, PDO::PARAM_INT);
                $statement->bindParam(":isVisible", $isVisible, PDO::PARAM_INT);
                $result = $statement->execute() ? true : false;
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

        public function getFormulas() {

            $formulas = array();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `formulas` ORDER BY `displayName` ASC");

                $statement->execute();

                $formulas = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }
            
            return $formulas;
        }

        public function getFormulaTrends($userId, $sensorId) {

            $trends = array();
            
            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `trendsConfigurations` WHERE `userId`=:userId AND `sensorId`=:sensorId ORDER BY `trendName` ASC");
                $statement->bindParam(":userId", $userId, PDO::PARAM_INT);
                $statement->bindValue(":sensorId", $sensorId, PDO::PARAM_INT);
                $statement->execute();

                $trends = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                $connection = Configuration::closeConnection();
            }
            
            return $trends;
        }

        public function calculateMaConversionREMOVE($trendId, $startDate, $endDate) {
        
            //$this->Formulas
            return false;
            //$attributes = json_decode($attributes, false);
            //return (($storedValue - $attributes->mAMin) / ($attributes->mAMax - $attributes->mAMin)) * ($attributes->processMax - $attributes->processMin);
        }
    }
?>