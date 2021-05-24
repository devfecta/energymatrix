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

                $statement = $connection->prepare("SELECT `id` FROM `sensors` WHERE `user_id`=:user_id");
                $statement->bindValue(":user_id", $userId, PDO::PARAM_INT);
                $statement->execute();

                $results = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

                foreach ($results as $sensor) {
                    array_push($sensors, Sensor::getSensor($sensor['id']));
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
        /**
         * Gets all of the sensors and groups them by sensor ID.
         *
         * @return  array  An array of sensors.
         */
        public function getSensors() {

            $sensors = array();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT `id` FROM `sensors` GROUP BY `id`");
                $statement->execute();

                $results = $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : array();

                foreach ($results as $sensor) {
                    array_push($sensors, Sensor::getSensor($sensor['id']));
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

            error_log($data->sensorId . " = " . $data->company . " = " . $data->sensorName . " = " . $data->sensorAttributes);

            try {
                $connection = Configuration::openConnection();

                $statement = $connection->prepare("INSERT INTO `sensors` (
                    `id`,
                    `user_id`,
                    `sensor_name`,
                    `attributes`
                ) 
                VALUES (
                    :sensor_id,
                    :user_id,
                    :sensor_name,
                    :attribute
                )");
                // Convert sensor attributes to a string for the database.
                $sensorAttributes = $data->sensorAttributes;

                $statement->bindParam(":sensor_id", $data->sensorId, PDO::PARAM_INT);
                $statement->bindParam(":user_id", $data->company, PDO::PARAM_INT);
                $statement->bindParam(":sensor_name", $data->sensorName, PDO::PARAM_STR);
                $statement->bindParam(":attribute", $sensorAttributes, PDO::PARAM_STR);
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