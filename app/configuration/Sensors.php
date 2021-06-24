<?php
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

                $statement = $connection->prepare("SELECT `sensorId`, `userId` FROM `sensors` WHERE `userId`=:userId");
                $statement->bindValue(":userId", $userId, PDO::PARAM_INT);
                $statement->execute();

                $results = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

                foreach ($results as $sensor) {

                    array_push($sensors, Sensor::getSensor($sensor['sensorId'], $sensor['userId']));

                }

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

            //error_log(date('Y-m-d H:i:s') . " " . $sensors[0]->getSensorId() . "\n", 3, "/var/www/html/app/php-errors.log");

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
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log("Line: " . __LINE__ . " - " . date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
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
                    `sensor_name`
                ) 
                VALUES (
                    :sensorId,
                    :userId,
                    :sensor_name
                )");

                $statement->bindParam(":sensorId", $data->sensorId, PDO::PARAM_INT);
                $statement->bindParam(":userId", $data->company, PDO::PARAM_INT);
                $statement->bindParam(":sensor_name", $data->sensorName, PDO::PARAM_STR);
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

        public function updateSensor($formData) {

            $result = false;
            $data = json_decode(json_encode($formData), false);

            try {
                $connection = Configuration::openConnection();

                $statement = $connection->prepare("UPDATE `sensors` SET `sensor_name`=:sensor_name WHERE `sensorId`=:sensorId AND `userId`=:userId");

                $statement->bindParam(":sensorId", $data->sensorId, PDO::PARAM_INT);
                $statement->bindParam(":userId", $data->userId, PDO::PARAM_INT);
                $statement->bindParam(":sensor_name", $data->sensorName, PDO::PARAM_STR);
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

        public function deleteSensor($sensorId, $userId) {

            $result = false;

            try {
                $connection = Configuration::openConnection();

                $statement = $connection->prepare("DELETE FROM `sensors` WHERE `sensorId`=:sensorId AND `userId`=:userId");

                $statement->bindParam(":sensorId", $sensorId, PDO::PARAM_INT);
                $statement->bindParam(":userId", $userId, PDO::PARAM_INT);
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

    }
?>