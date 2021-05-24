<?php
    require_once('Configuration.php');

    class Sensor {

        private $sensorId = 0;
        private $userId = 0;
        private $sensorName = "";
        private $sensorAttributes = [];

        function __construct() {}

        /**
         * Works like an overloaded constructor to return a Sensor object with set sensor information.
         *
         * @param   int  $sensorId  Specific sensor ID
         *
         * @return  Sensor  An instance of this Sensor object.
         */
        public static function getSensor($sensorId) {

            $sensor = new static();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM sensors WHERE id=:sensorId");
                $statement->bindParam(":sensorId", $sensorId);
                $statement->execute();

                $results = $statement->fetch(PDO::FETCH_ASSOC);

                $sensor->setSensorId($results['id']);
                $sensor->setUserId($results['user_id']);
                $sensor->setSensorName($results['sensor_name']);
                $sensor->setSensorAttributes($results['attributes']);

            }
            catch (PDOException $pdo) {
                error_log(date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            catch (Exception $e) {
                error_log(date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, "/var/www/html/app/php-errors.log");
            }
            finally {
                Configuration::closeConnection();
            }

            return $sensor;

        }

        public function getSensorId() {
            return $this->sensorId;
        }

        public function setSensorId($id) {
            $this->sensorId = $id;
        }

        public function getUserId() {
            return $this->userId;
        }

        public function setUserId($id) {
            $this->userId = $id;
        }

        public function getSensorName() {
            return $this->sensorName;
        }

        public function setSensorName($name) {
            $this->sensorName = $name;
        }

        public function getSensorAttributes() {
            return $this->sensorAttributes;
        }

        public function setSensorAttributes($attributes) {
            $this->sensorAttributes = $attributes;
        }

    }
?>