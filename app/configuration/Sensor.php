<?php
/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2020-04-07
 */
    require_once('Configuration.php');

    class Sensor {

        private $id = 0;
        private $sensorId = 0;
        private $userId = 0;
        private $sensorName = "";
        private $dataType = "";

        function __construct() {}

        /**
         * Works like an overloaded constructor to return a Sensor object with set sensor information.
         *
         * @param   int  $sensorId  Specific sensor ID
         *
         * @return  Sensor  An instance of this Sensor object.
         */
        public static function getSensor($id) {

            $sensor = new static();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `sensors` WHERE `id`=:id");
                $statement->bindParam(":id", $id, PDO::PARAM_INT);
                $statement->execute();

                $results = $statement->fetch(PDO::FETCH_ASSOC);

                $sensor->setId($results['id']);
                $sensor->setSensorId($results['sensorId']);
                $sensor->setUserId($results['userId']);
                $sensor->setSensorName($results['sensor_name']);
                $sensor->setSensorDataType($results['dataType']);
            }
            catch (PDOException $pdo) {
                error_log(date('Y-m-d H:i:s') . " " . $pdo->getMessage() . "\n", 3, ERROR_LOG);
            }
            catch (Exception $e) {
                error_log(date('Y-m-d H:i:s') . " " . $e->getMessage() . "\n", 3, ERROR_LOG);
            }
            finally {
                $connection = Configuration::closeConnection();
            }

            return $sensor;

        }

        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
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
        
        public function getSensorDataType() {
            return $this->dataType;
        }

        public function setSensorDataType($dataType) {
            $this->dataType = $dataType;
        }
        

    }
?>