<?php
/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2020-04-07
 */
    require_once('Configuration.php');
    require_once('Sensor.php');

    class Sensors extends Sensor {

        function __construct() {}
        /**
         * Gets user specific sensor information.
         *
         * @param   int  $userId  Logged in user's ID
         *
         * @return  array  An array of user specific sensors.
         */
        public function getUserSensors($userId) {

            $sensors = array();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT `id` FROM `sensors` WHERE `userId`=:userId");
                $statement->bindValue(":userId", $userId, PDO::PARAM_INT);
                $statement->execute();

                $results = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

                foreach ($results as $sensor) {
                    array_push($sensors, Sensor::getSensor($sensor['id']));
                }

            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, ERROR_LOG);
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, ERROR_LOG);
            }
            finally {
                $connection = Configuration::closeConnection();
            }

            return $sensors;

        }
        /**
         * Gets all of the sensors and groups them by sensor ID.
         *
         * @return  array  An array of sensors.
         */
        public function getSensors() {

            $sensors = array();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT `sensorId`, `userId` FROM `sensors` GROUP BY `sensorId`");
                $statement->execute();

                $results = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

                foreach ($results as $sensor) {
                    array_push($sensors, Sensor::getSensor($sensor['sensorId'], $sensor['userId']));
                }

            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, ERROR_LOG);
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, ERROR_LOG);
            }
            finally {
                Configuration::closeConnection();
            }

            return $sensors;

        }

        public function addSensor($formData) {

            $result = false;
            $data = json_decode(json_encode($formData), false);

            try {
                $connection = Configuration::openConnection();

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

                $statement->bindParam(":sensorId", $data->sensorId, PDO::PARAM_INT);
                $statement->bindParam(":userId", $data->company, PDO::PARAM_INT);
                $statement->bindParam(":sensor_name", $data->sensorName, PDO::PARAM_STR);
                $statement->bindParam(":dataType", $data->dataType, PDO::PARAM_STR);
                
                $result = $statement->execute() ? true : false;
            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, ERROR_LOG);
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, ERROR_LOG);
            }
            finally {
                Configuration::closeConnection();
            }
            
            return $result;
        }

        public function updateSensor($formData) {

            $result = false;
            $data = json_decode(json_encode($formData), false);

            try {
                $connection = Configuration::openConnection();

                $statement = $connection->prepare("UPDATE `sensors` SET `sensor_name`=:sensor_name WHERE `id`=:id AND `userId`=:userId");

                $statement->bindParam(":id", $data->id, PDO::PARAM_INT);
                $statement->bindParam(":userId", $data->userId, PDO::PARAM_INT);
                $statement->bindParam(":sensor_name", $data->sensorName, PDO::PARAM_STR);
                $result = $statement->execute() ? true : false;
            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, ERROR_LOG);
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, ERROR_LOG);
            }
            finally {
                Configuration::closeConnection();
            }
            
            return $result;
        }

        public function deleteSensor($sensorId, $userId) {

            $result = false;

            try {
                $connection = Configuration::openConnection();
                // Gets the front-end sensor ID using the database's sensor primary key.
                $sensorId = Sensor::getSensor($sensorId)->getSensorId();
                // Deletes the Sensor and Trends
                $statement = $connection->prepare("DELETE FROM `sensors` WHERE `sensorId`=:sensorId AND `userId`=:userId");

                $statement->bindParam(":sensorId", $sensorId, PDO::PARAM_INT);
                $statement->bindParam(":userId", $userId, PDO::PARAM_INT);
                $result = $statement->execute() ? true : false;

                if ($result) {
                    // Deletes sensor Data Points.
                    $statement = $connection->prepare("DELETE FROM `dataPoints` WHERE `user_id`=:userId AND `sensor_id`=:sensorId");
                    $statement->bindParam(":userId", $userId, PDO::PARAM_INT);
                    $statement->bindParam(":sensorId", $sensorId, PDO::PARAM_INT);
                    $statement->execute();
                }
            }
            catch(PDOException $pdo) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, ERROR_LOG);
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, ERROR_LOG);
            }
            finally {
                Configuration::closeConnection();
            }
            
            return $result;
        }

    }
?>