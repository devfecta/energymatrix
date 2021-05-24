<?php

    class DataPoint {

        private $id;
        private $user_id;
        private $sensor_id;
        private $date_time;
        private $data_type;
        private $data_value;
        private $custom_value;

        function __construct() {}
        /**
         * Works like an overloaded constructor to return a Sensor object with set sensor information.
         *
         * @param   int  $dataPointId  Specific data point ID
         *
         * @return  DataPoint  An instance of this DataPoint object.
         */
        public static function getDataPoint($dataPointId) {

            $dataPoint = new static();

            try {

                $connection = Configuration::openConnection();

                $statement = $connection->prepare("SELECT * FROM `dataPoints` WHERE id=:dataPointId");
                $statement->bindParam(":dataPointId", $dataPointId);
                $statement->execute();

                $results = $statement->fetch(PDO::FETCH_ASSOC);

                $dataPoint->setDataPointId($results['id']);
                $dataPoint->setUserId($results['user_id']);
                $dataPoint->setSensorId($results['sensor_id']);
                $dataPoint->setDate($results['date_time']);
                $dataPoint->setDataType($results['data_type']);
                $dataPoint->setDataValue($results['data_value']);
                $dataPoint->setCustomValue($results['custom_value']);

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

            return $dataPoint;

        }

        public function getDataPointId() {
            return $this->id;
        }
        public function setDataPointId($id) {
            $this->id = $id;
        }
        
        public function getUserId() {
            return $this->user_id;
        }
        public function setUserId($user_id) {
            $this->user_id = $user_id;
        }

        public function getSensorId() {
            return $this->sensor_id;
        }
        public function setSensorId($sensor_id) {
            $this->sensor_id = $sensor_id;
        }
        
        public function getDate() {
            return $this->date_time;
        }
        public function setDate($date_time) {
            $this->date_time = $date_time;
        }
        
        public function getDataType() {
            return $this->data_type;
        }
        public function setDataType($data_type) {
            $this->data_type = $data_type;
        }
        
        public function getDataValue() {
            return $this->data_value;
        }
        public function setDataValue($data_value) {
            $this->data_value = $data_value;
        }
        
        public function getCustomValue() {
            return $this->custom_value;
        }
        public function setCustomValue($custom_value) {
            $this->custom_value = $custom_value;
        }

    }
?>